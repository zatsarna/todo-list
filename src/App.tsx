import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {ButtonAndInput} from './components/ButtonAndInput';

export type FilterType = 'all' | 'active' | 'completed'
type todolistsType = { id: string, title: string, filter: FilterType }
type tasksObjectType = {
    [key: string]: Array<TaskType>,
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, setTasks] = useState<tasksObjectType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
        ]
    })
    /*let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false}
    ])*/
    const changeStatus = (todolistID: string, taskID: string, isChecked: boolean) => {
         /*let task=tasks.find(el => el.id===taskID)
         if (task){
             task.isDone=isChecked
         }
         setTasks([...tasks])*/
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el =>el.id===taskID ? {...el, isDone: isChecked}:el)})
        /*setTasks(tasks.map(el => el.id===taskID ? {...el, isDone: isChecked} :el))*/
    }
    //const [filter, setFilter] = useState<FilterType>('all')
    const addTask = (todolistID:string,title: string) => {
         let newTask= {id: v1(), title: title, isDone: false}
             setTasks({...tasks, [todolistID]: [newTask,...tasks[todolistID]]})
    }
    const deleteTask = (taskId: string, todolistID: string) => {
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID].filter(e => e.id !== taskId)
            })

    }
    const changeFilter = (value: FilterType, ID: string) => {
        //setFilter(value)
        setTodolists(todolists.map(el => {
            return (
                el.id === ID ? {...el, filter: value} : el
            )
        }))
    }
const deleteTodolist=(todolistID: string)=>{
    setTodolists(todolists.filter(el => el.id!==todolistID))
     delete tasks[todolistID]
}
const addTodoList =(todoListTitle: string)=>{
        const newTLID=v1()
    const newTL: todolistsType={id: newTLID, title: todoListTitle, filter: 'all'}
    setTodolists([...todolists, newTL])
    setTasks({...tasks, [newTLID]: []})
}
const updateTasks=(todolistID: string, taskID: string, updatedTitle: string)=>{
    setTasks({...tasks, [todolistID]: tasks[todolistID].map(t =>t.id===taskID ? {...t, title: updatedTitle}:t)})
}

    function updateTodolistTitle(todolistID:string, updatedTitle:string) {
        setTodolists(todolists.map(tl => tl.id===todolistID ? {...tl, title: updatedTitle}:tl))
    }

    return (
        <div className="App">
            <ButtonAndInput  callback={addTodoList}/>
            {todolists.map(el => {
                let tasksForTodoList = tasks[el.id]
                if (el.filter === 'active') {
                    tasksForTodoList = tasks[el.id].filter(e => !e.isDone)
                }
                if (el.filter === 'completed') {
                    tasksForTodoList = tasks[el.id].filter(e => e.isDone)
                }
                return (
                    <Todolist title={el.title} tasks={tasksForTodoList} deleteTask={deleteTask}
                              changeFilter={changeFilter} addTask={addTask}
                              changeStatus={changeStatus}
                              filter={el.filter}
                              key={el.id}
                              todolistId={el.id}
                              deleteTodolist={deleteTodolist}
                              updateTasks={updateTasks}
                              updateTodolistTitle={updateTodolistTitle}
                    />
                )
            })}


        </div>
    );
}

export default App;
