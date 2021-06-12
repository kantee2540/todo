import React, { useState } from 'react'
import "./TaskItem.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { deleteFromlist, editTodoList } from '../API/Todo'
import Input from './Input'

function TaskItem(props) {
    const id = props.id
    const prevTitle = props.title
    const [isEditing, setEditing] = useState(false)
    const [title, setTitle] = useState(props.title)

    const deleteTodo = () =>{
        if(window.confirm("Are you sure to delete?")){
            deleteFromlist(id,
                ()=>{ props.onCallback() },
                (error)=>{ window.alert(error.message) })
        }
    }

    const confirmEdit = () =>{
        editTodoList(id, title,
            ()=>{ 
                setEditing(false) 
                props.onCallback()
            },
            (error)=> { window.alert(error.message) })
    }

    return (
        <>
        <div className="task-item">
            <div style={{flex: 1}}>
                { isEditing ?
                <div>
                    <Input 
                    style={{fontSize: 14, flex: 1, padding: 5}}
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    />
                </div> :
                <div>
                    {props.title}
                </div>
                }
            </div>
            <div className="task-action">
                { isEditing ?
                <div className="action-edit">
                    <div 
                    className="action-button commit-action" 
                    onClick={()=>confirmEdit()}
                    style={{marginRight: 10}}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <div 
                    className="action-button delete-action" 
                    onClick={()=>{
                        setTitle(prevTitle)
                        setEditing(false)
                    }}
                    style={{marginRight: 10}}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div> :
                <div 
                className="action-button edit-action" 
                onClick={()=>setEditing(true)}
                style={{marginRight: 10}}>
                    <FontAwesomeIcon icon={faPen}/>
                </div>
                }
                <div
                className="action-button delete-action"
                onClick={()=>deleteTodo()}>
                    <FontAwesomeIcon icon={faTrash}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default TaskItem
