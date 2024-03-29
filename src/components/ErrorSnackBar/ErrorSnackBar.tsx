import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../App/store';
import {InitialStateType, setAppErrorAC} from '../../App/App-reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const error =useSelector<AppRootStateType, string | null>(state=>state.app.error)
    const dispatch=useDispatch()
    const isOpen=error!==null
    //const [open, setOpen] = React.useState(true);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
    };

    return (

            <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

    );
}
