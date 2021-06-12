import axios from 'axios'
import { baseUrl } from './Config'

function listTodo(callback, errorCallback){
    let url = baseUrl + "/todolist"

    axios.get(url)
    .then((response)=>{
        let data = response.data
        callback(data)
    })
    .catch((error)=>{
        errorCallback(error)
    })
}

function addTolist(title, callback, errorCallback){
    let url = baseUrl + "/todolist"

    var body ={
        title: title
    }

    axios.post(url, body)
    .then((response)=>{
        let data = response.data
        callback(data)
    })
    .catch((error)=>{
        errorCallback(error)
    })
}

function editTodoList(id, newTitle, callback, errorCallback){
    let url = baseUrl + "/todolist/" + id

    var body ={
        title: newTitle
    }

    axios.put(url, body)
    .then((response)=>{
        let data = response.data
        callback(data)
    })
    .catch((error)=>{
        errorCallback(error)
    })
}

function deleteFromlist(id, callback, errorCallback){
    let url = baseUrl + "/todolist/" + id

    axios.delete(url)
    .then((response)=>{
        let data = response.data
        callback(data)
    })
    .catch((error)=>{
        errorCallback(error)
    })
}


export { listTodo, addTolist, deleteFromlist, editTodoList }
