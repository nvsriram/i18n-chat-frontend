import React from 'react';
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import SendIcon from '@mui/icons-material/Send';
import { Avatar, CardHeader, Grid } from '@mui/material';
import InputForm from '../components/InputForm';
import TextInput from '../components/TextInput';
import FormSubmit from '../components/FormSubmit';
import { validateInputs } from '../helpers/ValidateInputs';
import { Container } from '@mui/system';

import MessageCard from '../components/MessageCard';
import Navbar from '../components/Navbar';


const Chatroom = ({room, userID, username, roomEvents, messages, onButtonClicked}) => {

    const setValue = (input) => {
        onButtonClicked(input["Message"].value);
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: "auto"
            }}
        >
            <Navbar room={room} username={username} />
            <Paper variant="outlined" sx={{ display:'flex', flexDirection: 'column', flexGrow: 1, height:'100%', width: "100%", justifyContent: 'flex-end', pb: 1, mb: 3, overflowY: "scroll" }}>
                <Paper elevation={0} sx={{ position:'relative', display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%', width: "100%", justifyContent: 'flex-end', alignItems: 'center'}}>
                    <MessageCard roomEvents={roomEvents} messages={messages} currentUser={username} />
                </Paper>
                <InputForm 
                    onSubmit={setValue} 
                    validateInputs={validateInputs} 
                    resetOnSubmit={true}
                    sx={{ mx: 2, mt: 0 }}
                >
                <Grid container spacing={0.5} justifyContent='flex-end'>
                    <Grid
                        item
                        xs={11}
                        sx={{
                            width:'100%',
                            maxWidth: '90%',
                            alignSelf:"flex-end",
                            justifySelf:"flex-start"
                        }}
                        >
                        <TextInput variant="standard" color="primary" label=" " id="send-message" name="Message" type="text" placeholder="Type a message" removeHelperText autoFocus/>
                    </Grid>
                    <Grid item xs={1}>

                    <FormSubmit variant="contained" color="primary">
                        <SendIcon sx={{ height: '1em', width: '1em'}}/>
                    </FormSubmit>
                    </Grid>
                </Grid>
                </InputForm>
            </Paper>
        </Container>
    )
};

export default Chatroom;