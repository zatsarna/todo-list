import {
    addTaskAC,
    addTaskACType,
    changeTaskAC,
    changeTaskACType,
    deleteTaskAC,
    deleteTaskACType,
    setTasksAC,
    tasksReducer
} from './tasksReducer';
import {
    addTodolistAC,
    addTodolistACType,
    deleteTodolistAC,
    SetTodolistsAC,
    TodolistDomainType
} from './todolistReducer';
import {tasksObjectType} from '../App/AppWithRedux';
import {TaskPriorities, TaskStatuses} from '../api/tasks-api';
import {v1} from 'uuid';

test('delete corresponding task', ()=>{
    const startState: tasksObjectType={
        'todolistID1': [
            {id: '1', title: 'HTML&CSS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
            {id: '2', title: 'JS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
            {id: '3', title: 'ReactJS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
        ],
        'todolistID2': [
            {id: '1', title: 'HTML&CSS2', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'},
            {id: '2', title: 'JS2', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'},
            {id: '3', title: 'ReactJS2', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'},
        ]
    }
    const action: deleteTaskACType=deleteTaskAC('2','todolistID2')
    const endState:tasksObjectType=tasksReducer(startState, action)
    expect(endState['todolistID1'].length).toBe(3)
    expect(endState['todolistID2'].length).toBe(2)
    expect(endState['todolistID2'].every(t =>t.id!=='2')).toBeTruthy()
})
test('new task added to correct todolist', ()=>{
    const startState: tasksObjectType={
        'todolistID1': [
            {id: '1', title: 'HTML&CSS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
            {id: '2', title: 'JS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'}
        ],
        'todolistID2': [
            {id: '1', title: 'HTML&CSS2', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'}
        ]
    }
    const newTask={id: '4', title: 'XXX', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'}
    const action:addTaskACType=addTaskAC(newTask)
    const endState: tasksObjectType=tasksReducer(startState, action)
    expect(endState['todolistID1'].length).toBe(2)
    expect(endState['todolistID2'].length).toBe(2)
    expect(endState['todolistID2'][0].title).toBe('XXX')
    expect(endState['todolistID2'][0].status).toBe(TaskStatuses.New)
    expect(endState['todolistID2'][0].id).toBeDefined()

})
test('change task status', ()=>{
    const startState: tasksObjectType={
        'todolistID1': [
            {id: '1', title: 'HTML&CSS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
            {id: '2', title: 'JS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
            {id: '3', title: 'ReactJS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
        ],
        'todolistID2': [
            {id: '1', title: 'HTML&CSS2', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'},
            {id: '2', title: 'JS2', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'},
            {id: '3', title: 'ReactJS2', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'},
        ]
    }
    const action:changeTaskACType=changeTaskAC('todolistID2','2', {status: TaskStatuses.New, deadline: '', priority: TaskPriorities.Low, startDate: '', title: 'JS2', description: ''})
    const endState: tasksObjectType=tasksReducer(startState, action)

    expect(endState['todolistID1'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistID2'][1].status).toBe(TaskStatuses.New)


})

test('update task title', ()=>{
    const startState: tasksObjectType={
        'todolistID1': [
            {id: '1', title: 'HTML&CSS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
            {id: '2', title: 'JS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
            {id: '3', title: 'ReactJS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
        ],
        'todolistID2': [
            {id: '1', title: 'HTML&CSS2', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'},
            {id: '2', title: 'JS2', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'},
            {id: '3', title: 'ReactJS2', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'},
        ]
    }
    const action:changeTaskACType=changeTaskAC('todolistID2','2', {status: TaskStatuses.New, deadline: '', priority: TaskPriorities.Low, startDate: '', title: 'NewTitle***', description: ''})
    const endState: tasksObjectType=tasksReducer(startState, action)

    expect(endState['todolistID1'][1].title).toBe('JS')
    expect(endState['todolistID2'][1].title).toBe('NewTitle***')
})

test('empty array should be added when a new todolist was added', ()=>{
    const startState: tasksObjectType={
        'todolistID1': [
            {id: '1', title: 'HTML&CSS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
            {id: '2', title: 'JS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
            {id: '3', title: 'ReactJS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
        ],
        'todolistID2': [
            {id: '1', title: 'HTML&CSS2', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'},
            {id: '2', title: 'JS2', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'},
            {id: '3', title: 'ReactJS2', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'},
        ]
    }
    let todolistID3 = v1()
    const newTL: TodolistDomainType = {id: todolistID3, title: 'What to learn2', filter: 'all', addedDate: '', order: 1}
    const action:addTodolistACType=addTodolistAC(newTL)
    const endState: tasksObjectType=tasksReducer(startState, action)

    const keys: string[]=Object.keys(endState)
    const newKey=keys.find(k =>k!=='todolistID1' && k!=='todolistID2')
    if (!newKey){
        throw Error('new todolistID should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('tasks that belong to removed todolist should be deleted', ()=>{
    const startState: tasksObjectType={
        'todolistID1': [
            {id: '1', title: 'HTML&CSS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
            {id: '2', title: 'JS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
            {id: '3', title: 'ReactJS', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID1'},
        ],
        'todolistID2': [
            {id: '1', title: 'HTML&CSS2', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'},
            {id: '2', title: 'JS2', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'},
            {id: '3', title: 'ReactJS2', status: TaskStatuses.New, completed: false, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', order: 1, addedDate: '', todoListId: 'todolistID2'},
        ]
    }
    const action=deleteTodolistAC('todolistID2')
    const endState=tasksReducer(startState,action)
    const keys=Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistID2']).not.toBeDefined()
})

test('empty arrays should be added when we set todolists', ()=>{

    const todolists = [
        {id: '1', title: 'What to learn', addedDate: '', order: 1},
        {id: '2', title: 'What to buy', addedDate: '', order: 1}
    ]
    const action=SetTodolistsAC(todolists)
    const endState=tasksReducer({},action)
    const keys=Object.keys(endState)
    expect(keys.length).toBe(2)
    expect(endState['2']).toStrictEqual([])
    expect(endState['1']).toStrictEqual([])
})
test('tasks should be added for todolist', ()=>{

    const tasks=[
        {description: 'blabla', title: 'new task', completed: false, status: 0, priority: 0, startDate: '', deadline: '', id: '1_1', todoListId: '1', order: 1, addedDate: ''},
        {description: 'blaggbla', title: 'new task2', completed: false, status: 0, priority: 0, startDate: '', deadline: '', id: '1_2', todoListId: '1', order: 1, addedDate: ''}
    ]

    const action=setTasksAC('1', tasks)
    const endState=tasksReducer({'1': [], '2': []},action)

    expect(endState['1'].length).toBe(2)
    expect(endState['2'].length).toBe(0)

})
