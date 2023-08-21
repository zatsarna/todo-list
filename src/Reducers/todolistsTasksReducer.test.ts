import {tasksObjectType} from '../App/AppWithRedux';
import {addTodolistAC, TodolistDomainType, todolistsReducer} from './todolistReducer';
import {tasksReducer} from './tasksReducer';
import {v1} from 'uuid';

test('ids should be equal', ()=>{
    const startTasksState: tasksObjectType={}
    const startTodolistState: TodolistDomainType[]=[]

    const action=addTodolistAC('newTodolist*')
    const endTasksState=tasksReducer(startTasksState,action)
    //={'newtlID': []}
    const endTodolistsState=todolistsReducer(startTodolistState,action)
    //=[{id:'newtlID', title: 'New title', filter: 'all'}]

    const keys=Object.keys(endTasksState) //['newtlID']
    const idFromTasks=keys[0] //='newtlID'
    const idFromTodolists=endTodolistsState[0].id //['newtlID']

    expect(idFromTasks).toBe(action.payload.newTLID)
    expect(idFromTodolists).toBe(action.payload.newTLID)
})