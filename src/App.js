import logo from './logo.svg';
import './App.css';
import React from 'react';

const Task = ({id, name,  description, completed}) => {
  const handleClick = () => {
    console.log('Task ' + id + ' completed status = ' + completed)
  }

  return (
    <div className='task'>
      <h3>{name}</h3>
      <div>{description}</div>
      <div>{completed}</div>
      <button onClick={handleClick} className='button1'><h3>CLICK</h3></button>
    </div>
  )
}


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
    ]
  }

  render () {
    return(
      <div>
        <header><h1>TO-DO</h1></header>
        <div>{this.state.tasks.map(task => <Task id={task.id} name={task.name} 
        description={task.description} completed={task.completed}/>)}
        </div>
      </div>
      )
  }

}

const App = () => {
  return (
    <MyTodoList />
  )
}

export default App;
