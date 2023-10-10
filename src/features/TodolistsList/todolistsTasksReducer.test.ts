
import {addTodolistAC, TodolistDomainType, todolistsReducer} from './todolistReducer';
import {tasksObjectType, tasksReducer} from './tasksReducer';
import {v1} from 'uuid';

test('ids should be equal', ()=>{
    const startTasksState: tasksObjectType={}
    const startTodolistState: TodolistDomainType[]=[]
    let todolistID3 = v1()

    const newTL: TodolistDomainType = {id: todolistID3, title: 'What to learn2', filter: 'all', addedDate: '', order: 1, todoStatus: 'idle'}
    const action=addTodolistAC(newTL)
    const endTasksState=tasksReducer(startTasksState,action)
    //={'newtlID': []}
    const endTodolistsState=todolistsReducer(startTodolistState,action)
    //=[{id:'newtlID', title: 'New title', filter: 'all'}]

    const keys=Object.keys(endTasksState) //['newtlID']
    const idFromTasks=keys[0] //='newtlID'
    const idFromTodolists=endTodolistsState[0].id //['newtlID']

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})