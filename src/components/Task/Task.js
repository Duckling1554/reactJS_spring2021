import classnames from "classnames/bind"

import React from 'react';
import DoneButton from '../StatusButtons/DoneButton'
import NotDoneButton from '../StatusButtons/NotDoneButton'

import { ThemeContext } from "../MyTodoList/ThemeContext"

import styles from "./Task.module.scss"
const cx = classnames.bind(styles)

const Task = ({id, name,  description, completed, handleStatus}) => {
    const handleClick = () => {
      handleStatus(id)
    }

    let button;
    if (completed) {
      button = <DoneButton onClick={handleClick} />
    } else {
      button = <NotDoneButton onClick={handleClick}/>
    } 
  
    return (
      <ThemeContext.Consumer>
        {(theme) =>
      <div className={cx('task', `task-theme-${theme}`)}>
        <h3>{name}</h3>
        <div word-wrap='break-word'>{description}</div>
        <div>{completed}</div>
        {button}
      </div>}
      </ThemeContext.Consumer>
    )
  }
  
export default Task;