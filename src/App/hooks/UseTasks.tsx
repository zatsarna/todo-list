import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../store';
import {tasksAPI, TaskStatuses, TaskType} from '../../api/tasks-api';
import {
    addTaskTC,
    deleteTaskTC,
    fetchTasksTC, updateTaskTC
} from '../../features/TodolistsList/tasksReducer';
import {useCallback, useEffect} from 'react';

export function useTask(todolistId: string, taskId: string) {
    const dispatch = useDispatch()
    const changeStatusHandler = (elId: string, status: TaskStatuses) => {
// @ts-ignore
        dispatch(updateTaskTC(todolistId, elId, {status:status}))
        //dispatch(changeTaskStatusAC(todolistId, elId, checked))
        //props.changeStatus(props.todolistId, elId, checked)
    }
    const deleteTaskHandler = () => {
        // @ts-ignore
        dispatch(deleteTaskTC(todolistId,taskId))
        /*tasksAPI.deleteTask(todolistId,taskId).then(
            res => dispatch(deleteTaskAC(taskId, todolistId))
        )*/
        //props.deleteTask(el.id, props.todolistId)
    }
    /* const changeIsDoneHandler=(checked: boolean)=>{
             props.changeStatus(props.todolistId, el.id, checked)
     }*/

    // @ts-ignore
    const updateEditableSpan=useCallback((updatedTitle: string) => dispatch(updateTaskTC(todolistId, taskId, {title:updatedTitle})), [taskId, todolistId, dispatch])

    return {changeStatusHandler, deleteTaskHandler, updateEditableSpan}
}
export function useTasks(todolistId: string) {
    const dispatch = useDispatch()
    const tasks= useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistId])

    useEffect(()=>{

        // @ts-ignore
        dispatch(fetchTasksTC(todolistId))
    },[])

    const addTaskHandler=useCallback((title: string)=> {
// @ts-ignore
        dispatch(addTaskTC(todolistId,title))
        //dispatch(addTaskAC(todolistId, title))
        //props.addTask(props.todolistId, title)
    },[todolistId, dispatch])
    return {tasks, addTaskHandler}
}