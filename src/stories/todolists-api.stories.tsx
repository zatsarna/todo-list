import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistsAPI} from '../api/todolists-api';

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'e56039dc-1bc5-46ae-a274-05b570794f8e'
    }
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTodolists().then(res => {
            setState(res.data)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolists('NewTODO').then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4b219c9f-7da9-4dee-84d5-20af44a06d8f'
        todolistsAPI.deleteTodolist(todolistId).then(res => setState(res.data))
            .catch(err => setState(err.message))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'db25298c-40e8-425a-b4c7-b5d4ea281cb2'
        todolistsAPI.updateTodolistTitle(todolistId, 'NEW').then(res => setState(res.data))
            .catch(err => setState(err.message))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

