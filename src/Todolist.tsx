import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType} from './App';
import {ButtonAndInput} from './components/ButtonAndInput';
import {EditableSpan} from './components/EditableSpan';


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
    updateTasks: (todolistID: string, taskID: string, updatedTitle: string)=>void
    updateTodolistTitle: (todolistID:string, updatedTitle: string)=>void
}

export function Todolist(props: PropsType) {
    const changeFilterHandler = (v: FilterType) => {
        props.changeFilter(v, props.todolistId)
    }
    const upTaskHelper=(elID: string,updatedTask: string)=>{
        props.updateTasks(props.todolistId,elID, updatedTask)
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
                <button onClick={deleteTaskHandler}>X</button>
                <input type="checkbox" onChange={changeIsDoneHandler} checked={el.isDone}/>
                <EditableSpan oldTitle={el.title} calback={(updatedTitle)=>upTaskHelper(el.id, updatedTitle)}/>
            </li>
        )
    })

    function addTaskHandler(title: string) {
        props.addTask(props.todolistId, title)
    }
    const updateTodolistTitleHandler=(updatedTitle:string)=>{
        props.updateTodolistTitle(props.todolistId, updatedTitle)
    }

    return <div>
        <h3>
            {/*{props.title}*/}
            <EditableSpan oldTitle={props.title} calback={updateTodolistTitleHandler}/>
            <button onClick={()=>props.deleteTodolist(props.todolistId)}>Delete list</button>

        </h3>
        <div>
            <ButtonAndInput  callback={addTaskHandler}/>
            {/*<input onChange={onChangeHandler} value={title} onKeyDown={onKeyDownHandler} className={error ? "error" : ""}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={"errorMessage"}>{error}</div>}*/}

        </div>
        <ul>
            {mappedTasks}
        </ul>
        <div>
            <button onClick={() => changeFilterHandler('all')} className={(props.filter==="all") ? "activeFilter" : ""}>All</button>
            <button onClick={() => changeFilterHandler('active')} className={(props.filter==="active") ? "activeFilter" : ""}>Active</button>
            <button onClick={() => changeFilterHandler('completed')} className={(props.filter==="completed") ? "activeFilter" : ""}>Completed</button>
        </div>
    </div>
}
