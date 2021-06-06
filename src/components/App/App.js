import './App.css';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { rootReducer } from '../../reducers/indexReducer';

import TodoList from '../MyTodoList/MyTodoList'

const store = createStore(rootReducer)

function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  )
}

export default App;