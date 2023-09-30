import {applyMiddleware, combineReducers, createStore} from 'redux';
import {CommonTasksType, tasksReducer} from '../features/TodolistsList/tasksReducer';
import {CommonTodolistType, todolistsReducer} from '../features/TodolistsList/todolistReducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';

export const rootReducer = combineReducers({tasks: tasksReducer, todolists: todolistsReducer})
/*type AppRootState={
    todolists: todolistsType[]
    tasks: tasksObjectType
}*/
export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

//All action types
export type AppActionTypes = CommonTodolistType | CommonTasksType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionTypes>

// @ts-ignore
window.store = store;