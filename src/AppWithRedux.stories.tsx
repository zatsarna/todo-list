
import React from 'react'
import {AppWithRedux} from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';
import {decorators} from '@storybook/react/dist/config';
export default {
    title: 'TODO/AppWithRedux stories',
    component: AppWithRedux,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxExample=()=>{

    return <AppWithRedux/>
}