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
    deleteTask: (elId: string, todolistID: string) => void
    changeFilter: (value: FilterType, ID: string) => void
    addTask: (todolistID:string, t: string) => void
    changeStatus: (todolistID: string,tID: string, isChecked: boolean)=>void
    filter: FilterType
    todolistId: string
    deleteTodolist: (todolistID: string)=>void
}

export function Todolist(props: PropsType) {
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
        if (title.trim()==="") {
            setError("Title is required")
            return;
        }else {
            /*setError("Field should not be empty")*/
            props.addTask(props.todolistId,title.trim())

            setTitle('')
        }


    }
    const changeFilterHandler = (v: FilterType) => {
        props.changeFilter(v, props.todolistId)
    }


    const mappedTasks = props.tasks.map((el) => {
        const deleteTaskHandler = () => {
            props.deleteTask(el.id, props.todolistId)
        }
        const changeIsDoneHandler=(event: ChangeEvent<HTMLInputElement>)=>{
                props.changeStatus(props.todolistId, el.id, event.currentTarget.checked)

        }
        return (
            <li key={el.id} className={(el.isDone) ? "isDone" : ""}>
                <Button name={'X'} callBack={deleteTaskHandler}/>
                <input type="checkbox" onChange={changeIsDoneHandler} checked={el.isDone}/>
                <span>{el.title}</span>
            </li>
        )
    })

    return <div>
        <h3>
            {props.title}
            <Button name={"Delete list"} callBack={()=>props.deleteTodolist(props.todolistId)}/>
        </h3>
        <div>
            <input onChange={onChangeHandler} value={title} onKeyDown={onKeyDownHandler} className={error ? "error" : ""}/>
            <Button name={'+'} callBack={addTaskHandler}/>
            {error && <div className={"errorMessage"}>{error}</div>}

        </div>
        <ul>
            {mappedTasks}
        </ul>
        <div>
            <Button name={'All'} callBack={() => changeFilterHandler('all')} className={(props.filter==="all") ? "activeFilter" : ""}/>
            <Button name={'Active'} callBack={() => changeFilterHandler('active')} className={(props.filter==="active") ? "activeFilter" : ""}/>
            <Button name={'Completed'} callBack={() => changeFilterHandler('completed')} className={(props.filter==="completed") ? "activeFilter" : ""}/>
        </div>
    </div>
}
