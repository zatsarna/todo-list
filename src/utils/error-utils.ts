import {
    AppActionsType,
    setAppErrorAC,
    setAppStatusAC,
} from '../App/App-reducer';
import {ResponceType} from '../api/todolists-api';
import {Dispatch} from 'redux';


export const handleServerAppError= <D>(data: ResponceType<D>, dispatch: Dispatch<AppActionsType>)=> {
    if(data.messages.length){
        dispatch(setAppErrorAC(data.messages[0]))
    }else {
        dispatch(setAppErrorAC('some error'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError=<D>(dispatch: Dispatch<AppActionsType>, err: ResponceType<D>) =>{
    dispatch(setAppErrorAC(err.messages[0].length > 0 ? err.messages[0] : 'some error'))
    dispatch(setAppStatusAC('failed'))
}