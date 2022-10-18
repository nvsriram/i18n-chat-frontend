import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FormSubmit from '../components/FormSubmit';
import InputForm from '../components/InputForm';
import TextInput from '../components/TextInput';
import { validateInputs } from '../helpers/ValidateInputs';

const JoinRoom = (props) => {
    const setValues = (values) => {
        props.setRoomName(values["Room Name"].value);
        props.setUsername(values["Username"].value);
        props.setIsLoggedIn(true);
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
                ChatRoom
            </Typography>
            <InputForm
                onSubmit={setValues}
                validateInputs={validateInputs}
            >
                <TextInput
                    variant="outlined"
                    id="room-name"
                    label="Room Name"
                    name="Room Name"
                    type="text"
                    placeholder="My_Custom_Room"
                    autoFocus
                />
                <TextInput
                    variant="outlined"
                    id="username"
                    label="Username"
                    name= "Username"
                    type="text"
                    placeholder="Bob"
                />
                <FormSubmit
                    variant="contained"
                    color="success"
                    fullWidth
                >
                    Join Room
                </FormSubmit>
            </InputForm>
        </Box>
    );
};

export default JoinRoom;