import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterType>('all')
    const addTask=(title: string)=>{
        let newTask= {id: v1(), title: title, isDone: false}
        setTasks([newTask,...tasks])
    }
    const deleteTask = (elId: string) => {
        setTasks(tasks.filter(e => e.id !== elId))
    }
    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }
    if (filter === 'active') {
        tasks = tasks.filter(e => !e.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(e => e.isDone)
    }

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks} deleteTask={deleteTask} changeFilter={changeFilter} addTask={addTask}/>

        </div>
    );
}

export default App;
