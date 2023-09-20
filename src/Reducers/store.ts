import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from './tasksReducer';
import {todolistsReducer} from './todolistReducer';
import thunkMiddleware from 'redux-thunk';
export const rootReducer=combineReducers({tasks: tasksReducer,todolists: todolistsReducer})
/*type AppRootState={
    todolists: todolistsType[]
    tasks: tasksObjectType
}*/
export type AppRootStateType=ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
// @ts-ignore
window.store=store;