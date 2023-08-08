
import React from 'react'
import {Task} from './Task';
import {action} from '@storybook/addon-actions'
import {Provider, useSelector} from 'react-redux';
import {AppRootStateType, store} from './Reducers/store';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';
import {TaskType} from './Todolist';
import {CommonTodolistType} from './Reducers/todolistReducer';
import {todolistsType} from './AppWithRedux';
import {Story} from '@storybook/react';
export default {
    title: 'TODO/Task stories',
    component: Task,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
}

const TaskWrapper=()=>{
    const todolist=useSelector<AppRootStateType, todolistsType>(store =>store.todolists[0])
    const tasks=useSelector<AppRootStateType, TaskType[]>(store => store.tasks['todolistId1'])
    return <>
        <Task todolistId={todolist.id} el={tasks[0]}/>
    </>
}
export const TaskExample: Story=()=><TaskWrapper/>