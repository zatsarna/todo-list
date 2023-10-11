import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useButtonAndInput} from './hooks/useButtonAndInput';
type PropsType={
    callback: (title: string) => void
    disabled?: boolean
}
export const ButtonAndInput =React.memo( ({disabled=false, callback}: PropsType) => {
    console.log("button and input")
    const {title, error, onChangeHandler, onKeyDownHandler, addTaskHandler}=useButtonAndInput(callback)
    /*let [title, setTitle] = useState('')
    const [error, setError]=useState<null | string>(null)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addTaskHandler()
    }
    const addTaskHandler = () => {
        if (title.trim() === "") {
            setError("Title is required")
            return;
        } else {
            /!*setError("Field should not be empty")*!/
            props.callback(title.trim())

            setTitle('')
        }
    }*/
    const muiButtonStyle={maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}
    return (
        <div>
            {/*<input onChange={onChangeHandler} value={title} onKeyDown={onKeyDownHandler} className={error ? "error" : ""}/>*/}
            <TextField
                variant={'outlined'}
                id="outlined-basic"
                label={error ? error : "Enter task"}
                size={"small"}
                onChange={onChangeHandler}
                value={title}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                disabled={disabled}
            />
            <Button disabled={disabled} variant="contained" onClick={addTaskHandler} style={muiButtonStyle}>+</Button>
            {/*{error && <div className={"errorMessage"}>{error}</div>}*/}
        </div>

    );
})


