import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from '../features/TodolistsList/Todolist/Todolist';
import {ButtonAndInput} from '../components/ButtonAndInput/ButtonAndInput';
import ButtonAppBar from '../components/AppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {TaskType} from '../api/tasks-api';
import {useTodolist} from './hooks/UseTodolists';
import TodolistsList from '../features/TodolistsList/TodolistsList';




export function App() {
    console.log('App with redux')
    //const dispatch=useDispatch()
    /*const todolists=useSelector<AppRootStateType, TodolistDomainType[]>(state =>state.todolists)*/
    /*    const changeFilter = useCallback((value: FilterType, ID: string) => {
            dispatch(changeFilterAC(value, ID))
        },[dispatch])*/
    /*    const deleteTodolist =useCallback( (todolistID: string) => {
            dispatch(deleteTodolistAC(todolistID))
        },[dispatch])*/
    /*    const addTodoList =useCallback( (todoListTitle: string) => {
            const action=addTodolistAC(todoListTitle)
            dispatch(action)
        }, [dispatch])*/
    /*    const updateTodolistTitle=useCallback((todolistID: string, updatedTitle: string)=> {
            dispatch(updateTodolistTitleAC(todolistID, updatedTitle))
        },[dispatch])*/
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <TodolistsList/>
            </Container>

        </div>
    );
}

export default App;
