import { Box } from '@mui/material';
import React, { useState } from 'react';

import { FormProvider } from '../helpers/FormContext';
import { IFormInputs } from '../helpers/types';


const InputForm = (props: any) => {
    const [inputs, setInputs] = useState<IFormInputs>({});
    const [isValid, setIsValid] = useState(0);
  
    const setInputInitialState = (inputName: string, initialValue = '') => {
        const INITIAL_INPUT_STATE = {
            invalid: false,
            invalidMsg: null,
            value: initialValue,
        };
        
        setInputs((prevState) => {
            if (inputName in prevState) {
                return prevState; 
            }
            return ({
                ...prevState,
                [inputName]: INITIAL_INPUT_STATE
            });
        });
    };
    
    const onChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
        const newValue = event.target.value;
        const inputName = event.target.name;
        let is_valid = 0;
        setInputs((prevState) => {
            const errMsg = props.validateInputs(inputName, newValue);
            if (errMsg) {
                if (!prevState[inputName].invalid) {
                    is_valid = -1;
                }
            }
            else {
                if (prevState[inputName].invalid) {
                    is_valid = 1;
                }
            }
            return ({
                ...prevState,
                [inputName]: {
                    ...prevState[inputName],
                    invalidMsg: errMsg,
                    invalid: errMsg ? true : false,
                    value: newValue,
                }
            });
        });
        setIsValid((prev) => prev + is_valid);
    };

    const resetInputs = (defaultValue = '') => {
        setInputs((prevState) => {
            Object.keys(prevState).forEach((key) => {
                prevState[key] = {
                    ...prevState[key],
                    value: defaultValue
                };
            });
            return prevState;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const is_valid = handleIsValid();
        if (is_valid === 0) {
            props.onSubmit(inputs);
            if (props.resetOnSubmit) {
                resetInputs('');
            }
        }
       setIsValid(is_valid);
    };

    const handleIsValid = () => {
        let is_valid = 0;
        setInputs((prevState) => {
            Object.keys(prevState).forEach((key) => {
                const errMsg = props.validateInputs(key, prevState[key].value);
                if (errMsg) {
                    --is_valid;
                    prevState[key] = {
                        ...prevState[key],
                        invalid: errMsg ? true : false,
                        invalidMsg: errMsg,
                    };
                }
            });
            return prevState;
        });
        return is_valid;
    };

    return (
        <FormProvider value={{
            onChange: onChange,
            inputs: inputs,
            isValid: isValid,
            setInputInitialState: setInputInitialState,
        }}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{...props.sx }}>
            {props.children}
            </Box>
        </FormProvider>
    );
};

export default InputForm;