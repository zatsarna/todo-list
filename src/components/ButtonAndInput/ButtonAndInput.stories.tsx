
import React from 'react'

import {action} from '@storybook/addon-actions'
import {ButtonAndInput} from './ButtonAndInput';
export default {
    title: 'TODO/AddItemForm stories',
    component: ButtonAndInput,
    tags: ['autodocs']
}

export const AddItemFormBaseExample=(props: any)=>{

return <ButtonAndInput  callback={action('ButtonAndInput')}/>
}

