import {ChangeEvent, KeyboardEvent, useState} from 'react';

export const useButtonAndInput=(callback: (title: string) => void)=>{
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
            callback(title.trim())

            setTitle('')
        }
    }
    return {title, error, onChangeHandler, onKeyDownHandler, addTaskHandler}
}