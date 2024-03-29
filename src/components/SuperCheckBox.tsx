import React, {ChangeEvent} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses} from '../api/tasks-api';

type SuperCheckBoxPropsType ={
    callback: (checked: TaskStatuses)=>void
    color: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default" | undefined
    checked: boolean
}

const SuperCheckBox: React.FC<SuperCheckBoxPropsType> = ({callback, checked, color}) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
        callback(event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }
    return (
        <Checkbox   color={color} onChange={onChangeHandler} checked={checked}/>
    );
};

export default SuperCheckBox;