import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from './App-reducer';

let startState: InitialStateType
beforeEach(()=>{
    startState={
        status: 'idle',
        error: null
    }
})

test('correct error message should be set', ()=>{
    let endState=appReducer(startState,setAppErrorAC('some error'))
    expect(endState.error).toBe('some error')
})
test('correct status should be set', ()=>{
    let endState=appReducer(startState,setAppStatusAC('failed'))
    expect(endState.status).toBe('failed')
})