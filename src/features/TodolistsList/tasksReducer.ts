
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskType} from '../../api/tasks-api';
import {Dispatch} from 'redux';
import {AppActionTypes, AppRootStateType, AppThunk} from '../../App/store';
import {addTodolistACType, deleteTodolistACType, SetTodolistsACType} from './todolistReducer';
import {setErrorAC, setErrorACType, setStatusAC, setStatusACType} from '../../App/App-reducer';

//types
export type UpdateDomainTaskModelType = {
    description?: string,
    title?: string
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string
}
export type tasksObjectType = {
    [key: string]: Array<TaskType>,
}
export type changeTaskACType = ReturnType<typeof changeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type deleteTaskACType = ReturnType<typeof deleteTaskAC>
export type setTasksACType = ReturnType<typeof setTasksAC>
export type CommonTasksType =
    | changeTaskACType
    | addTaskACType
    | deleteTaskACType
    | addTodolistACType
    | deleteTodolistACType
    | SetTodolistsACType
    | setTasksACType

const initialState: tasksObjectType = {}
export const tasksReducer = (tasks: tasksObjectType = initialState, action: CommonTasksType): tasksObjectType => {
    switch (action.type) {
        case 'UpdateTask':
            return {
                ...tasks,
                [action.payload.todolistID]: tasks[action.payload.todolistID].map(t => t.id === action.payload.taskID ?
                    {...t, ...action.payload.model} : t)
            }
        case 'AddTask':
            return {
                ...tasks,
                [action.payload.task.todoListId]: [action.payload.task, ...tasks[action.payload.task.todoListId]]
            }
        case 'deleteTask':
            return {
                ...tasks,
                [action.payload.todolistID]: tasks[action.payload.todolistID].filter(t => t.id !== action.payload.taskId)
            }
        case 'AddTodolist':
            return {...tasks, [action.payload.todolist.id]: []}
        case 'DeleteTodolist':
            const copyTasks = {...tasks}
            delete copyTasks[action.payload.todolistID]
            return copyTasks
        case 'SET-TODOLISTS':
            const copyState = {...tasks}
            action.payload.todolists.forEach(el => copyState[el.id] = [])
            return copyState
        case 'SET-TASKS':
            return {...tasks, [action.payload.todolistID]: action.payload.tasks}
        default:
            return tasks
    }
}


//Actions
export const changeTaskAC = (todolistID: string, taskID: string, model: UpdateDomainTaskModelType) => ({
    type: 'UpdateTask',
    payload: {todolistID, taskID, model}
} as const)
export const addTaskAC = (task: TaskType) => ({type: 'AddTask', payload: {task}} as const)
export const deleteTaskAC = (taskId: string, todolistID: string) => ({
    type: 'deleteTask',
    payload: {todolistID, taskId}
} as const)
export const setTasksAC = (todolistID: string, tasks: Array<TaskType>) => ({
    type: 'SET-TASKS',
    payload: {todolistID, tasks}
} as const)


//ThunkCreator
export const fetchTasksTC = (todolistID: string): AppThunk => async (dispatch: Dispatch<CommonTasksType | setStatusACType>) => {
    dispatch(setStatusAC('loading'))
    try {
        const res= await tasksAPI.getTasks(todolistID)
        dispatch(setTasksAC(todolistID, res.data.items))
        dispatch(setStatusAC('succeeded'))
    } catch(e){
        console.warn('error')
    }


}
/*export const fetchTasksTC = (todolistID: string): AppThunk => ((dispatch) => {
    tasksAPI.getTasks(todolistID).then(res => dispatch(setTasksAC(todolistID, res.data.items)))
})*/
export const deleteTaskTC = (todolistID: string, taskId: string): AppThunk => ((dispatch) => {
    tasksAPI.deleteTask(todolistID, taskId).then(res => dispatch(deleteTaskAC(taskId, todolistID)))
})
export const addTaskTC = (todolistId: string, title: string): AppThunk => ((dispatch: Dispatch<CommonTasksType | setErrorACType | setStatusACType>) => {
    dispatch(setStatusAC('loading'))
    tasksAPI.createTask(todolistId, title).then(res => {
        if (res.data.resultCode===0){
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setStatusAC('succeeded'))
        }else {
            if(res.data.messages.length){
                dispatch(setErrorAC(res.data.messages[0]))
            }else {
                dispatch(setErrorAC('some error'))
            }
            dispatch(setStatusAC('failed'))
        }

    })
})

export const updateTaskTC = (todolistID: string, taskID: string, DomainModel: UpdateDomainTaskModelType): AppThunk => ((dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistID].find(el => el.id === taskID)
        if (!task) {
            console.warn('Task not found')
            return
        }
        const APImodel: UpdateTaskType = {
            deadline: task.deadline,
            title: task.title,
            description: task.description,
            startDate: task.startDate,
            priority: task.priority,
            status: task.status, ...DomainModel

        }
        tasksAPI.updateTask(todolistID, taskID, APImodel).then(res => dispatch(changeTaskAC(todolistID, taskID, DomainModel)))
    }
)

