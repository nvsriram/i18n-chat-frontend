import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import JoinRoom from './pages/JoinRoom.js';
import Chatroom from './pages/Chatroom.js'
import { MSG_TYPES } from './helpers/constants.js';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [userID, setUserID] = useState(-1);
  const [username, setUsername] = useState('');
  const [lang, setLang] = useState('EN');
  const [client, setClient] = useState(null);

  const [messages, setMessages] = useState([]);
  const [roomEvents, setRoomEvents] = useState([]);

  useEffect(() => {
    if (!isLoggedIn || userID > 0) return;
    
    const newClient = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/' + roomName + '/');
    newClient.onopen = () => {
      console.log("Websocket connected!");
      setClient(newClient);
      if (userID === -1) {
        newClient.send(JSON.stringify({
          msg_type: MSG_TYPES.JOINED,
          username: username,
          lang: lang,
        }));
      }
    };

    newClient.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        const {
          msg_type, 
          message,
          user_id, 
          username,
          lang,
          timestamp
        } = dataFromServer;
        console.log(msg_type, user_id);
        // handle based on msg_type
        switch (msg_type) {
          case MSG_TYPES.JOINED:
            setRoomEvents((prevEvents) => 
              [...prevEvents, 
                {
                  msg_type: msg_type,
                  timestamp: timestamp,
                  username: username,
                }
              ]
            );
            if (userID === -1) {
              console.log(user_id);
              setUserID(user_id);
            }
            break;         
          case MSG_TYPES.MESSAGE:
            setRoomEvents((prevEvents) => 
              [...prevEvents, 
                {
                  msg_type: msg_type,
                  message: message,
                  timestamp: timestamp,
                  userID: user_id,
                  username: username,
                  lang: lang,
                }
              ]
            );       
            setMessages((prevMessages) => 
              [...prevMessages, 
                {
                  message: message,
                  timestamp: timestamp,
                  username: username,
                  lang: lang
                }
              ]
            );
            break;
          default:
              console.log("unexpected msg_type", msg_type);
        }
      }
    };

  }, [isLoggedIn, lang, username, roomName, userID]);

  const sendMessage = (input) => {
    client.send(JSON.stringify({
      msg_type: MSG_TYPES.MESSAGE,
      message: input,
      user_id: userID,
      username: username,
      lang: lang,
    }));
  };

  if (!isLoggedIn) {
    return (
      <JoinRoom 
        setRoomName={setRoomName} 
        setUsername={setUsername} 
        setIsLoggedIn={setIsLoggedIn}
      />
    );
  }

  return (
    <Container component="main" sx={{ height: '100%'}}>
      <CssBaseline enableColorScheme/>
      <Chatroom 
        room={roomName}
        userID={userID}
        username={username}
        roomEvents={roomEvents}
        messages={messages} 
        onButtonClicked={sendMessage}
      /> 
    </Container>
  );
};


export default (App);
