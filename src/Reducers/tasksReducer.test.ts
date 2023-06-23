import {v1} from 'uuid';
import {
    addTaskAC,
    addTaskACType,
    changeTaskStatusAC, changeTaskStatusACType,
    deleteTaskAC,
    deleteTaskACType,
    tasksReducer, updateTaskAC, updateTaskACType
} from './tasksReducer';
import {addTodolistAC, addTodolistACType, deleteTodolistAC} from './todolistReducer';
import {tasksObjectType} from '../AppWithRedux';

test('delete corresponding task', ()=>{
    const startState: tasksObjectType={
        'todolistID1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},
            {id: '3', title: 'ReactJS2', isDone: false},
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
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},
            {id: '3', title: 'ReactJS2', isDone: false},
        ]
    }
    const action:addTaskACType=addTaskAC('todolistID2','NewTask*')
    const endState: tasksObjectType=tasksReducer(startState, action)
    expect(endState['todolistID1'].length).toBe(3)
    expect(endState['todolistID2'].length).toBe(4)
    expect(endState['todolistID2'][0].title).toBe('NewTask*')
    expect(endState['todolistID2'][0].isDone).toBe(false)
    expect(endState['todolistID2'][0].id).toBeDefined()

})
test('change task status', ()=>{
    const startState: tasksObjectType={
        'todolistID1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},
            {id: '3', title: 'ReactJS2', isDone: false},
        ]
    }
    const action:changeTaskStatusACType=changeTaskStatusAC('todolistID2','2', false)
    const endState: tasksObjectType=tasksReducer(startState, action)

    expect(endState['todolistID1'][1].isDone).toBe(true)
    expect(endState['todolistID2'][1].isDone).toBe(false)


})

test('update task title', ()=>{
    const startState: tasksObjectType={
        'todolistID1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},
            {id: '3', title: 'ReactJS2', isDone: false},
        ]
    }
    const action:updateTaskACType=updateTaskAC('todolistID2','2', 'NewTitle***')
    const endState: tasksObjectType=tasksReducer(startState, action)

    expect(endState['todolistID1'][1].title).toBe('JS')
    expect(endState['todolistID2'][1].title).toBe('NewTitle***')
})

test('empty array should be added when a new todolist was added', ()=>{
    const startState: tasksObjectType={
        'todolistID1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},
            {id: '3', title: 'ReactJS2', isDone: false},
        ]
    }

    const action:addTodolistACType=addTodolistAC('NewTodolist**')
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
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},
            {id: '3', title: 'ReactJS2', isDone: false},
        ]
    }
    const action=deleteTodolistAC('todolistID2')
    const endState=tasksReducer(startState,action)
    const keys=Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistID2']).not.toBeDefined()
})

