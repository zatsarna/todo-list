export type requestStatusType='idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType={
    status: requestStatusType,
    error: string | null
}
type AppActionsType=setErrorACType | setStatusACType
const initialState: InitialStateType={
    status: 'idle',
    error: null
}

export const setErrorAC=(error: string | null)=>({type: 'APP/SET-ERROR', error} as const)
export type setErrorACType=ReturnType<typeof setErrorAC>
export const setStatusAC=(status: requestStatusType)=>({type: 'APP/SET-STATUS', status} as const)
export type setStatusACType=ReturnType<typeof setStatusAC>
export const appReducer=(state: InitialStateType =initialState, action: AppActionsType): InitialStateType=>{
    switch (action.type){
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }

}