import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../Reducers/store';
import {TaskType} from '../../api/tasks-api';
import {addTaskAC, changeTaskStatusAC, deleteTaskAC, updateTaskAC} from '../../Reducers/tasksReducer';
import {useCallback} from 'react';

export function useTask(todolistId: string, taskId: string) {
    const dispatch = useDispatch()
    const changeStatusHandler = (elId: string, checked: boolean) => {

        dispatch(changeTaskStatusAC(todolistId, elId, checked))
        //props.changeStatus(props.todolistId, elId, checked)
    }
    const deleteTaskHandler = () => {
        dispatch(deleteTaskAC(taskId, todolistId))
        //props.deleteTask(el.id, props.todolistId)
    }
    /* const changeIsDoneHandler=(checked: boolean)=>{
             props.changeStatus(props.todolistId, el.id, checked)
     }*/
    const updateEditableSpan=useCallback((updatedTitle: string) => dispatch(updateTaskAC(todolistId, taskId, updatedTitle)),[taskId, todolistId, dispatch])

    return {changeStatusHandler, deleteTaskHandler, updateEditableSpan}
}
export function useTasks(todolistId: string) {
    const dispatch = useDispatch()
    const tasks= useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistId])
    const addTaskHandler=useCallback((title: string)=> {
        dispatch(addTaskAC(todolistId, title))
        //props.addTask(props.todolistId, title)
    },[todolistId, dispatch])
    return {tasks, addTaskHandler}
}