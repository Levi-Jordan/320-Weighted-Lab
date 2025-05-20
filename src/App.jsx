import { useState, useReducer } from 'react'
import './App.css'

const initialState = [];

function reducer (state,action) {
  switch (action.type) {
    case "add": {
      return [{
        id: Date.now(),
        text: action.payload,
        complete: false,
        editing: false,
      }, ...state];
    }
    case "edit": {
      return;
    }
    case "delete": {
    return;
    }
    case "save": {
      return;
    }
    default:
      return state;
    
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [newTodo, setNewTodo] = useState('');

  const handleAdd =  () => {
    if (newTodo.trim()) {
      dispatch({type: "add", payload: newTodo.trim()});
      setNewTodo('')
    }
  }
  return(
   <div>
      <h1>To Do List</h1>
      <input 
      type = "text"
      value = {newTodo}
      onChange = {(e) => setNewTodo(e.target.value)}
      onKeyPress={(e) =>e.key === 'Enter' && handleAdd()} 
      />
      <button onClick={handleAdd}>Add Item</button>
      {todos.map(todo => (
        <li key= {todo.id}>{todo.text}</li>
      ))}
    </div> 
)}

export default App
