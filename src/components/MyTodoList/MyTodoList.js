import classnames from "classnames/bind"

// import './MyTodoList.css';
import React from 'react';
import Task from '../Task/Task'
import TaskAdd from '../TaskAdd/TaskAdd'

import { DEFAULT_THEME, ThemeContext } from "./ThemeContext"

import styles from "./MyTodoList.module.scss"
const cx = classnames.bind(styles)

class MyTodoList extends React.Component {
    state = {
      tasks: [
        {
          id: 1,
          name: 'Подготовка к кр по ИАДу',
          description: 'Прослушать лекции, сделать конспекты, расписать вопросы, выжить',
          completed: false,
        },
        {
          id: 2,
          name: 'Тестирование курса Coursera',
          description: 'Просмотреть лекции и задания, оценить наполнение курса, написать отзывы',
          completed: false,
        },
        {
          id: 3,
          name: 'Курсовая ИТ-консалтинг',
          description: 'Подготовиться к встрече с руком, обсудить задания с командой',
          completed: false,
        },
        {
          id: 4,
          name: 'ДЗ ReactJD',
          description: 'Просмотреть записи лекций, посмотреть доп. курсы, сделать дз',
          completed: false,
        },
        {
          id: 5,
          name: 'Работа - заявки',
          description: 'Отработать заявки на ПО',
          completed: true,
        },
        {
          id: 6,
          name: 'Работа - SAM',
          description: 'Разработать стратегию внедрение SAM системы',
          completed: false,
        },
        {
          id: 7,
          name: 'Уборка',
          description: 'Протереть пыль, пропылесосить',
          completed: true,
        }
      ],

      newTask: {
        id: Date.now(),
        name: '',
        description: '',
        completed: false,
      },

      theme: DEFAULT_THEME,
    }

    handleThemeChange = event => {
      this.setState({ theme: event.target.value })
    }

    handleChange = (event) => {
        const {value, name} = event.currentTarget
        this.setState({
        newTask: {
            ...this.state.newTask,
            [name]: value
        }
        });
    }

    handleAddTaskClick = () => {
        this.setState((currentState) => {
        if (currentState.newTask.name !== '') {   
            const newArr = [...currentState.tasks, this.state.newTask]
            return {
            tasks: newArr,
            newTask: {
                id: Date.now(),
                name: '',
                description: '',
                completed: false,
            }
            }
        }
        })
    }

    handleStatusChange = (taskId) => {
      this.setState((currentState) => {
        const newArr = [...currentState.tasks]
        const index = newArr.findIndex(el => el.id == taskId)
        const newStatus = !(newArr[index].completed)
        newArr[index] = { ...newArr[index], completed:  newStatus} 
        return {
          tasks: newArr
        }
      })
    }
    
    render () {
      return(
        
        <div className={cx('container', `container-theme-${this.state.theme}`)}>
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
          </div>

          <header className={cx('header', `header-theme-${this.state.theme}`)}><h1>TO-DO</h1></header>

          <ThemeContext.Provider value={this.state.theme}>
          <div className={cx('addTask', `addTask-theme-${this.state.theme}`)}>
            <div>
              <h2>Новые дела? Добавим в список!</h2>
              <TaskAdd value={this.state.newTask.name} onChange={this.handleChange}
              placeholder='Название' name='name'/>

              <TaskAdd value={this.state.newTask.description} onChange={this.handleChange}
              placeholder='Описание' name='description'/>
            </div>
            <button className={cx('buttonAdd', `buttonAdd-theme-${this.state.theme}`)} onClick={this.handleAddTaskClick}>Добавим</button>
          </div>

          <div className={cx('tasks')}>{this.state.tasks.map(task => <Task id={task.id} name={task.name} 
          description={task.description} completed={task.completed} 
          handleStatus={this.handleStatusChange} />)}
          </div>
          </ThemeContext.Provider>
        </div>
        )
    }
  
  }

export default MyTodoList;