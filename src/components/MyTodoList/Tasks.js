import { Redirect } from "react-router-dom"
import classnames from "classnames/bind"
import React from 'react';
import { connect } from "react-redux";

import styles from "./MyTodoList.module.scss"

import NewAdd from '../NewAdd/NewAdd'
import Task from '../Task/Task'

const cx = classnames.bind(styles)
const mapStateToProps = (state) => ({
    tasksById: state.toDoList.tasksById,
    projectsById: state.toDoList.projectsById,
    theme: state.theme.theme,
});

const Tasks = ({
    match,
    tasksById,
    projectsById,
    theme
}) => {
    let { projectId } = match.params
    const projectId_index = projectsById.findIndex(project => project.id == projectId)
    if (!Object.keys(projectsById).includes(String(projectId_index))) //проверяем, чтобы в url не было всяких глупостей
    {
        return <Redirect to="/projects" />
    }
    const tasks = tasksById.filter(task => task.projectId == projectId)
    return (
        <div>
            <header className={cx('header', `header-theme-${theme}`)}>
                <h2>Мои задачи по: {projectsById[projectId_index].name}</h2>
            </header>

            <div className={cx('addTask', `addTask-theme-${theme}`)}>
                <div>
                    <h2>Новые дела? Добавим в список!</h2>
                    <NewAdd type='task' projectId={projectId} />
                </div>
            </div>
            <div className={cx('tasks')}>{tasks.map(task => <Task task={task} />)}
            </div>
        </div>)
}

const tasks = connect(mapStateToProps)(Tasks)
export default tasks;