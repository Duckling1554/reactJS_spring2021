import './App.css';
import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import { rootReducer } from '../../reducers/indexReducer';

import TodoList from '../MyTodoList/MyTodoList'

// const store = createStore(rootReducer)
const store = createStore(rootReducer, applyMiddleware(thunk))

function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  )
}

export default App;