import classnames from "classnames/bind"

import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { handleTasksLoad } from "../../actions/toDoListAction";

import { connect } from "react-redux";

import styles from "./Project.module.scss"
const cx = classnames.bind(styles)

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchTasksLoad: (projectId) => dispatch(handleTasksLoad(projectId)),
});

const Project = ({ project, theme, dispatchTasksLoad }) => {
  const { id, name, tasksCount } = project
  useEffect(() => 
  {if (tasksCount !== 0)                //загрузка тасок запускается только для проектов с тасками
    dispatchTasksLoad(id)}, 
  [dispatchTasksLoad, id, tasksCount])

  return (
    <Link to={`/projects/${id}/`} title="Тыкни, чтобы посмотреть все задачи" className={cx('project', `project-theme-${theme}`)}>
      <h3>{name}</h3>
      <h4>Задач: {tasksCount}</h4>
    </Link>
  )
}

const Project_export = connect(mapStateToProps, mapDispatchToProps)(Project);
export default Project_export;