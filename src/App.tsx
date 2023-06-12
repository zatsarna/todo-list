import React, {useReducer, useState} from 'react';
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
    tasksForNewTodolistAC,
    tasksReducer,
    updateTaskAC
} from './Reducers/tasksReducer';

export type FilterType = 'all' | 'active' | 'completed'
export type todolistsType = { id: string, title: string, filter: FilterType }
export type tasksObjectType = {
    [key: string]: Array<TaskType>,
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
        ]
    })
    const changeStatus = (todolistID: string, taskID: string, isChecked: boolean) => {
       /* setTasks({...tasks, [todolistID]: tasks[todolistID].map(el =>el.id===taskID ? {...el, isDone: isChecked}:el)})*/
        dispatchTasks(changeTaskStatusAC(todolistID, taskID, isChecked))
    }

    const addTask = (todolistID:string,title: string) => {
        /* let newTask= {id: v1(), title: title, isDone: false}
             setTasks({...tasks, [todolistID]: [newTask,...tasks[todolistID]]})*/
        dispatchTasks(addTaskAC(todolistID, title))
    }
    const deleteTask = (taskId: string, todolistID: string) => {
        /*setTasks({
            ...tasks, [todolistID]: tasks[todolistID].filter(e => e.id !== taskId)
            })*/
    dispatchTasks(deleteTaskAC(taskId,todolistID))
    }
    const changeFilter = (value: FilterType, ID: string) => {
        //setFilter(value)
        /*setTodolists(todolists.map(el => {
            return (
                el.id === ID ? {...el, filter: value} : el
            )
        }))*/
        dispatchTodolists(changeFilterAC(value,ID))
    }
const deleteTodolist=(todolistID: string)=>{
    /*setTodolists(todolists.filter(el => el.id!==todolistID))
     delete tasks[todolistID]*/
    dispatchTodolists(deleteTodolistAC(todolistID))
}

const addTodoList =(todoListTitle: string)=>{
    const newTLID=v1()
       /* const newTLID=v1()
    const newTL: todolistsType={id: newTLID, title: todoListTitle, filter: 'all'}
    setTodolists([...todolists, newTL])
    setTasks({...tasks, [newTLID]: []})*/
    dispatchTodolists(addTodolistAC(todoListTitle, newTLID))
    //dispatchTasks(tasksForNewTodolistAC(newTLID))
}
const updateTasks=(todolistID: string, taskID: string, updatedTitle: string)=>{
   /* setTasks({...tasks, [todolistID]: tasks[todolistID].map(t =>t.id===taskID ? {...t, title: updatedTitle}:t)})*/
    dispatchTasks(updateTaskAC(todolistID, taskID, updatedTitle))
}

    function updateTodolistTitle(todolistID:string, updatedTitle:string) {
        /*setTodolists(todolists.map(tl => tl.id===todolistID ? {...tl, title: updatedTitle}:tl))*/
        dispatchTodolists(updateTodolistTitleAC(todolistID, updatedTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container  style={{marginTop: "30px"}}>
                    <ButtonAndInput  callback={addTodoList}/>
                </Grid>
                <Grid container spacing={3} style={{marginTop: "30px"}}>
                    {todolists.map(el => {
                        let tasksForTodoList = tasks[el.id]
                        if (el.filter === 'active') {
                            tasksForTodoList = tasks[el.id].filter(e => !e.isDone)
                        }
                        if (el.filter === 'completed') {
                            tasksForTodoList = tasks[el.id].filter(e => e.isDone)
                        }
                        return (
                            <Grid item>
                                <Paper elevation={3} style={{padding: '15px'}}>
                                <Todolist title={el.title} tasks={tasksForTodoList} deleteTask={deleteTask}
                                          changeFilter={changeFilter} addTask={addTask}
                                          changeStatus={changeStatus}
                                          filter={el.filter}
                                          key={el.id}
                                          todolistId={el.id}
                                          deleteTodolist={deleteTodolist}
                                          updateTasks={updateTasks}
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

export default App;
