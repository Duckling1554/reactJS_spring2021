import classnames from "classnames/bind"
import { BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom"

import { connect } from "react-redux";
import { handleThemeChange } from "../../actions/themeAction";

import React from 'react';
import Task from '../Task/Task'
import Project from '../Project/Project'
import NewAdd from '../NewAdd/NewAdd'

import styles from "./MyTodoList.module.scss"
const cx = classnames.bind(styles)

const mapStateToProps = (state) => ({
  projectsById: state.toDoList.projectsById,
  tasksById: state.toDoList.tasksById,
  theme: state.theme.theme,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchOnThemeChange: (theme) => dispatch(handleThemeChange(theme))
});


const MyTodoList = ({
  projectsById,
  tasksById,
  theme,
  dispatchOnThemeChange,
}) => {
  const handleThemeChange = (e) => {
    dispatchOnThemeChange(e.target.value);
  };

  const Radios = () => {
    return (
      <div className={cx("radios")}>
        <div>
          <input type="radio" name="theme" id="light" value="light"
            checked={theme === "light"} onChange={handleThemeChange}/>
          <label htmlFor="light">Я на стороне света</label>
        </div>

        <div>
          <input type="radio" name="theme" id="dark" value="dark"
            checked={theme === "dark"} onChange={handleThemeChange}/>
          <label htmlFor="dark">Я на стороне тьмы</label>
        </div>
      </div>)
  }

  const Header = () => {
    return (
      <Link to={`/projects`} title="Тыкни, чтобы вернуться к списку проектов"
        className={cx('header', 'header-main', `header-theme-${theme}`)}>
        <header><h1>TO-DO</h1></header></Link>
    )
  }

  const Tasks = ({ match }) => {
    let { projectId } = match.params
    if (!Object.keys(projectsById).includes(projectId)) //проверяем, чтобы в url не было всяких глупостей
    {
      return <Redirect to="/projects" />
    }
    const project = projectsById[projectId]
    const { tasksIds } = project
    return (
      <div>
        <header className={cx('header', `header-theme-${theme}`)}>
          <h2>Мои задачи по: {projectsById[projectId].name}</h2>
        </header>

        <div className={cx('addTask', `addTask-theme-${theme}`)}>
          <div>
            <h2>Новые дела? Добавим в список!</h2>
            <NewAdd type='task' projectId={projectId} />
          </div>
        </div>

        <div className={cx('tasks')}>{tasksIds.map(taskId => <Task task={tasksById[taskId]}/>)}
        </div>
      </div>)
  }

  const Projects = () => {
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
  return (
    <BrowserRouter>
      <div className={cx('container', `container-theme-${theme}`)}>
        <Route path="/projects" component={Radios} />
        <Route path="/projects" component={Header} />

        <Switch>
          <Route exact path="/projects" component={Projects} />
          <Route path="/projects/:projectId" component={Tasks} />
          <Redirect to="/projects" />
        </Switch>

      </div>
    </BrowserRouter>
  )

}
const TodoList = connect(mapStateToProps, mapDispatchToProps)(MyTodoList)
export default TodoList;