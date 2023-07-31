import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {ButtonAndInput} from './components/ButtonAndInput';
import ButtonAppBar from './components/AppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeFilterAC,
    deleteTodolistAC,
    todolistsReducer,
    updateTodolistTitleAC
} from './Reducers/todolistReducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    deleteTaskAC,
    tasksReducer,
    updateTaskAC
} from './Reducers/tasksReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './Reducers/store';
export type FilterType = 'all' | 'active' | 'completed'
export type todolistsType = { id: string, title: string, filter: FilterType }
export type tasksObjectType = {
    [key: string]: Array<TaskType>,
}
function AppWithRedux() {
console.log("App with redux")
    const dispatch=useDispatch()
    const todolists=useSelector<AppRootStateType, todolistsType[]>(state =>state.todolists)
    /*const tasks=useSelector<AppRootStateType, tasksObjectType>(state => state.tasks)*/
/*    const changeStatus = (todolistID: string, taskID: string, isChecked: boolean) => {dispatch(changeTaskStatusAC(todolistID, taskID, isChecked))
    }
    const addTask = (todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }
    const updateTasks = (todolistID: string, taskID: string, updatedTitle: string) => {
        dispatch(updateTaskAC(todolistID, taskID, updatedTitle))
    }
    const deleteTask = (taskId: string, todolistID: string) => {
        dispatch(deleteTaskAC(taskId, todolistID))
    }*/
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
                       /* let tasksForTodoList = tasks[el.id]
                        if (el.filter === 'active') {
                            tasksForTodoList = tasks[el.id].filter(e => !e.isDone)
                        }
                        if (el.filter === 'completed') {
                            tasksForTodoList = tasks[el.id].filter(e => e.isDone)
                        }*/
                        return (
                            <Grid item key={el.id}>
                                <Paper elevation={3} style={{padding: '15px'}}>
                                    <Todolist title={el.title}
                                              //tasks={tasksForTodoList}
                                              //deleteTask={deleteTask}
                                              changeFilter={changeFilter}
                                              //addTask={addTask}
                                              //changeStatus={changeStatus}
                                              filter={el.filter}

                                              todolistId={el.id}
                                              deleteTodolist={deleteTodolist}
                                             // updateTasks={updateTasks}
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
