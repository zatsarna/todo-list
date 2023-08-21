import React, {useCallback} from 'react';
import {ButtonAndInput} from './components/ButtonAndInput/ButtonAndInput';
import {EditableSpan} from './components/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux';
import {addTaskAC} from './Reducers/tasksReducer';
import {AppRootStateType} from './Reducers/store';
import {Task} from './Task';
import {TaskStatuses, TaskType} from './api/tasks-api';
import {FilterType} from './Reducers/todolistReducer';
import {tasksObjectType} from './App/AppWithRedux';
import {useTasks} from './App/hooks/UseTasks';

/*export type TaskType = {
    id: string
    title: string
    isDone: boolean
}*/

type PropsType = {
    title: string
    changeFilter: (value: FilterType, ID: string) => void
    filter: FilterType
    todolistId: string
    deleteTodolist: (todolistID: string) => void
    updateTodolistTitle: (todolistID: string, updatedTitle: string) => void

}

export const Todolist =React.memo(function (props: PropsType) {
    console.log("todolist")
const {tasks, addTaskHandler}=useTasks(props.todolistId)
/*    const tasks=useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])*/
    //const dispatch=useDispatch()

    let allTodolistTasks=tasks
    let tasksForTodoList: TaskType[] = allTodolistTasks
    if (props.filter === 'active') {
        tasksForTodoList = allTodolistTasks.filter(e => e.status===TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = allTodolistTasks.filter(e => e.status===TaskStatuses.Completed)
    }

    const mappedTasks = tasksForTodoList.map((el) => <Task todolistId={props.todolistId} el={el} key={el.id}/>)

 /*  const addTaskHandler=useCallback((title: string)=> {
        dispatch(addTaskAC(props.todolistId, title))
        //props.addTask(props.todolistId, title)
    },[props.todolistId, dispatch])*/

    const updateTodolistTitleHandler = useCallback((updatedTitle: string) => {props.updateTodolistTitle(props.todolistId, updatedTitle)},[props.updateTodolistTitle, props.todolistId])

    const onAllClickHandler=useCallback( ()=>{props.changeFilter('all', props.todolistId)},[props.changeFilter, props.todolistId])
    const onActiveClickHandler=useCallback(() =>{props.changeFilter('active', props.todolistId)},[props.changeFilter, props.todolistId])
    const onCompletedClickHandler=useCallback(() =>{props.changeFilter('completed', props.todolistId)},[props.changeFilter, props.todolistId])

    return <div>
        <h3>
            {/*{props.title}*/}
            <EditableSpan oldTitle={props.title} calback={updateTodolistTitleHandler}/>
            {/* <button onClick={()=>props.deleteTodolist(props.todolistId)}>Delete list</button>*/}
            <IconButton aria-label="delete" onClick={() => props.deleteTodolist(props.todolistId)}>
                <DeleteIcon/>
            </IconButton>

        </h3>
        <div>
            <ButtonAndInput callback={addTaskHandler}/>

        </div>
        <ul>
            {mappedTasks}
        </ul>
        <div>
            <Button variant={(props.filter === 'all') ? 'contained' : 'outlined'}
                    onClick={onAllClickHandler} color="primary">All</Button>
            <Button variant={(props.filter === 'active') ? 'contained' : 'outlined'}
                    onClick={onActiveClickHandler} color="secondary">Active</Button>
            <Button variant={(props.filter === 'completed') ? 'contained' : 'outlined'}
                    onClick={onCompletedClickHandler} color="success">Completed</Button>
        </div>
    </div>
})


