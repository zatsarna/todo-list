import {
    addTodolistAC,
    changeFilterAC,
    deleteTodolistAC,
    FilterType,
    TodolistDomainType, updateTodolistTitleAC
} from '../../Reducers/todolistReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../Reducers/store';
import {useCallback} from 'react';

export function useTodolist() {
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const dispatch=useDispatch()

    const changeFilter = useCallback((value: FilterType, ID: string) => {
        dispatch(changeFilterAC(value, ID))
    },[dispatch])
    const deleteTodolist =useCallback( (todolistID: string) => {
        dispatch(deleteTodolistAC(todolistID))
    },[dispatch])
    const addTodoList =useCallback( (todoListTitle: string) => {
        const action=addTodolistAC(todoListTitle)
        dispatch(action)
    }, [dispatch])
    const updateTodolistTitle=useCallback((todolistID: string, updatedTitle: string)=> {
        dispatch(updateTodolistTitleAC(todolistID, updatedTitle))
    },[dispatch])
    return {todolists, changeFilter, deleteTodolist, addTodoList, updateTodolistTitle}
}