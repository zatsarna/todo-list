
import React from 'react'
import {EditableSpan} from './EditableSpan';
import {action} from '@storybook/addon-actions'
export default {
    title: 'TODO/EditableSpan stories',
    component: EditableSpan,
    tags: ['autodocs']
}

export const EditableSpanExample=(props: any)=>{

    return <EditableSpan  oldTitle={'React'} calback={action('EditableSpan')} />
}