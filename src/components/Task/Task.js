import './Task.css';
import React from 'react';
import DoneButton from '../StatusButtons/DoneButton'
import NotDoneButton from '../StatusButtons/NotDoneButton'

const Task = ({id, name,  description, completed, handleStatus}) => {
    const handleClick = () => {
      handleStatus(id)
    }

    let button;
    if (completed) {
      button = <DoneButton onClick={handleClick} />
    } else {
      button = <NotDoneButton onClick={handleClick} />
    } 
  
    return (
      <div className='task'>
        <h3>{name}</h3>
        <div>{description}</div>
        <div>{completed}</div>
        {button}
      </div>
    )
  }
  
export default Task;