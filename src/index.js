import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
const initialState = {
  todos: [
    {
      id: 1,
      task: 'playing',
      order: 0
    },
    {
      id: 2,
      task: 'eating',
      order: 1
    }
  ]
}
const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      const updatedTodos = [
        ...state.todos, action.payload
      ]
      return {
        ...state,
        todos: updatedTodos
      }
    case 'EDIT_TODO':
      const todos = [...state.todos]
      const indexOfTodo = todos.findIndex(todo => todo.id === action.payload.id)
      todos[indexOfTodo] = {
        id: action.payload.id,
        task: action.payload.task,
        order: action.payload.order
      }
      return {
        ...state,
        todos
      }
    case 'MOVE_UP':
      const orders = [...state.todos]
      // todos = todos.sort((a, b) => orders.indexOf(a.order) - orders.indexOf(b.order));
      // console.log(todos);
      const indexOfMove1 = orders.findIndex(todo => todo.order === action.payload.order)
      const indexOfMove2 = orders.findIndex(todo => todo.order === action.payload.order - 1)
      orders[indexOfMove2] = {
        ...orders[indexOfMove2],
        order: action.payload.order
      }
      orders[indexOfMove1] = {
        ...orders[indexOfMove1],
        order: action.payload.order - 1
      }
      return {
        ...state,
        todos: orders.sort((a, b) => (a.order > b.order) ? 1 : -1)
      }
    case 'MOVE_DOWN':
      const downs = [...state.todos]
      const indexOfDown1 = downs.findIndex(todo => todo.order === action.payload.order)
      const indexOfDown2 = downs.findIndex(todo => todo.order === action.payload.order + 1)
      downs[indexOfDown2] = {
        ...downs[indexOfDown2],
        order: action.payload.order
      }
      downs[indexOfDown1] = {
        ...downs[indexOfDown1],
        order: action.payload.order + 1
      }
      //console.log(downs);
      return {
        ...state,
        todos: downs.sort((a, b) => (a.order > b.order) ? 1 : -1)
      }

    case 'DELETE_TODO':
      const updatedTodo = [...state.todos].filter(todo => todo.id !== action.payload.id)
      const upDated = updatedTodo.map((todo, index) => ({ ...todo, order: index }))
      console.log(upDated)

      return {
        ...state,
        todos: updatedTodo.map((todo, index) => ({ ...todo, order: index }))
      }
    default:
      return state
  }
}
const reducer =
{
  app: todosReducer
}
const store = configureStore({ reducer })
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
