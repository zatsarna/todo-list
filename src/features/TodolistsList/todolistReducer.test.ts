import {v1} from 'uuid';
import {
    addTodolistAC, changeFilterAC, changeTodoStatusAC,
    deleteTodolistAC, FilterType, SetTodolistsAC, TodolistDomainType,
    todolistsReducer,
    updateTodolistTitleAC
} from './todolistReducer';
import {requestStatusType} from '../../App/App-reducer';

let todolistID1: string
let todolistID2: string
let startState: TodolistDomainType[]
beforeEach(()=>{
    todolistID1 = v1()
    todolistID2 = v1()
    startState= [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 1, todoStatus: 'idle'},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 1, todoStatus: 'idle'},
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistID1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {
    let todolistID3 = v1()
    const newTL: TodolistDomainType = {id: todolistID3, title: 'What to learn2', filter: 'all', addedDate: '', order: 1, todoStatus: 'idle'}
    const endState = todolistsReducer(startState, addTodolistAC(newTL))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('What to learn2')
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState, updateTodolistTitleAC(todolistID2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct todolist of todolist should be applied', () => {
    let newFilter: FilterType = 'completed'
    const endState = todolistsReducer(startState, changeFilterAC(newFilter, todolistID2))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
test('todolists should be set to the state', () => {
    const startState: TodolistDomainType[] = []
    const todolists = [
        {id: todolistID1, title: 'What to learn', addedDate: '', order: 1},
        {id: todolistID2, title: 'What to buy', addedDate: '', order: 1}
    ]
    const endState = todolistsReducer(startState, SetTodolistsAC(todolists))

    expect(endState.length).toEqual(2)
    expect(endState[0].filter).toBe('all')
})
test('todolist Status should be changed', () => {
    let newStatus: requestStatusType='loading'
    const endState = todolistsReducer(startState, changeTodoStatusAC(newStatus,todolistID2))

    expect(endState[0].todoStatus).toBe('idle')
    expect(endState[1].todoStatus).toBe(newStatus)
})