import React from 'react';
import { Avatar, Typography } from "@mui/material";
import { Stack } from "@mui/system";

const UserAvatar: React.FC<{username: string, avatar:string, sx: any}> = ({username, avatar, ...props}) => {

    return (
        <Stack {...props}>
            <Avatar alt={username} src={avatar} />
            <Typography component="p" variant="body2">{username}</Typography>
        </Stack>
    );
}

export default UserAvatar;