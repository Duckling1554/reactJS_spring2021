import classnames from "classnames/bind"
import { BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom"

import { connect } from "react-redux";
import { handleThemeChange } from "../../actions/themeAction";
import { handleProjectsLoad } from "../../actions/toDoListAction";
import { handleTasksLoad } from "../../actions/toDoListAction";


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
  dispatchOnThemeChange: (theme) => dispatch(handleThemeChange(theme)),
  dispatchProjectsLoad: (projects) => dispatch(handleProjectsLoad(projects)),
  dispatchTasksLoad: (projectId) => dispatch(handleTasksLoad(projectId)),
});


class MyTodoList extends React.Component {
  handleThemeChange = (event) => {
    this.props.dispatchOnThemeChange(event.target.value);   
  }
  
  componentDidMount() {
    this.props.dispatchProjectsLoad()
  }

  handleClick = () => {
    console.log('projects',this.props.projectsById)
    console.log('tasks',this.props.tasksById)
  }

  Radios = () => {
    return (
      <div className={cx("radios")}>
        <div>
          <input type="radio" name="theme" id="light" value="light"
            checked={this.props.theme === "light"} onChange={this.handleThemeChange}/>
          <label htmlFor="light">Я на стороне света</label>
        </div>

        <div>
          <input type="radio" name="theme" id="dark" value="dark"
            checked={this.props.theme === "dark"} onChange={this.handleThemeChange}/>
          <label htmlFor="dark">Я на стороне тьмы</label>
        </div>
      </div>)
  }
  Header = () => {
    return (
      <Link to={`/projects`} title="Тыкни, чтобы вернуться к списку проектов"
        className={cx('header', 'header-main', `header-theme-${this.props.theme}`)}>
        <header><h1>TO-DO</h1></header>
        <button onClick={this.handleClick}>WOW</button>
      </Link>
    )
  }

  Tasks = ({ match }) => {
    let { projectId } = match.params
    console.log('these projects', this.props.projectsById)
    const projectId_index = this.props.projectsById.findIndex(project => project.id == projectId )
    if (!Object.keys(this.props.projectsById).includes(String(projectId_index))) //проверяем, чтобы в url не было всяких глупостей
    {
      return <Redirect to="/projects" />
    }
    // const project = this.props.projectsById[projectId_index]
    // this.props.dispatchTasksLoad(project.id)
    console.log('these tasks', this.props.tasksById)
    // this.props.projectsById.map(project => this.props.dispatchTasksLoad(project.id))
    // this.props.dispatchTasksLoad(projectId)
    // const tasks = this.props.tasksById.filter(task => task.projectId==projectId)
    const tasks = []
    console.log('draw these tasks',tasks)
    return (
      <div>
        <header className={cx('header', `header-theme-${this.props.theme}`)}>
          <h2>Мои задачи по: {this.props.projectsById[projectId_index].name}</h2>
        </header>

        <div className={cx('addTask', `addTask-theme-${this.props.theme}`)}>
          <div>
            <h2>Новые дела? Добавим в список!</h2>
            <NewAdd type='task' projectId={projectId} />
          </div>
        </div>

        {/* <div className={cx('tasks')}>{tasksIds.map(taskId => <Task task={this.props.tasksById[taskId]}/>)} */}

        <div className={cx('tasks')}>{tasks.map(task => <Task task={task}/>)}</div>
      </div>)
  }

  Projects = () => {
    return (
      <div>
        <header className={cx('header', `header-theme-${this.props.theme}`)}><h2>Мои проекты</h2></header>

        <div className={cx('addTask', `addTask-theme-${this.props.theme}`)}>
          <h2>Новые проекты? Добавим в список!</h2>
          <NewAdd type='project' projectId={0} />
        </div>

        <div className={cx('projects')}>{Object.keys(this.props.projectsById).map(projectId =>
          <Project project={this.props.projectsById[projectId]} />)}
        </div>

      </div>)
  }

  render () {
  return (
    <BrowserRouter>
      <div className={cx('container', `container-theme-${this.props.theme}`)}>
        <Route path="/projects" component={this.Radios} />
        <Route path="/projects" component={this.Header} />

        <Switch>
          <Route exact path="/projects" component={this.Projects} />
            <Route path="/projects/:projectId" component={this.Tasks} />
          <Redirect to="/projects" />
        </Switch>

      </div>
    </BrowserRouter>
  )}

}
const TodoList = connect(mapStateToProps, mapDispatchToProps)(MyTodoList)
export default TodoList;