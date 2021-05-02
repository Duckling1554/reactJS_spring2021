import './StatusButtons.css';
import React from 'react';

function NotDoneButton({onClick}) {
  return (
    <button className='buttonNotDone' onClick={onClick}>
      Ещё не сделано :(
    </button>
  );
}

export default NotDoneButton;