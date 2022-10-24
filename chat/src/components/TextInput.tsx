import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../helpers/FormContext';
import { ITextInput } from '../helpers/types';

const TextInput = (props: ITextInput) => {
    const formContext = useFormContext();
  
    useEffect(() => {
      formContext.setInputInitialState(props.name);
    },[formContext, props.name]);
  
    return (
        <TextField
            variant={props.variant}
            margin='normal'
            required={!props.removeHelperText}
            fullWidth
            id={props.id}
            label={props.label}
            name={props.name}
            type={props.type}
            error={!props.removeHelperText && formContext.inputs[props.name] && formContext.inputs[props.name].invalid}
            helperText=
                {props.removeHelperText! ? '' :
                    (props.name in formContext.inputs && formContext.inputs[props.name].invalid) ?
                    formContext.inputs[props.name].invalidMsg
                    : ' '
                }
            placeholder={props.placeholder}
            autoFocus={props.autoFocus}
            value={(props.name in formContext.inputs) ?
                formContext.inputs[props.name].value
                : ''}
                onChange={formContext.onChange}
            sx={{ ...props.sx, mt: 0 }}
            color={props.color}
        />
    );
};

export default TextInput;

    

