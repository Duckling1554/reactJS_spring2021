import classnames from "classnames/bind"
import React from 'react';

import { connect } from "react-redux";
import { handleAddProject, handleAddTask } from "../../actions/toDoListAction";

import styles from "./NewAdd.module.scss"
const cx = classnames.bind(styles)

const mapStateToProps = (state) => ({
    theme: state.theme.theme,
});

const mapDispatchToProps = (dispatch) => ({
    dispatchAddProject: (newProject) => dispatch(handleAddProject(newProject)),
    dispatchAddTask: (newTask) => dispatch(handleAddTask(newTask)),
});

class newAdd extends React.Component {
    state = {
        newProject: {
            name: '',
        },
        newTask: {
            name: '',
            description: '',
            projectId: this.props.projectId,
        },
    }

    handleAddProjectClick = () => {
        this.props.dispatchAddProject(this.state.newProject);
    };
    handleAddTaskClick = () => {
        this.props.dispatchAddTask(this.state.newTask);
    };

    handleProjectChange = (event) => {
        const { value, name } = event.currentTarget
        this.setState({
            newProject: {
                ...this.state.newProject,
                [name]: value
            }
        })
    }

    handleTaskChange = (event) => {
        const { value, name } = event.currentTarget
        this.setState({
            newTask: {
                ...this.state.newTask,
                [name]: value
            }
        });
    }

    addArea = () => {
        switch (this.props.type) {
            case 'project': {
                const placeholder = 'Название'
                const name = 'name'
                return (
                    <div>
                        <div>
                            <textarea className={cx('textarea', `textarea-theme-${this.props.theme}`)}
                                value={this.state.newProject.name} onChange={this.handleProjectChange}
                                placeholder={placeholder} name={name} />
                        </div>
                        <button className={cx('buttonAdd', `buttonAdd-theme-${this.props.theme}`)}
                            onClick={this.handleAddProjectClick}
                        >Добавим</button>
                    </div>
                )
            }
            case 'task': {
                const placeholder1 = 'Название'
                const name1 = 'name'
                const placeholder2 = 'Описание'
                const name2 = 'description'
                return (
                    <div>
                        <div>
                            <textarea className={cx('textarea', `textarea-theme-${this.props.theme}`)}
                                value={this.state.newTask.name} onChange={this.handleTaskChange}
                                placeholder={placeholder1} name={name1} />
                            <textarea className={cx('textarea', `textarea-theme-${this.props.theme}`)}
                                value={this.state.newTask.description} onChange={this.handleTaskChange}
                                placeholder={placeholder2} name={name2} />
                        </div>
                        <button className={cx('buttonAdd', `buttonAdd-theme-${this.props.theme}`)}
                            onClick={this.handleAddTaskClick}
                        >Добавим</button>
                    </div>
                )
            }
        }

    }

    render() {
        return (
            <div>
                <this.addArea />
            </div>
        )
    }
}
const NewAdd = connect(mapStateToProps, mapDispatchToProps)(newAdd);
export default NewAdd;