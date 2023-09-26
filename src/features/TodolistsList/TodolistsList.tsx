import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Todolist} from './Todolist/Todolist';
import {useTodolist} from '../../App/hooks/UseTodolists';
import {ButtonAndInput} from '../../components/ButtonAndInput/ButtonAndInput';


const TodolistsList = () => {
    const {todolists, changeFilter, deleteTodolist, updateTodolistTitle, addTodoList} = useTodolist()
    return (<>
            <Grid container style={{marginTop: '30px'}}>
                <ButtonAndInput callback={addTodoList}/>
            </Grid>
            <Grid container spacing={3} style={{marginTop: '30px'}}>
                <>
                    {todolists.map(el => {
                        return (
                            <Grid item key={el.id}>
                                <Paper elevation={3} style={{padding: '15px'}}>
                                    <Todolist title={el.title}
                                              changeFilter={changeFilter}
                                              filter={el.filter}
                                              todolistId={el.id}
                                              deleteTodolist={deleteTodolist}
                                              updateTodolistTitle={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>

                        )
                    })}
                </>
            </Grid>
        </>

    );
};

export default TodolistsList;