import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react';
import { MSG_TYPES } from '../helpers/constants';


const MessageCard = ({ roomEvents, messages, currentUser }) => {
    if (messages.length === 0) {
        return (
            <Card sx={{ boxShadow: "none", position: 'absolute', bottom: 0}}>
                <CardHeader style={{ textAlign: 'center' }} subheader={"Start messaging! 🎉"} />
            </Card>
        );
    }

    return (
        roomEvents.map((roomEvent, idx) => {
            const isCurrentUser = currentUser === roomEvent.username;

            if (roomEvent.msg_type === MSG_TYPES.JOINED) {
                return <Typography component="p" variant="body2" key={idx}>{roomEvent.username} is in the chat! 🎉</Typography>
            }
            return (
                <Card sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        maxWidth: "55%",
                        alignSelf: 'flex-start',
                        m: 2,
                        boxShadow: 'none', 
                        ml: isCurrentUser ? "auto" : "none",
                    }} 
                    key={idx}
                >
                    <CardHeader
                        sx = {{
                            bgcolor: isCurrentUser ? "#2196F3" : "#9E9E9E",
                            order: isCurrentUser ? 1 : 0,
                        }}
                        avatar={
                            <Avatar sx={{ backgroundColor: isCurrentUser ? 'blue': 'red'}}>
                                R
                            </Avatar>
                        }
                        title={roomEvent.username}
                        subheader={roomEvent.timestamp}
                    />
                    <CardContent
                        sx = {{
                            bgcolor: isCurrentUser ? "#64B5F6" : "#E0E0E0"
                        }}
                    >
                        {roomEvent.message}
                    </CardContent>
                </Card>
            );
        })
    );
};

export default MessageCard;