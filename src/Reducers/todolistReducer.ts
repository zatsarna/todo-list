import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api';
import {Dispatch} from 'redux';

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterType }
export let todolistID1 = v1()
export let todolistID2 = v1()

const initialState: TodolistDomainType[] = []
export const todolistsReducer = (todolists: TodolistDomainType[] = initialState, action: CommonTodolistType): TodolistDomainType[] => {
    switch (action.type) {
        case 'DeleteTodolist': {
            return todolists.filter(el => el.id !== action.payload.todolistID)
        }
        case 'UpdateTodolistTitle': {
            return todolists.map(el => el.id === action.payload.todolistID ? {
                ...el,
                title: action.payload.updatedTitle
            } : el)
        }
        case 'ChangeFilter': {
            return todolists.map(tl => tl.id === action.payload.ID ? {...tl, filter: action.payload.value} : tl)
        }
        case 'AddTodolist': {

            const newTL: TodolistDomainType = {...action.payload.todolist, filter: 'all'}
            return [newTL, ...todolists]
        }
        case 'SET-TODOLISTS': {
            return action.payload.todolists.map(t => {
                return {...t, filter: 'all'}
            })
        }
        default:
            return todolists
    }
}
export type CommonTodolistType =
    deleteTodolistACType
    | updateTodolistTitleACType
    | changeFilterACType
    | addTodolistACType
    | SetTodolistsACType

export type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (todolistID: string) => {
    return {
        type: 'DeleteTodolist',
        payload: {
            todolistID
        }
    } as const
}
export type updateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC = (todolistID: string, updatedTitle: string) => {
    return {
        type: 'UpdateTodolistTitle',
        payload: {todolistID, updatedTitle}
    } as const
}
export type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterType, ID: string) => {
    return {
        type: 'ChangeFilter',
        payload: {value, ID}
    } as const
}
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'AddTodolist',
        payload: {
            todolist
        }
    } as const
}
export const SetTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const
}
export type SetTodolistsACType = ReturnType<typeof SetTodolistsAC>

//ThunkCreator
export const fetchTodolistsTC=()=>{
    return (dispatch: Dispatch)=>{
        todolistsAPI.getTodolists().then(res =>dispatch(SetTodolistsAC(res.data)))
    }
}
export const deleteTodolistTC=(todolistID: string)=>{
    return (dispatch: Dispatch)=>{
        todolistsAPI.deleteTodolist(todolistID).then(res =>dispatch(deleteTodolistAC(todolistID)))
    }
}
export const addTodolistTC=(title: string)=>{
    return (dispatch: Dispatch)=>{
        todolistsAPI.createTodolists(title).then(res =>dispatch(addTodolistAC(res.data.data.item)))
    }
}
export const changeTodolistTitleTC=(todolistId: string, newTitle: string)=>{
    return (dispatch: Dispatch)=>{
        todolistsAPI.updateTodolistTitle(todolistId,newTitle).then(res =>dispatch(updateTodolistTitleAC(todolistId, newTitle)))
    }
}