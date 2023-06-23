import {v1} from 'uuid';
import {
    addTodolistAC, changeFilterAC,
    deleteTodolistAC,
    todolistsReducer,
    updateTodolistTitleAC
} from './todolistReducer';
import {FilterType, todolistsType} from '../AppWithRedux';


test("correct todolist should be removed", ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: todolistsType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistID1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test("correct todolist should be added", ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let newTodolistTitle="New Todolist"
    const newTLID=v1()

    const startState: todolistsType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test("correct todolist should change its name", ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let newTodolistTitle="New Todolist"


    const startState: todolistsType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistsReducer(startState, updateTodolistTitleAC(todolistID2,newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test("correct todolist of todolist should be applied", ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let newFilter: FilterType="completed"

    const startState: todolistsType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistsReducer(startState, changeFilterAC(newFilter,todolistID2))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})