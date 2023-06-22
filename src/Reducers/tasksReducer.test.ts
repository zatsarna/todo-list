import {v1} from 'uuid';
import {tasksObjectType} from '../App';
import {
    addTaskAC,
    addTaskACType,
    changeTaskStatusAC, changeTaskStatusACType,
    deleteTaskAC,
    deleteTaskACType,
    tasksReducer, updateTaskAC, updateTaskACType
} from './tasksReducer';

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

