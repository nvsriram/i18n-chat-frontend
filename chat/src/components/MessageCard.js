import React from 'react';
import TimeAgo from 'timeago-react';
import { Paper, Typography } from '@mui/material';
import { MSG_TYPES } from '../helpers/constants';
import UserAvatar from './UserAvatar';


const MessageCard = ({ roomEvents, messages, currentUser, avatars }) => {
    if (messages.length === 0) {
        return (
            <Paper elevation={0} sx={{position: 'absolute', bottom: 0}}>
                <Typography component="p" variant="caption" style={{ textAlign: 'center' }}>
                    {"Start messaging! 🎉"}
                </Typography>
            </Paper>
        );
    }

    return (
        roomEvents.map((roomEvent, idx) => {
            const isCurrentUser = currentUser === roomEvent.username;

            if (roomEvent.msg_type === MSG_TYPES.JOINED) {
                return <Typography component="p" variant="body2" key={idx} sx={{ my: 2 }}>{roomEvent.username} is in the chat! 🎉</Typography>
            }
            return (
                <Paper sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                        mx: 2,
                        my: .2,
                        boxShadow: 'none', 
                        ml: isCurrentUser ? "auto" : 2,
                    }} 
                    key={idx}
                >
                    <UserAvatar username={roomEvent.username} avatar={avatars[roomEvent.username]} sx={{order: isCurrentUser ? 1 : 0, }}/>
                    <Paper sx={{
                            p: 1.5,
                            mx: .5,
                            overflowWrap: 'break-word',
                            bgcolor: isCurrentUser ? "#2196F3" : "#9E9E9E",
                        }}
                    >
                        <Typography component="p" variant="body1">{roomEvent.message}</Typography>
                    </Paper>
                    <Typography component="p" variant="caption" sx={{ alignSelf: 'flex-end', order: isCurrentUser ? -1 : 1, pb: .5}}>
                        <TimeAgo datetime={roomEvent.timestamp}/>
                    </Typography>
                </Paper>
            );
        })
    );
};

export default MessageCard;