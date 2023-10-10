import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {AppActionTypes, AppRootStateType, AppThunk} from '../../App/store';
import {ThunkAction} from 'redux-thunk';
import {requestStatusType, setStatusAC, setStatusACType} from '../../App/App-reducer';

//types
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterType, todoStatus: requestStatusType }
export type CommonTodolistType =
    | deleteTodolistACType
    | updateTodolistTitleACType
    | changeFilterACType
    | addTodolistACType
    | SetTodolistsACType
type todoThunkDispatch=Dispatch<CommonTodolistType | setStatusACType>
export type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>
type updateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type SetTodolistsACType = ReturnType<typeof SetTodolistsAC>

export let todolistID1 = v1()
export let todolistID2 = v1()

const initialState: TodolistDomainType[] = []
export const todolistsReducer = (todolists: TodolistDomainType[] = initialState, action: CommonTodolistType): TodolistDomainType[] => {
    switch (action.type) {
        case 'DeleteTodolist':
            return todolists.filter(el => el.id !== action.payload.todolistID)
        case 'UpdateTodolistTitle':
            return todolists.map(el => el.id === action.payload.todolistID ? {
                ...el,
                title: action.payload.updatedTitle
            } : el)
        case 'ChangeFilter':
            return todolists.map(tl => tl.id === action.payload.ID ? {...tl, filter: action.payload.value} : tl)
        case 'AddTodolist':
            return [{...action.payload.todolist, filter: 'all', todoStatus: 'idle'}, ...todolists]
        case 'SET-TODOLISTS':
            return action.payload.todolists.map(t => ({...t, filter: 'all', todoStatus: 'idle'}))
        default:
            return todolists
    }
}

//Action creators
export const deleteTodolistAC = (todolistID: string) => ({type: 'DeleteTodolist', payload: {todolistID}} as const)
export const updateTodolistTitleAC = (todolistID: string, updatedTitle: string) => ({
    type: 'UpdateTodolistTitle',
    payload: {todolistID, updatedTitle}
} as const)
export const changeFilterAC = (value: FilterType, ID: string) => ({type: 'ChangeFilter', payload: {value, ID}} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'AddTodolist', payload: {todolist}} as const)
export const SetTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', payload: {todolists}} as const)


//ThunkCreator
export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch: todoThunkDispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.getTodolists().then(res => {
            dispatch(SetTodolistsAC(res.data))
            dispatch(setStatusAC('succeeded'))
        })
    }
}
export const deleteTodolistTC = (todolistID: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.deleteTodolist(todolistID).then(res => dispatch(deleteTodolistAC(todolistID)))
    }
}
// ThunkAction Typization
// 1 параметр - описываем, что возвращает thunk
// 2 параметр - state всего приложения
// 3 параметр - экстра аргументы
// 4 параметр - все action всего App

export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.createTodolists(title).then(res => {
            dispatch(fetchTodolistsTC())
            dispatch(setStatusAC('succeeded'))
        })
    }
}
export const changeTodolistTitleTC = (todolistId: string, newTitle: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.updateTodolistTitle(todolistId, newTitle).then(res => dispatch(updateTodolistTitleAC(todolistId, newTitle)))
    }
}