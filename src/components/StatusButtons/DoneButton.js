import classnames from "classnames/bind"
import React from 'react';

import { connect } from "react-redux";

import styles from "./StatusButtons.module.scss"
const cx = classnames.bind(styles)

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});


function doneButton({ onClick, theme }) {
  return (
    <button className={cx('button', 'button-Done', `button-theme-${theme}`)} onClick={onClick}>
      Сделано ;)
    </button>
  );
}

const DoneButton = connect(mapStateToProps)(doneButton);
export default DoneButton;