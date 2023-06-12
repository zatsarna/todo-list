import {FilterType, todolistsType} from '../App';
import {v1} from 'uuid';

export const todolistsReducer =(todolists: todolistsType[], action: CommonTodolistType): todolistsType[] =>{
    switch (action.type){
        case 'DeleteTodolist': {
            return todolists.filter(el => el.id!==action.payload.todolistID)
        }
        case 'UpdateTodolistTitle': {
            return todolists.map(el => el.id===action.payload.todolistID ? {...el, title: action.payload.updatedTitle}: el)
        }
        case 'ChangeFilter':{
            return todolists.map(tl => tl.id===action.payload.ID ? {...tl, filter: action.payload.value}:tl)
        }
        case 'AddTodolist':{

            const newTL: todolistsType={id: action.payload.newTLID, title: action.payload.todoListTitle, filter: 'all'}
            return [newTL,...todolists]
        }
        default: return todolists
    }
}
export type CommonTodolistType=deleteTodolistACType | updateTodolistTitleACType | changeFilterACType | addTodolistACType

export type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC=(todolistID: string)=>{
    return {
        type: "DeleteTodolist",
        payload: {
            todolistID
        }
    } as const
}
export type updateTodolistTitleACType=ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC=(todolistID:string, updatedTitle:string)=>{
    return {
        type: "UpdateTodolistTitle",
        payload: {todolistID, updatedTitle}
    } as const
}
export type changeFilterACType=ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterType, ID: string)=>{
    return {
        type: "ChangeFilter",
        payload: {value, ID}
    } as const
}
export type addTodolistACType=ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todoListTitle: string, newTLID: string)=>{
    return {
        type: "AddTodolist",
        payload: {
            todoListTitle,
            newTLID
        }
    } as const
}