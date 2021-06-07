import classnames from "classnames/bind"
import React from 'react';

import { ThemeContext } from "../MyTodoList/ThemeContext"

import styles from "./TaskAdd.module.scss"
const cx = classnames.bind(styles)

const TaskAdd = ({value, onChange, placeholder, name}) => {
    return (
        <ThemeContext.Consumer>
        {(theme) =>
        <textarea className={cx('textarea', `textarea-theme-${theme}`)} 
        value={value} onChange={onChange} placeholder={placeholder} name={name}/>}
        </ThemeContext.Consumer>
    )
  }

  export default TaskAdd;