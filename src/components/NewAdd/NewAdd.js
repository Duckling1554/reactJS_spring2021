import classnames from "classnames/bind"
import React from 'react';

import { ThemeContext } from "../MyTodoList/ThemeContext"

import styles from "./NewAdd.module.scss"
const cx = classnames.bind(styles)

const NewAdd = ({value, onChange, placeholder, name}) => {
    return (
        <ThemeContext.Consumer>
        {(theme) =>
        <textarea className={cx('textarea', `textarea-theme-${theme}`)} 
        value={value} onChange={onChange} placeholder={placeholder} name={name}/>}
        </ThemeContext.Consumer>
    )
  }

  export default NewAdd;