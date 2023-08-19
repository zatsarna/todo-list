import React, {useEffect, useState} from 'react'
import {tasksAPI, UpdateTaskType} from '../api/tasks-api';
export default {
    title: 'API Tasks'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'e56039dc-1bc5-46ae-a274-05b570794f8e'
    }
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState< string>('')
    function getTasks() {
        tasksAPI.getTasks(todolistId).then(res => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(event)=>{setTodolistId(event.currentTarget.value)}}/>
        <button onClick={getTasks}>Get tasks</button>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState< string>('')
    const [todolistId, setTodolistId] = useState< string>('')
    const deleteTask=()=>{
        tasksAPI.deleteTask(todolistId, taskId).then(res => {
            setState(res.data)
        }).catch(err => setState(err.message))
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(event)=>{setTodolistId(event.currentTarget.value)}}/>
        <input placeholder={'taskId'} value={taskId} onChange={(event)=>setTaskId(event.currentTarget.value)}/>
        <button onClick={deleteTask}>Delete task</button>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState< string>('')
    const [todolistId, setTodolistId] = useState< string>('')
    function createTask() {
        tasksAPI.createTask(todolistId, taskTitle).then(res => {
            setState(res.data)
        }).catch(err => setState(err.message))
        setTaskTitle('')
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(event)=>{setTodolistId(event.currentTarget.value)}}/>
        <input placeholder={'task Title'} value={taskTitle} onChange={(event)=>setTaskTitle(event.currentTarget.value)}/>
        <button onClick={createTask}>Create task</button>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState< string>('')
    const [taskId, setTaskId] = useState< string>('')
    const [taskTitle, setTaskTitle] = useState< UpdateTaskType>({title: '', description: '', status: 1, priority: 1, startDate: '', deadline: ''})
    function updateTask() {
        tasksAPI.updateTask(todolistId, taskId,taskTitle).then(res => {
            setState(res.data)
        }).catch(err => setState(err.message))
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(event)=>{setTodolistId(event.currentTarget.value)}}/>
        <input placeholder={'taskId'} value={taskId} onChange={(event)=>{setTaskId(event.currentTarget.value)}}/>
        <input placeholder={'task Title'} value={taskTitle.title} onChange={(event)=>setTaskTitle({...taskTitle, title: event.currentTarget.value})}/>
        <button onClick={updateTask}>Update task</button>
    </div>
}


