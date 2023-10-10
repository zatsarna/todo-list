import {v1} from 'uuid';
import {
    addTodolistAC, changeFilterAC,
    deleteTodolistAC, FilterType, SetTodolistsAC, TodolistDomainType,
    todolistsReducer,
    updateTodolistTitleAC
} from './todolistReducer';


test('correct todolist should be removed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TodolistDomainType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 1, todoStatus: 'idle'},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 1, todoStatus: 'idle'},
    ]
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistID1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let todolistID3 = v1()

    const newTL: TodolistDomainType = {id: todolistID3, title: 'What to learn2', filter: 'all', addedDate: '', order: 1, todoStatus: 'idle'}

    const startState: TodolistDomainType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 1, todoStatus: 'idle'},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 1, todoStatus: 'idle'},
    ]
    const endState = todolistsReducer(startState, addTodolistAC(newTL))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('What to learn2')
})

test('correct todolist should change its name', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let newTodolistTitle = 'New Todolist'


    const startState: TodolistDomainType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 1, todoStatus: 'idle'},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 1, todoStatus: 'idle'},
    ]
    const endState = todolistsReducer(startState, updateTodolistTitleAC(todolistID2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct todolist of todolist should be applied', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let newFilter: FilterType = 'completed'

    const startState: TodolistDomainType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 1, todoStatus: 'idle'},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 1, todoStatus: 'idle'},
    ]
    const endState = todolistsReducer(startState, changeFilterAC(newFilter, todolistID2))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
test('todolists should be set to the state', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    const startState: TodolistDomainType[] = []
    const todolists = [
        {id: todolistID1, title: 'What to learn', addedDate: '', order: 1},
        {id: todolistID2, title: 'What to buy', addedDate: '', order: 1}
    ]
    const endState = todolistsReducer(startState, SetTodolistsAC(todolists))

    expect(endState.length).toEqual(2)
    expect(endState[0].filter).toBe('all')
})