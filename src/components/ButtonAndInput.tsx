import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
type PropsType={
    callback: (title: string) => void
}
export const ButtonAndInput = (props: PropsType) => {
    let [title, setTitle] = useState('')
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
            /*setError("Field should not be empty")*/
            props.callback(title.trim())

            setTitle('')
        }
    }
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
            />
            <Button variant="contained" onClick={addTaskHandler} style={muiButtonStyle}>+</Button>
            {/*{error && <div className={"errorMessage"}>{error}</div>}*/}
        </div>

    );
};

