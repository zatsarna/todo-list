
import {instance} from './tasks-api';

type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type ResponceType<D={}> = {
    resultCode: number,
    messages: Array<string>,
    fieldsErrors: Array<string>
    data: D
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolists(newTitle: string) {
        return instance.post<ResponceType<{item: TodolistType}>>('todo-lists', {'title': newTitle})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponceType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, newTitle: string) {
        return instance.put<ResponceType>(`todo-lists/${todolistId}`, {title: newTitle})
    }
}