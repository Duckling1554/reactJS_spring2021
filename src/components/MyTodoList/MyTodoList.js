import './MyTodoList.css';
import React from 'react';
import Task from '../Task/Task'
import TaskAdd from '../TaskAdd/TaskAdd'

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
      }
    }
    
    newId = 8

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
        <div>
          <header><h1>TO-DO</h1></header>

          <div className='addTask'>
            <div>
              <h2>Новые дела? Добавим в список!</h2>
              <TaskAdd value={this.state.newTask.name} onChange={this.handleChange} 
              placeholder='Название' name='name'/>

              <TaskAdd value={this.state.newTask.description} onChange={this.handleChange} 
              placeholder='Описание' name='description'/>
            </div>
            <button className='buttonAdd' onClick={this.handleAddTaskClick}>Добавим</button>
          </div>

          <div>{this.state.tasks.map(task => <Task id={task.id} name={task.name} 
          description={task.description} completed={task.completed} 
          handleStatus={this.handleStatusChange}/>)}
          </div>
        </div>
        )
    }
  
  }

export default MyTodoList;