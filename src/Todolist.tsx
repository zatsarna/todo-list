import React, {useCallback} from 'react';
import {FilterType} from './AppWithRedux';
import {ButtonAndInput} from './components/ButtonAndInput';
import {EditableSpan} from './components/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux';
import {addTaskAC} from './Reducers/tasksReducer';
import {AppRootStateType} from './Reducers/store';
import {Task} from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    //tasks: Array<TaskType>
    //deleteTask: (elId: string, todolistID: string) => void
    changeFilter: (value: FilterType, ID: string) => void
    //addTask: (todolistID: string, t: string) => void
    //changeStatus: (todolistID: string, tID: string, isChecked: boolean) => void
    filter: FilterType
    todolistId: string
    deleteTodolist: (todolistID: string) => void
    //updateTasks: (todolistID: string, taskID: string, updatedTitle: string) => void
    updateTodolistTitle: (todolistID: string, updatedTitle: string) => void
}

export const Todolist =React.memo(function (props: PropsType) {
    console.log("todolist")
    const tasks=useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])
    const dispatch=useDispatch()

    let allTodolistTasks=tasks
    let tasksForTodoList: TaskType[] = allTodolistTasks
    if (props.filter === 'active') {
        tasksForTodoList = allTodolistTasks.filter(e => !e.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = allTodolistTasks.filter(e => e.isDone)
    }

    const mappedTasks = tasksForTodoList.map((el) => <Task todolistId={props.todolistId} el={el} key={el.id}/>)

   const addTaskHandler=useCallback((title: string)=> {
        dispatch(addTaskAC(props.todolistId, title))
        //props.addTask(props.todolistId, title)
    },[props.todolistId, dispatch])

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
            {/*<input onChange={onChangeHandler} value={title} onKeyDown={onKeyDownHandler} className={error ? "error" : ""}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={"errorMessage"}>{error}</div>}*/}

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
            {/* <button onClick={() => changeFilterHandler('all')} className={(props.filter==="all") ? "activeFilter" : ""}>All</button>*/}
            {/*<button onClick={() => changeFilterHandler('active')} className={(props.filter==="active") ? "activeFilter" : ""}>Active</button>*/}
            {/*<button onClick={() => changeFilterHandler('completed')} className={(props.filter==="completed") ? "activeFilter" : ""}>Completed</button>*/}
        </div>
    </div>
})


