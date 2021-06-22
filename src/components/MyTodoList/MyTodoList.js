import classnames from "classnames/bind"
import { BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom"

import { connect } from "react-redux";
import { handleThemeChange } from "../../actions/themeAction";
import { handleProjectsLoad } from "../../actions/toDoListAction";

import React, { useEffect } from 'react';
import Projects from '../MyTodoList/Projects'
import Tasks from '../MyTodoList/Tasks'

import styles from "./MyTodoList.module.scss"
const cx = classnames.bind(styles)

const mapStateToProps = (state) => ({
  projectsById: state.toDoList.projectsById,
  tasksById: state.toDoList.tasksById,
  theme: state.theme.theme,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchOnThemeChange: (theme) => dispatch(handleThemeChange(theme)),
  dispatchProjectsLoad: () => dispatch(handleProjectsLoad()),
});


const MyTodoList = ({
  projectsById,
  tasksById,
  theme,
  dispatchOnThemeChange,
  dispatchProjectsLoad
}) => {

  useEffect(() =>{
    dispatchProjectsLoad()}, [dispatchProjectsLoad])

  const handleThemeChange = (event) => {
    dispatchOnThemeChange(event.target.value);   
  }

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
        <header><h1>TO-DO</h1></header>
      </Link>
    )
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