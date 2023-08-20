import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import { Todolist} from './Todolist';
import {ButtonAndInput} from './components/ButtonAndInput';
import ButtonAppBar from './components/AppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeFilterAC,
    deleteTodolistAC, FilterType, TodolistDomainType,
    updateTodolistTitleAC
} from './Reducers/todolistReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './Reducers/store';
import {TaskType} from './api/tasks-api';


//export type todolistsType = { id: string, title: string, filter: FilterType }
export type tasksObjectType = {
    [key: string]: Array<TaskType>,
}
export function AppWithRedux() {
console.log("App with redux")
    const dispatch=useDispatch()
    const todolists=useSelector<AppRootStateType, TodolistDomainType[]>(state =>state.todolists)

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
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{marginTop: '30px'}}>
                    <ButtonAndInput callback={addTodoList}/>
                </Grid>
                <Grid container spacing={3} style={{marginTop: '30px'}}>
                    {todolists.map(el => {

                        return (
                            <Grid item key={el.id}>
                                <Paper elevation={3} style={{padding: '15px'}}>
                                    <Todolist title={el.title}
                                              changeFilter={changeFilter}
                                              filter={el.filter}
                                              todolistId={el.id}
                                              deleteTodolist={deleteTodolist}
                                              updateTodolistTitle={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>

                        )
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
