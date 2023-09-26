import {useDispatch} from 'react-redux';
import {changeTaskAC, deleteTaskAC} from '../../tasksReducer';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SuperCheckBox from '../../../../components/SuperCheckBox';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import React, {useCallback} from 'react';
import {TaskStatuses, TaskType} from '../../../../api/tasks-api';
import {useTask, useTasks} from '../../../../App/hooks/UseTasks';


export type TaskPropsType = {
    todolistId: string,
    el: TaskType

}
export const Task = React.memo((props: TaskPropsType) => {
    console.log("task")
    const { changeStatusHandler, deleteTaskHandler, updateEditableSpan}=useTask(props.todolistId, props.el.id)
    /*const dispatch = useDispatch()*/
/*    const changeStatusHandler = (elId: string, checked: boolean) => {
        dispatch(changeTaskStatusAC(props.todolistId, elId, checked))
        //props.changeStatus(props.todolistId, elId, checked)
    }
    const deleteTaskHandler = () => {
        dispatch(deleteTaskAC(props.el.id, props.todolistId))
        //props.deleteTask(el.id, props.todolistId)
    }
    /!* const changeIsDoneHandler=(checked: boolean)=>{
             props.changeStatus(props.todolistId, el.id, checked)
     }*!/
const updateEditableSpan=useCallback((updatedTitle: string) => dispatch(updateTaskAC(props.todolistId, props.el.id, updatedTitle)),[props.el.id, props.todolistId, dispatch])*/

    return (
        <li key={props.el.id} className={(props.el.status===TaskStatuses.Completed) ? 'isDone' : ''}>
            {/*<button onClick={deleteTaskHandler}>X</button>*/}
            <IconButton aria-label="delete" onClick={deleteTaskHandler}>
                <DeleteIcon/>
            </IconButton>
            {/* <input type="checkbox" onChange={changeIsDoneHandler} checked={el.isDone}/>*/}
            {/*<Checkbox   color="success" onChange={changeIsDoneHandler} checked={el.isDone}/>*/}
            <SuperCheckBox checked={props.el.status===TaskStatuses.Completed} color={'primary'}
                           callback={(checked: TaskStatuses) => changeStatusHandler(props.el.id, checked )}/>
            <EditableSpan oldTitle={props.el.title}
                          calback={updateEditableSpan}/>
        </li>
    )
})