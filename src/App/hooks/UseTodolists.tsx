import {
    addTodolistAC, addTodolistTC,
    changeFilterAC, changeTodolistTitleTC,
    deleteTodolistAC, deleteTodolistTC, fetchTodolistsTC,
    FilterType, SetTodolistsAC,
    TodolistDomainType, updateTodolistTitleAC
} from '../../Reducers/todolistReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../Reducers/store';
import {useCallback, useEffect} from 'react';
import {todolistsAPI} from '../../api/todolists-api';

export function useTodolist() {
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const dispatch=useDispatch()

    useEffect(()=>{

        // @ts-ignore
        dispatch(fetchTodolistsTC())
    },[])

    const changeFilter = useCallback((value: FilterType, ID: string) => {
        dispatch(changeFilterAC(value, ID))
    },[dispatch])
    const deleteTodolist =useCallback( (todolistID: string) => {
        // @ts-ignore
        dispatch(deleteTodolistTC(todolistID))
        //dispatch(deleteTodolistAC(todolistID))
    },[dispatch])
    const addTodoList =useCallback( (todoListTitle: string) => {
        // @ts-ignore
        dispatch(addTodolistTC(todoListTitle))
       /* const action=addTodolistAC(todoListTitle)
        dispatch(action)*/
    }, [dispatch])
    const updateTodolistTitle=useCallback((todolistID: string, updatedTitle: string)=> {

        // @ts-ignore
        dispatch(changeTodolistTitleTC(todolistID,updatedTitle))
        //dispatch(updateTodolistTitleAC(todolistID, updatedTitle))
    },[dispatch])
    return {todolists, changeFilter, deleteTodolist, addTodoList, updateTodolistTitle}
}