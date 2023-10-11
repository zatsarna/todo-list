import {
     addTodolistTC,
    changeFilterAC, changeTodolistTitleTC,
     deleteTodolistTC, fetchTodolistsTC,
    FilterType,
    TodolistDomainType,
} from '../../features/TodolistsList/todolistReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../store';
import {useCallback, useEffect} from 'react';
import {todolistsAPI} from '../../api/todolists-api';

export function useTodolist(demo: boolean) {
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const dispatch=useDispatch()

    useEffect(()=>{
        if (demo){
            return
        }
        // @ts-ignore
        dispatch(fetchTodolistsTC())
    },[])

    const changeFilter = useCallback((value: FilterType, ID: string) => {
        dispatch(changeFilterAC(value, ID))
    },[dispatch])
    const deleteTodolist =useCallback( (todolistID: string) => {
        // @ts-ignore
        dispatch(deleteTodolistTC(todolistID))
    },[dispatch])
    const addTodoList =useCallback( (todoListTitle: string) => {
        // @ts-ignore
        dispatch(addTodolistTC(todoListTitle))
    }, [dispatch])
    const updateTodolistTitle=useCallback((todolistID: string, updatedTitle: string)=> {
        // @ts-ignore
        dispatch(changeTodolistTitleTC(todolistID,updatedTitle))
    },[dispatch])
    return {todolists, changeFilter, deleteTodolist, addTodoList, updateTodolistTitle}
}