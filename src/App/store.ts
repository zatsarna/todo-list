import {applyMiddleware, combineReducers, createStore} from 'redux';
import {CommonTasksType, tasksReducer} from '../features/TodolistsList/tasksReducer';
import {CommonTodolistType, todolistsReducer} from '../features/TodolistsList/todolistReducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {appReducer, setErrorACType, setStatusACType} from './App-reducer';

export const rootReducer = combineReducers({tasks: tasksReducer, todolists: todolistsReducer, app: appReducer})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

//All action types
export type AppActionTypes = CommonTodolistType | CommonTasksType | setStatusACType | setErrorACType
// ThunkAction
// 1 параметр - описываем, что возвращает thunk
// 2 параметр - state всего приложения
// 3 параметр - экстра аргументы
// 4 параметр - все action всего App
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionTypes>

// @ts-ignore
window.store = store;