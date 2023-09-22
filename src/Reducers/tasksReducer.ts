import {addTodolistACType, deleteTodolistACType, SetTodolistsACType} from './todolistReducer';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskType} from '../api/tasks-api';
import {tasksObjectType} from '../App/AppWithRedux';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';
export type UpdateDomainTaskModelType={
    description?: string,
    title?: string
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string
}

const initialState: tasksObjectType={}
export const tasksReducer = (tasks: tasksObjectType =initialState, action: CommonTasksType): tasksObjectType => {
    switch (action.type) {
        case 'UpdateTask': {
            return {
                ...tasks,
                [action.payload.todolistID]: tasks[action.payload.todolistID].map(t => t.id === action.payload.taskID ? {
                    ...t,
                    ...action.payload.model
                } : t)
            }
        }
        case 'AddTask': {
            let newTask: TaskType = action.payload.task
            return {...tasks, [action.payload.task.todoListId]: [newTask, ...tasks[action.payload.task.todoListId]]}
        }
        case 'deleteTask': {
            return {
                ...tasks,
                [action.payload.todolistID]: tasks[action.payload.todolistID].filter(t => t.id !== action.payload.taskId)
            }
        }
        case 'AddTodolist': {
            return {...tasks, [action.payload.todolist.id]: []}
        }
        case 'DeleteTodolist': {
            const copyTasks = {...tasks}
            delete copyTasks[action.payload.todolistID]
            return copyTasks
        }
        case 'SET-TODOLISTS':{
            const copyState={...tasks}
            action.payload.todolists.forEach(el =>copyState[el.id]=[])
            return copyState
        }
        case 'SET-TASKS': {
            return {...tasks, [action.payload.todolistID]: action.payload.tasks}
        }
        default:
            return tasks
    }
}
export type CommonTasksType =
    changeTaskACType
    | addTaskACType
    | deleteTaskACType
    | addTodolistACType
    | deleteTodolistACType
| SetTodolistsACType
| setTasksACType
export type changeTaskACType = ReturnType<typeof changeTaskAC>
export const changeTaskAC = (todolistID: string, taskID: string, model:UpdateDomainTaskModelType) => {
    return {
        type: 'UpdateTask',
        payload: {todolistID, taskID, model}
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'AddTask',
        payload: {task}
    } as const
}

export type deleteTaskACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (taskId: string, todolistID: string) => {
    return {
        type: 'deleteTask',
        payload: {todolistID, taskId}
    } as const
}


export const setTasksAC = (todolistID: string, tasks: Array<TaskType>) => {
    return {
        type: 'SET-TASKS',
        payload: {todolistID, tasks}
    } as const
}
export type setTasksACType=ReturnType<typeof setTasksAC>
/*export type tasksForNewTodolistACType = ReturnType<typeof tasksForNewTodolistAC>*/
/*
export const tasksForNewTodolistAC=(todolistID:string)=>{
    return {
        type: "tasksForNewTodolist",
        payload: {todolistID}
    } as const
}*/
//ThunkCreator
export const fetchTasksTC=(todolistID: string)=>{
    return (dispatch: Dispatch)=>{
        tasksAPI.getTasks(todolistID).then(res => dispatch(setTasksAC(todolistID, res.data.items)))
    }
}
export const deleteTaskTC=(todolistID: string, taskId: string)=>{
    return (dispatch: Dispatch)=>{
        tasksAPI.deleteTask(todolistID, taskId).then(res => dispatch(deleteTaskAC(taskId, todolistID)))
    }
}
export const addTaskTC=(todolistId: string, title: string)=>{
    return (dispatch: Dispatch)=>{
        tasksAPI.createTask(todolistId, title).then(
            res=> dispatch(addTaskAC(res.data.data.item))
        )
    }
}
/*export const changeTaskStatusTC=(todolistID: string, taskID: string, status: TaskStatuses)=>{
    return (dispatch: Dispatch, getState: ()=>AppRootStateType)=>{
        const state=getState()
        const task=state.tasks[todolistID].find(el =>el.id===taskID)
        if (!task){
            console.warn('Task not found')
            return
        }
        tasksAPI.updateTask(todolistID,taskID,{deadline: task.deadline, title: task.title, description: task.description, startDate: task.startDate, priority: task.priority, status: status}).then(res =>dispatch(changeTaskStatusAC(todolistID,taskID,status)))
    }
}*/
export const updateTaskTC=(todolistID: string, taskID: string, DomainModel: UpdateDomainTaskModelType)=>{
    return (dispatch: Dispatch, getState: ()=>AppRootStateType)=>{
        const state=getState()
        const task=state.tasks[todolistID].find(el =>el.id===taskID)
        if (!task){
            console.warn('Task not found')
            return
        }
        const APImodel: UpdateTaskType={deadline: task.deadline, title: task.title, description: task.description, startDate: task.startDate, priority: task.priority, status: task.status, ...DomainModel

        }
        tasksAPI.updateTask(todolistID,taskID,APImodel).then(res =>dispatch(changeTaskAC(todolistID,taskID,DomainModel)))
    }
}
/*
export const changeTaskTitleTC=(todolistId: string, taskId: string, newTitle: string)=>{
    return (dispatch: Dispatch, getState: ()=>AppRootStateType)=>{
        const task=getState().tasks[todolistId].find(el =>el.id===taskId)
        if(!task){
            console.warn('No task found')
            return
        }
        tasksAPI.updateTask(todolistId,taskId,{title: newTitle, status: task.status, priority: task.priority, startDate: task.startDate, description: task.description, deadline: task.deadline}).then(res =>dispatch(updateTaskAC(todolistId, taskId, newTitle)))
    }
}*/
