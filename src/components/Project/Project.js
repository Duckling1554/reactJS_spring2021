import classnames from "classnames/bind"

import React from 'react';
import { Redirect, Link } from "react-router-dom";

import { ThemeContext } from "../MyTodoList/ThemeContext"

import styles from "./Project.module.scss"
const cx = classnames.bind(styles)

const Project = ({project}) => {
    const {id, name, tasksIds} = project
    return (
      <ThemeContext.Consumer>
        {(theme) =>
        <Link to={`/projects/${id}/`} title="Тыкни, чтобы посмотреть все задачи" className={cx('project', `project-theme-${theme}`)}>
          <h3>{name}</h3>
          <h4>Задач: {tasksIds.length}</h4>
        </Link>}
      </ThemeContext.Consumer>
    )
  }
  
export default Project;