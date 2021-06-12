import React, { useEffect, useState } from 'react'
import './App.css';
import Input from './Components/Input'
import { Button } from 'react-bootstrap'
import TaskItem from "./Components/TaskItem"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { listTodo, addTolist } from './API/Todo'

function App() {
  const [todo, setTodo] = useState([])
  const [title, setTitle] = useState("")

  const fetchTodo = () =>{
    listTodo(
      (data)=>{ setTodo(data) },
      (error)=>{ window.alert(error.message) }
    )
  }

  const addTodo = (e) =>{
    e.preventDefault();
    addTolist(title, 
      ()=>{ 
        fetchTodo() 
        setTitle("")
      },
      (error)=>{window.alert(error.message)}
    )
  }

  useEffect(()=>{
   fetchTodo()
  },[])

  return (
    <div id="todo-app">
      <div className="app-container">
        <div style={{padding: 23}}>
          <div className="title">Todo</div>
          <form className="add-input"
          onSubmit={addTodo}>
            <Input
            placeholder="What's task to reminder?"
            style={{marginRight: 10}}
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
            />
            <Button 
            type="submit"
            variant="success">
              <FontAwesomeIcon icon={faPlus}/>
            </Button>
          </form>
          <div className="task-container">
            { todo.map((item, key)=>
            <TaskItem 
            key={key}
            id={item.id}
            title={item.title}
            onCallback={()=>fetchTodo()}/>
            )}
          </div>
        </div>
        <div className="footer-app">
          Kantee Charoensedtasin
        </div>
      </div>
    </div>
  );
}

export default App;
