import { Paper, Toolbar, Typography, useScrollTrigger } from "@mui/material";

const Navbar = ({room, username}) => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    })

    return (
        <Paper
            elevation={trigger ? 4 : 2} 
            sx={{ bgcolor: 'primary.main', width: '100%'}}
            square
        >
            <Toolbar sx={{display: 'grid', gridTemplateColumns: '1fr 3fr 1fr'}}>
                <Typography component="h5" variant="h5" sx={{ gridColumn: '1/2' }}>
                    {room}
                </Typography>
                <Typography component='h6' variant = 'h6' sx={{ gridColumn: '2/3', textAlign: 'center' }}>
                    {username}
                </Typography>
            </Toolbar>
        </Paper>
    );
}

export default Navbar;