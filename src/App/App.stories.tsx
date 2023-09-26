
import React from 'react'
import {App} from './App';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';
import {decorators} from '@storybook/react/dist/config';
export default {
    title: 'TODO/App stories',
    component: App,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
}

export const AppExample=()=>{

    return <App/>
}