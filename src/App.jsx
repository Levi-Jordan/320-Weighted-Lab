import { useState, useReducer } from 'react'
import './App.css'

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      return [{
        id: Date.now(),
        text: action.payload,
        complete: false,
        editing: false,
      }, ...state];
    }
    case "check": {
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, complete: !todo.complete } : todo
      );
    }
    case "edit": {
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, editing: true } : todo
      );
    }
    case "delete": {
      return state.filter(todo => todo.id !== action.payload);
    }
    case "save": {
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text, editing: false } : todo
      );
    }
    default:
      return state;

  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEdit] = useState({})

  const handleAdd = () => {
    if (newTodo.trim()) {
      dispatch({ type: "add", payload: newTodo.trim() });
      setNewTodo('')
    }
  }
  const handleEdit = (id, value) => {
    setEdit({ ...editTodo, [id]: value });
  }

  return (
    <div>
      <h1>To Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
      />
      <button onClick={handleAdd}>Add Item</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => dispatch({ type: "check", payload: todo.id })}
            />
            {todo.editing ? (
              <>
                <input
                  type="text"
                  value={editTodo[todo.id] ?? todo.text}
                  onChange={(e) => handleEdit(todo.id, e.target.value)}
                />
                <button onClick={() => dispatch({ type: "save", payload: { id: todo.id, text: editTodo[todo.id] } })}>
                  Save
                </button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => dispatch({ type: "edit", payload: todo.id })}>
                  Edit
                </button>
                <button onClick={() => dispatch({ type: "delete", payload: todo.id })}
                  disabled={!todo.complete}>
                  Delete
                </button>

              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
};


export default App
