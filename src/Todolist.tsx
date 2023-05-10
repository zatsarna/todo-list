import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType} from './App';
import {Button} from './components/Button';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (elId: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (t: string) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('')
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addTaskHandler()
    }
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const changeFilterHandler = (v: FilterType) => {
        props.changeFilter(v)
    }
    const mappedTasks = props.tasks.map((el) => {
        const deleteTaskHandler = () => {
            props.deleteTask(el.id)
        }
        return (
            <li key={el.id}>
                <Button name={'X'} callBack={deleteTaskHandler}/>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
            </li>
        )
    })

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onChange={onChangeHandler} value={title} onKeyDown={onKeyDownHandler}/>
            <Button name={'+'} callBack={addTaskHandler}/>

        </div>
        <ul>
            {mappedTasks}
        </ul>
        <div>
            <Button name={'All'} callBack={() => changeFilterHandler('all')}/>
            <Button name={'Active'} callBack={() => changeFilterHandler('active')}/>
            <Button name={'Completed'} callBack={() => changeFilterHandler('completed')}/>
        </div>
    </div>
}
