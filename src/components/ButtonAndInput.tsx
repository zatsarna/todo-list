import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
    return (
        <>
            <input onChange={onChangeHandler} value={title} onKeyDown={onKeyDownHandler} className={error ? "error" : ""}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={"errorMessage"}>{error}</div>}
        </>

    );
};

