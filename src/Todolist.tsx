import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType} from './App';
import {ButtonAndInput} from './components/ButtonAndInput';
import {EditableSpan} from './components/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import SuperCheckBox from './components/SuperCheckBox';

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
    const changeStatusHandler=(elId: string, checked: boolean)=>{
        props.changeStatus(props.todolistId, elId, checked)
    }

    const mappedTasks = props.tasks.map((el) => {

        const deleteTaskHandler = () => {
            props.deleteTask(el.id, props.todolistId)
        }
       /* const changeIsDoneHandler=(checked: boolean)=>{
                props.changeStatus(props.todolistId, el.id, checked)
        }*/

        return (
            <li key={el.id} className={(el.isDone) ? "isDone" : ""}>
                {/*<button onClick={deleteTaskHandler}>X</button>*/}
                <IconButton aria-label="delete" onClick={deleteTaskHandler}>
                    <DeleteIcon />
                </IconButton>
               {/* <input type="checkbox" onChange={changeIsDoneHandler} checked={el.isDone}/>*/}
                {/*<Checkbox   color="success" onChange={changeIsDoneHandler} checked={el.isDone}/>*/}
                <SuperCheckBox isDone={el.isDone} color={'primary'} callback={(checked)=>changeStatusHandler(el.id, checked)}/>
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
           {/* <button onClick={()=>props.deleteTodolist(props.todolistId)}>Delete list</button>*/}
            <IconButton aria-label="delete" onClick={()=>props.deleteTodolist(props.todolistId)}>
                <DeleteIcon />
            </IconButton>

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
            <Button variant={(props.filter==="all") ? "contained" : "outlined"} onClick={() => changeFilterHandler('all')} color="primary">All</Button>
            <Button variant={(props.filter==="active") ? "contained" : "outlined"} onClick={() => changeFilterHandler('active')} color="secondary">Active</Button>
            <Button variant={(props.filter==="completed") ? "contained" : "outlined"} onClick={() => changeFilterHandler('completed')} color="success">Completed</Button>
           {/* <button onClick={() => changeFilterHandler('all')} className={(props.filter==="all") ? "activeFilter" : ""}>All</button>*/}
            {/*<button onClick={() => changeFilterHandler('active')} className={(props.filter==="active") ? "activeFilter" : ""}>Active</button>*/}
            {/*<button onClick={() => changeFilterHandler('completed')} className={(props.filter==="completed") ? "activeFilter" : ""}>Completed</button>*/}
        </div>
    </div>
}
