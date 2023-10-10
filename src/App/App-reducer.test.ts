import {appReducer, InitialStateType, setErrorAC, setStatusAC} from './App-reducer';

let startState: InitialStateType
beforeEach(()=>{
    startState={
        status: 'idle',
        error: null
    }
})

test('correct error message should be set', ()=>{
    let endState=appReducer(startState,setErrorAC('some error'))
    expect(endState.error).toBe('some error')
})
test('correct status should be set', ()=>{
    let endState=appReducer(startState,setStatusAC('failed'))
    expect(endState.status).toBe('failed')
})