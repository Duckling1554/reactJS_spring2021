import classnames from "classnames/bind"

import React from 'react';
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import styles from "./Project.module.scss"
const cx = classnames.bind(styles)

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

const project = ({ project, theme }) => {
  // const { id, name, tasksIds } = project
  const { id, name, tasksCount } = project
  return (
    <Link to={`/projects/${id}/`} title="Тыкни, чтобы посмотреть все задачи" className={cx('project', `project-theme-${theme}`)}>
      <h3>{name}</h3>
      {/* <h4>Задач: {tasksIds.length}</h4> */}
      <h4>Задач: {tasksCount}</h4>
    </Link>
  )
}

const Project = connect(mapStateToProps)(project);
export default Project;