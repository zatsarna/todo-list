import React, {useEffect, useState} from 'react'
import {tasksAPI} from '../api/tasks-api';

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
    useEffect(() => {
        const todolistId = '3f46ac61-f3e0-4236-af3e-fe1c2bc88427'

        tasksAPI.getTasks(todolistId).then(res => {
            setState(res.data.items)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
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
        <input placeholder={'todolistId'} value={taskId} onChange={(event)=>{setTodolistId(event.currentTarget.value)}}/>
        <input placeholder={'taskId'} value={todolistId} onChange={(event)=>setTaskId(event.currentTarget.value)}/>
        <button onClick={deleteTask}>Delete task</button>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '3f46ac61-f3e0-4236-af3e-fe1c2bc88427'
        const taskTitle='HaHa'
        tasksAPI.createTask(todolistId, taskTitle).then(res => {
            setState(res.data)
        }).catch(err => setState(err.message))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '3f46ac61-f3e0-4236-af3e-fe1c2bc88427'
        const taskTitle={title: 'hi', description: 'aa', status: 1, priority: 1, startDate: '2023-08-19T01:36:34.6611636Z', deadline: '2023-08-29T01:36:34.6611636Z'}
        const taskId='d562d9e7-c0df-4b78-b7b2-82e3a03c9c11'
        tasksAPI.updateTask(todolistId, taskId,taskTitle).then(res => {
            setState(res.data)
        }).catch(err => setState(err.message))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}


