import classnames from "classnames/bind"

import React from 'react';
import DoneButton from '../StatusButtons/DoneButton'
import NotDoneButton from '../StatusButtons/NotDoneButton'

import { connect } from "react-redux";
import { handleStatusChange } from "../../actions/toDoListAction";

import styles from "./Task.module.scss"
const cx = classnames.bind(styles)

const mapStateToProps = (state) => ({
  projectsById: state.toDoList.projectsById,
  tasksById: state.toDoList.tasksById,
  theme: state.theme.theme,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchStatusChange: (taskId) => dispatch(handleStatusChange(taskId))
});


const task = ({
  task,
  theme,
  dispatchStatusChange
}) => {
  const { id, name, description, completed } = task
  const handleStatusChange = () => {
    dispatchStatusChange(task)
  }

  let button;
  if (completed) {
    button = <DoneButton onClick={handleStatusChange} />
  } else {
    button = <NotDoneButton onClick={handleStatusChange} />
  }

  return (
    <div className={cx('task', `task-theme-${theme}`)}>
      <h3>{name}</h3>
      <div word-wrap='break-word'>{description}</div>
      <div>{completed}</div>
      {button}
    </div>
  )
}

const Task = connect(mapStateToProps, mapDispatchToProps)(task);
export default Task;