import React from 'react';
type ButtonType ={
    name: string,
    callBack: ()=>void
    className?: string
}

export const Button = (props:ButtonType) => {
    const onClickHandler=()=>{props.callBack()}
    return (
        <button onClick={onClickHandler} className={props.className}>{props.name}</button>
    );
};

