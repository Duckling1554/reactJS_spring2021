import classnames from "classnames/bind"
import { BrowserRouter, Switch, Route, Link, Redirect, withRouter} from "react-router-dom"

import React from 'react';
import Task from '../Task/Task'
import Project from '../Project/Project'
import NewAdd from '../NewAdd/NewAdd'

import { DEFAULT_THEME, ThemeContext } from "./ThemeContext"
import NormalizeState from "./NormalizeState"
import projects from "./projects"

import styles from "./MyTodoList.module.scss"
const cx = classnames.bind(styles)

class MyTodoList extends React.Component {
    normalizedProjects = NormalizeState(projects)
    handleThemeChange = event => {
      this.setState({ theme: event.target.value })
    }
    state = {
      projectsById: {...this.normalizedProjects.projectsById},
      tasksById : {...this.normalizedProjects.tasksById},
      newTask: {
        name: '',
        description: '',
        projectId: 0,
      },

      newProject: {
        name: '',
      },

      theme: DEFAULT_THEME,
    }

    handleTaskChange = (event) => {
        const {value, name} = event.currentTarget
        this.setState({
        newTask: {
            ...this.state.newTask,
            [name]: value
        }
        });
    }

    handleProjectChange = (event) => {
      const {value, name} = event.currentTarget
      this.setState({
      newProject: {
          ...this.state.newProject,
          [name]: value
      }
      });
  }

    handleAddTaskClick = () => {
        const task = this.state.newTask
        task['id'] = Object.keys(this.state.tasksById).length + 1
        task['completed'] = false
        const projectId = task['projectId']

        this.setState((currentState) => {
        if (currentState.newTask.name !== '') { 
            const newArr = [...currentState.projectsById[projectId]['tasksIds'], task['id']]
            const newProj = {...currentState.projectsById[projectId], ['tasksIds']:newArr}
            return {
            projectsById: {...currentState.projectsById, [projectId]:newProj},
            tasksById: {...currentState.tasksById, [task['id']]:task},
            newTask: {
                name: '',
                description: '',
                projectId: 0,
            }
            }
        }
        })
    }

    handleAddProjectClick = () => {
      const project = this.state.newProject
      project['id'] = Object.keys(this.state.projectsById).length + 1
      project['tasksIds'] = []
      
      this.setState((currentState) => {
      if (currentState.newProject.name !== '') {  
          return {
          projectsById: {...currentState.projectsById, [project['id']]:project},
          newProject: {
              name: '',
          }
          }
      }
      })
  }

    handleStatusChange = (taskId) => {
      const oldTask = this.state.tasksById[taskId]
      const newStatus = !(oldTask['completed'])
      const newTask = {...oldTask, completed: newStatus}

      this.setState((currentState) => {
        return {
          tasksById: {...currentState.tasksById, [taskId]: newTask}
        }
      })
    }

    Radios = () => {
      return (
      <div className={cx("radios")}>
            <div>
              <input type="radio" name="theme" id="light" value="light"
                checked={this.state.theme === "light"} onChange={this.handleThemeChange}
              />
              <label htmlFor="light">Я на стороне света</label>
            </div>

            <div>
              <input type="radio" name="theme" id="dark" value="dark"
                checked={this.state.theme === "dark"} onChange={this.handleThemeChange}
              />
              <label htmlFor="dark">Я на стороне тьмы</label>
            </div>
          </div>)   
    }

    Header = () => {
      return (
        <Link to={`/projects`} title="Тыкни, чтобы вернуться к списку проектов" 
        className={cx('header', 'header-main', `header-theme-${this.state.theme}`)}>
        <header><h1>TO-DO</h1></header></Link>
      )
    }
    
    Tasks = ({match}) => {
      let { projectId } = match.params
      this.state.newTask['projectId'] = projectId
      if (!Object.keys(this.state.projectsById).includes(projectId)) //проверяем, чтобы в url не было всяких глупостей
        {
        return <Redirect to="/projects"/>
      }
      const project = this.state.projectsById[projectId]
      const {tasksIds} = project


      return (
      <ThemeContext.Provider value={this.state.theme}>
      <header className={cx('header', `header-theme-${this.state.theme}`)}>
          <h2>Мои задачи по: {this.state.projectsById[projectId].name}</h2>
      </header>
      <div className={cx('addTask', `addTask-theme-${this.state.theme}`)}>
        <div>
          <h2>Новые дела? Добавим в список!</h2>
          <NewAdd value={this.state.newTask.name} onChange={this.handleTaskChange}
          placeholder='Название' name='name'/>

          <NewAdd value={this.state.newTask.description} onChange={this.handleTaskChange}
          placeholder='Описание' name='description'/>
        </div>
        <button className={cx('buttonAdd', `buttonAdd-theme-${this.state.theme}`)} 
        onClick={this.handleAddTaskClick}>Добавим</button>
      </div>
      <div className={cx('tasks')}>{tasksIds.map(taskId => <Task task={this.state.tasksById[taskId]}
      handleStatus={this.handleStatusChange} />)}
      </div>
      </ThemeContext.Provider>)
    }

    Projects = () => {
      return (
      <ThemeContext.Provider value={this.state.theme}>
      <header className={cx('header', `header-theme-${this.state.theme}`)}><h2>Мои проекты</h2></header>
      <div className={cx('addTask', `addTask-theme-${this.state.theme}`)}>
        <div>
          <h2>Новые проекты? Добавим в список!</h2>
          <NewAdd value={this.state.newProject.name} onChange={this.handleProjectChange}
          placeholder='Название' name='name'/>
        </div>
        <button className={cx('buttonAdd', `buttonAdd-theme-${this.state.theme}`)} onClick={this.handleAddProjectClick}>Добавим</button>
      </div>

      
      <div className={cx('projects')}>{Object.keys(this.state.projectsById).map(projectId => 
        <Project project={this.state.projectsById[projectId]}/>)}
      </div>

      </ThemeContext.Provider>)
    }

    render () {
      return(
        <BrowserRouter>
          <div className={cx('container', `container-theme-${this.state.theme}`)}>
            <Route path="/projects" component={this.Radios} />
            <Route path="/projects" component={this.Header} />
            <Switch>
              <Route exact path="/projects" component={this.Projects} />
              <Route path="/projects/:projectId" component={this.Tasks} />

              <Redirect to="/projects" /> 
            </Switch>
          </div>
        </BrowserRouter>
        )
    }
  
  }

export default MyTodoList;