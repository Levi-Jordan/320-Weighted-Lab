import { useState, useReducer } from 'react'
import './App.css'

const initialState = [];

function reducer (state,action) {
  switch (action.type) {
    case "add": {
      return;
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
  return(

    <h1>To Do List</h1>
)}

export default App
