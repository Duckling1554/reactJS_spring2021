import classnames from "classnames/bind"
import React from 'react';

import { connect } from "react-redux";

import styles from "./StatusButtons.module.scss"
const cx = classnames.bind(styles)

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});


function notDoneButton({ onClick, theme }) {
  return (
    <button className={cx('button', 'button-NotDone', `button-theme-${theme}`)} onClick={onClick}>
      Ещё не сделано :(
    </button>
  );
}

const NotDoneButton = connect(mapStateToProps)(notDoneButton);
export default NotDoneButton;