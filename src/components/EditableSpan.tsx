import React, {ChangeEvent, useState} from 'react';
 type SpanPropsType={
     oldTitle: string
     calback: (updatedTitle: string)=>void
 }
export const EditableSpan =React.memo((props: SpanPropsType) => {
     const [edit, setEdit]=useState(false)
    let [updatedTitle, setUpdatedTitle] = useState(props.oldTitle)
    function editHandler() {
        setEdit(!edit)
        if (edit){
            addTask()
        }
    }
    const onChangeHandler=(event: ChangeEvent<HTMLInputElement>)=>{
         setUpdatedTitle(event.currentTarget.value)
    }
    const addTask = ()=>{
        props.calback(updatedTitle)
    }

    return (
        edit ?
            <input value={updatedTitle} onBlur={editHandler} autoFocus onChange={onChangeHandler}/>
            :
        <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
})

