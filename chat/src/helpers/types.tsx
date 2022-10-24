export enum MSG_TYPES { 
  JOINED = 'joined', 
  MESSAGE = 'message', 
  LEAVE = 'leave'
};

export interface IMessage {
  message: string,
  timestamp: string,
  username: string,
  lang: string
};
  
export interface IRoomEvent {
  msg_type: MSG_TYPES,
  message?: string,
  timestamp: string,
  userID?: number,
  username: string,
  lang?: string,
};

export interface IAvatar {
  [key: string]: string
};
 
export interface ITextInput {
  variant: "standard" | "filled" | "outlined",
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
  label: string,
  id: string,
  name: string,
  type: string,
  placeholder?:string,
  removeHelperText?: boolean,
  autoFocus?: boolean,
  sx?: {[key: string]: string}
};

export interface IFormInputs {
  [name: string]: {
    value: string,
    invalid: boolean,
    invalidMsg: string | null,
  }
};

export interface IFormContext {
  inputs: IFormInputs,
  setInputInitialState: (inputName: string, initialValue?: string) => void,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  isValid: number,
};
  