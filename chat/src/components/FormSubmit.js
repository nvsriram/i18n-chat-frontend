import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { FormContext } from '../helpers/FormContext';

const FormSubmit = (props) => {
    
    const formContext = useContext(FormContext);

    return (
        <Button
            type='submit'
            fullWidth={props.fullWidth}
            color={props.color}
            disabled={formContext.isValid < 0}
            sx={{ ...props.sx, my: 1 }}
            {...props}
        >
            {props.children}
        </Button>
    );
};

export default FormSubmit;
