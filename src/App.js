import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
function App() {
  const [todo, setTodo] = useState("")
  const todosSelector = state => state.app.todos//.sort((a, b) => (a.order > b.order) ? 1 : -1);
  const todos = useSelector(todosSelector);
  console.log({ todos });
  const addTodoAction = todo => {
    return {
      type: "ADD_TODO",
      payload: {
        id: Date.now(),
        task: todo,
        order: todos.length
      }
    }
  }

  const upAction = order => {
    return {
      type: "MOVE_UP",
      payload: {
        order
      }
    }
  }
  const downAction = order => {
    return {
      type: "MOVE_DOWN",
      payload: {
        order
      }
    }
  }

  function updateTodoAction(id, task, order) {
    return {
      type: "EDIT_TODO",
      payload: {
        id: id,
        task: task,
        order: todos.length - 1
      }
    }
  }
  const dispatch = useDispatch()
  function saveText() {
    if (todo.length < 1) { }
    dispatch(addTodoAction(todo))
    setTodo("")
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      saveText()
    }
  }
  const onDelete = (id) => {
    dispatch(
      {
        type: 'DELETE_TODO',
        payload: {
          id: id,
          order: todos.length - 1
        }
      }
    )
  }

  const onEdit = (id, task, order) => {
    dispatch(updateTodoAction(id, task, order))
  }
  const moveUp = (order) => {
    dispatch(upAction(order))
  }
  const moveDown = (order) => {
    dispatch(downAction(order))
  }
  return (
    <div className="App">
      <h1>Todo</h1>
      <div className="input"  >
        <input
          className="new-todo"
          type="text"
          value={todo}
          onChange={e => setTodo(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {todos.map(todo => (
          <li key={todo.id}>
            <Todo onEdit={onEdit} todo={todo}
              moveUp={moveUp} moveDown={moveDown} numberOfTodos={todos.length} onDelete={onDelete} />

          </li>
        ))
        }
      </div>
    </div>
  );
}
function Todo({ onEdit, todo, moveDown, moveUp, numberOfTodos, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(todo.task, numberOfTodos)
  if (editing === true) {
    return (
      <span>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyPress={event => {
            if (event.code !== "Enter") {
              return
            }
            onEdit(todo.id, text)
            setEditing(false)
          }}
        />
      </span>
    )
  }
  return (
    <span>
      {todo.task}
      &nbsp;&nbsp;
      <button type="button"
        className="btn btn-edit"
        onClick={() => setEditing(true)}
      >
        edit
      </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {todo.order !== 0 && (
        <button type="button" className="arrow"
          onClick={() => moveUp(todo.order)}>
          <i className="fa long-arrow-up"></i> up
        </button>
      )}
     &nbsp;&nbsp;&nbsp;&nbsp;
      {numberOfTodos !== todo.order + 1 && (
        <button type="button" className="arrow"
          onClick={() => moveDown(todo.order)}>
          <i className="fa long-arrow-up"></i>
       down
        </button>
      )}
      <button type="button" className="btn btn-delete" onClick={() => onDelete(todo.id)}>delete</button>
    </span>
  )
}
export default App;