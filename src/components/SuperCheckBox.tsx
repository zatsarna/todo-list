import React, {ChangeEvent} from 'react';
import Checkbox from '@mui/material/Checkbox';
type SuperCheckBoxPropsType ={
    callback: (checked: boolean)=>void
    color: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default" | undefined
    isDone: boolean
}

const SuperCheckBox: React.FC<SuperCheckBoxPropsType> = ({callback, isDone, color}) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
        callback(event.currentTarget.checked)
    }
    return (
        <Checkbox   color={color} onChange={onChangeHandler} checked={isDone}/>
    );
};

export default SuperCheckBox;