import classnames from "classnames/bind"
import React from 'react';

import { ThemeContext } from "../MyTodoList/ThemeContext"

import styles from "./StatusButtons.module.scss"
const cx = classnames.bind(styles)

function NotDoneButton({onClick}) {
  return (
    <ThemeContext.Consumer>
        {(theme) =>
          <button className={cx('button', 'button-NotDone', `button-theme-${theme}`)} onClick={onClick}>
            Ещё не сделано :(
          </button>}
    </ThemeContext.Consumer>
  );
}

export default NotDoneButton;