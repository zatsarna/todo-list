import React, {useCallback} from 'react';
import {ButtonAndInput} from '../../../components/ButtonAndInput/ButtonAndInput';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux';
import {addTaskAC} from '../tasksReducer';
import {AppRootStateType} from '../../../App/store';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/tasks-api';
import {FilterType, TodolistDomainType} from '../todolistReducer';
import {useTasks} from '../../../App/hooks/UseTasks';

/*export type TaskType = {
    id: string
    title: string
    isDone: boolean
}*/

type PropsType = {
    todolist: TodolistDomainType
    changeFilter: (value: FilterType, ID: string) => void
    deleteTodolist: (todolistID: string) => void
    updateTodolistTitle: (todolistID: string, updatedTitle: string) => void
    demo?: boolean
}

export const Todolist = React.memo(function ({demo=false, ...props}: PropsType) {

    console.log('todolist')
    const {tasks, addTaskHandler} = useTasks(props.todolist.id, demo)
    /*    const tasks=useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])*/
    //const dispatch=useDispatch()

    let allTodolistTasks = tasks
    let tasksForTodoList: TaskType[] = allTodolistTasks
    if (props.todolist.filter === 'active') {
        tasksForTodoList = allTodolistTasks.filter(e => e.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodoList = allTodolistTasks.filter(e => e.status === TaskStatuses.Completed)
    }

    const mappedTasks = tasksForTodoList.map((el) => <Task todolistId={props.todolist.id} el={el} key={el.id}/>)

    /*  const addTaskHandler=useCallback((title: string)=> {
           dispatch(addTaskAC(props.todolistId, title))
           //props.addTask(props.todolistId, title)
       },[props.todolistId, dispatch])*/

    const updateTodolistTitleHandler = useCallback((updatedTitle: string) => {
        props.updateTodolistTitle(props.todolist.id, updatedTitle)
    }, [props.updateTodolistTitle, props.todolist.id])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])

    return <div>
        <h3>
            {/*{props.title}*/}
            <EditableSpan oldTitle={props.todolist.title} calback={updateTodolistTitleHandler} />
            {/* <button onClick={()=>props.deleteTodolist(props.todolistId)}>Delete list</button>*/}
            <IconButton disabled={props.todolist.todoStatus==='loading'} aria-label="delete" onClick={() => props.deleteTodolist(props.todolist.id)}>
                <DeleteIcon/>
            </IconButton>

        </h3>
        <div>
            <ButtonAndInput callback={addTaskHandler} disabled={props.todolist.todoStatus==='loading'} />

        </div>
        <ul>
            {mappedTasks}
        </ul>
        <div>
            <Button variant={(props.todolist.filter === 'all') ? 'contained' : 'outlined'}
                    onClick={onAllClickHandler} color="primary">All</Button>
            <Button variant={(props.todolist.filter === 'active') ? 'contained' : 'outlined'}
                    onClick={onActiveClickHandler} color="secondary">Active</Button>
            <Button variant={(props.todolist.filter === 'completed') ? 'contained' : 'outlined'}
                    onClick={onCompletedClickHandler} color="success">Completed</Button>
        </div>
    </div>
})


