export type requestStatusType='idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType={
    status: requestStatusType,
    error: string | null
}
export type AppActionsType=setAppErrorACType | setAppStatusACType
const initialState: InitialStateType={
    status: 'idle',
    error: null
}

export const setAppErrorAC=(error: string | null)=>({type: 'APP/SET-ERROR', error} as const)
export type setAppErrorACType =ReturnType<typeof setAppErrorAC>
export const setAppStatusAC=(status: requestStatusType)=>({type: 'APP/SET-STATUS', status} as const)
export type setAppStatusACType =ReturnType<typeof setAppStatusAC>
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