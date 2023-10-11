import {Provider} from 'react-redux';
import {AppRootStateType, store} from '../App/store';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import { tasksReducer } from '../features/TodolistsList/tasksReducer';
import {todolistsReducer} from '../features/TodolistsList/todolistReducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/tasks-api';
import {appReducer} from '../App/App-reducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 1, todoStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 1, todoStatus: 'loading'},
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: '1', title: 'HTML&CSS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
            {id: '2', title: 'JS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
        ],
        ["todolistId2"]: [
            {id: '1', title: 'HTML&CSS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
            {id: '2', title: 'JS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
        ]
    },
    app: {
        status: 'idle',
        error: null
    }

};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunkMiddleware));


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
