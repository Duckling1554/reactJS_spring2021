import classnames from "classnames/bind"
import React from 'react';

import { ThemeContext } from "../MyTodoList/ThemeContext"

import styles from "./StatusButtons.module.scss"
const cx = classnames.bind(styles)

function DoneButton({onClick}) {
  return (
    <ThemeContext.Consumer>
        {(theme) =>
          <button className={cx('button', 'button-Done', `button-theme-${theme}`)} onClick={onClick}>
            Сделано ;)
          </button>}
    </ThemeContext.Consumer>
  );
}

export default DoneButton;