import './TaskAdd.css';
import React from 'react';

const TaskAdd = ({value, onChange, placeholder, name}) => {
    return (
        <textarea value={value} onChange={onChange} placeholder={placeholder} name={name}/>
    )
  }

  export default TaskAdd;