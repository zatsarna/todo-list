
import React from 'react'
import {ButtonAndInput} from './ButtonAndInput';
import {action} from '@storybook/addon-actions'
export default {
    title: 'TODO/AddItemForm stories',
    component: ButtonAndInput,
    tags: ['autodocs']
}

export const AddItemFormBaseExample=(props: any)=>{

return <ButtonAndInput  callback={action('ButtonAndInput')}/>
}

