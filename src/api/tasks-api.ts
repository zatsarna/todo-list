import axios from 'axios';
import {ResponceType} from './todolists-api';

export const instance=axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e56039dc-1bc5-46ae-a274-05b570794f8e'
    }
})

type TaskType={
    description: string,
    title: string
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string
}
type UpdateTaskType={
    description: string,
    title: string
    status: number,
    priority: number,
    startDate: string,
    deadline: string
}
type TasksResponceType={
    items: TaskType[],
    totalCount: number,
    error: string | null
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<TasksResponceType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponceType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponceType>(`todo-lists/${todolistId}/tasks/`, {title: taskTitle})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponceType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },

}