
import React from 'react'
import {Task} from './Task';
import {action} from '@storybook/addon-actions'
import {Provider, useSelector} from 'react-redux';
import {AppRootStateType, store} from './Reducers/store';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';
import {CommonTodolistType, TodolistDomainType} from './Reducers/todolistReducer';
import {Story} from '@storybook/react';
import {TaskType} from './api/tasks-api';
export default {
    title: 'TODO/Task stories',
    component: Task,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
}

const TaskWrapper=()=>{
    const todolist=useSelector<AppRootStateType, TodolistDomainType>(store =>store.todolists[0])
    const tasks=useSelector<AppRootStateType, TaskType[]>(store => store.tasks['todolistId1'])
    return <>
        <Task todolistId={todolist.id} el={tasks[0]}/>
    </>
}
export const TaskExample: Story=()=><TaskWrapper/>