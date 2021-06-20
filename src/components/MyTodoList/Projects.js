import classnames from "classnames/bind"
import React from 'react';
import { connect } from "react-redux";

import styles from "./MyTodoList.module.scss"

import Project from '../Project/Project'
import NewAdd from '../NewAdd/NewAdd'

const cx = classnames.bind(styles)
const mapStateToProps = (state) => ({
    projectsById: state.toDoList.projectsById,
    theme: state.theme.theme,
});

const Projects = ({
    projectsById,
    theme
}) => {
    return (
        <div>
            <header className={cx('header', `header-theme-${theme}`)}><h2>Мои проекты</h2></header>

            <div className={cx('addTask', `addTask-theme-${theme}`)}>
                <h2>Новые проекты? Добавим в список!</h2>
                <NewAdd type='project' projectId={0} />
            </div>

            <div className={cx('projects')}>{Object.keys(projectsById).map(projectId =>
                <Project project={projectsById[projectId]} />)}
            </div>
        </div>)
}

const projects = connect(mapStateToProps)(Projects)
export default projects;