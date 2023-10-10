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
import {LinearProgress} from '@mui/material';
import {ErrorSnackbar} from '../components/ErrorSnackBar/ErrorSnackBar';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {requestStatusType} from './App-reducer';




export function App() {
    const status=useSelector<AppRootStateType, requestStatusType>(state=>state.app.status)
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
            { status==='loading' && <LinearProgress  />}
            <Container fixed>
                <ErrorSnackbar/>
                <TodolistsList/>
            </Container>

        </div>
    );
}

export default App;
