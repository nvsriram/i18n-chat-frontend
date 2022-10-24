import { Avatar, Typography } from "@mui/material";
import { Stack } from "@mui/system";

const UserAvatar = ({username, avatar, ...props}) => {

    return (
        <Stack {...props}>
            <Avatar alt={username} src={avatar} />
            <Typography component="p" variant="body2">{username}</Typography>
        </Stack>
    );
}

export default UserAvatar;