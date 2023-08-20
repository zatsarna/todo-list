import {v1} from 'uuid';
import {addTodolistACType, deleteTodolistACType} from './todolistReducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/tasks-api';
import {tasksObjectType} from '../AppWithRedux';

const initialState: tasksObjectType={}
export const tasksReducer = (tasks: tasksObjectType =initialState, action: CommonTasksType): tasksObjectType => {
    switch (action.type) {
        case 'ChangeTaskStatus': {
            return {
                ...tasks,
                [action.payload.todolistID]: tasks[action.payload.todolistID].map(t => t.id === action.payload.taskID ? {
                    ...t,
                    status: action.payload.isChecked ? TaskStatuses.Completed : TaskStatuses.New
                } : t)
            }
        }
        case 'AddTask': {
            let newTask: TaskType = {id: v1(), title: action.payload.title, completed: false, description: '', status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: action.payload.todolistID, order: 1, addedDate: ''}
            return {...tasks, [action.payload.todolistID]: [newTask, ...tasks[action.payload.todolistID]]}
        }
        case 'deleteTask': {
            return {
                ...tasks,
                [action.payload.todolistID]: tasks[action.payload.todolistID].filter(t => t.id !== action.payload.taskId)
            }
        }
        case 'updateTask': {
            return {
                ...tasks,
                [action.payload.todolistID]: tasks[action.payload.todolistID].map(t => t.id === action.payload.taskID ? {
                    ...t,
                    title: action.payload.updatedTitle
                } : t)
            }
        }
        case 'AddTodolist': {
            return {...tasks, [action.payload.newTLID]: []}
        }
        case 'DeleteTodolist': {
            const copyTasks = {...tasks}
            delete copyTasks[action.payload.todolistID]
            return copyTasks
        }
        default:
            return tasks
    }
}
export type CommonTasksType =
    changeTaskStatusACType
    | addTaskACType
    | deleteTaskACType
    | updateTaskACType
    | addTodolistACType
    | deleteTodolistACType
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistID: string, taskID: string, isChecked: boolean) => {
    return {
        type: 'ChangeTaskStatus',
        payload: {todolistID, taskID, isChecked}
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'AddTask',
        payload: {todolistID, title}
    } as const
}

export type deleteTaskACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (taskId: string, todolistID: string) => {
    return {
        type: 'deleteTask',
        payload: {todolistID, taskId}
    } as const
}
export type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistID: string, taskID: string, updatedTitle: string) => {
    return {
        type: 'updateTask',
        payload: {todolistID, taskID, updatedTitle}
    } as const
}
/*export type tasksForNewTodolistACType = ReturnType<typeof tasksForNewTodolistAC>*/
/*
export const tasksForNewTodolistAC=(todolistID:string)=>{
    return {
        type: "tasksForNewTodolist",
        payload: {todolistID}
    } as const
}*/
