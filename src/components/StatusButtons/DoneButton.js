import './StatusButtons.css';
import React from 'react';

function DoneButton({onClick}) {
  return (
    <button className='buttonDone' onClick={onClick}>
      Done ;)
    </button>
  );
}

export default DoneButton;