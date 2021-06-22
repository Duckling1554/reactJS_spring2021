import * as api from "../api"
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const PROJECT_ADD = 'PROJECT_ADD'
export const TASK_ADD = 'TASK_ADD'
export const PROJECTS_LOAD = 'PROJECTS_LOAD'
export const TASKS_LOAD = 'TASKS_LOAD'

export const handleProjectsLoad = () => (dispatch) => {
  return api.loadProjects().then((projects) => {
    dispatch({
      type: PROJECTS_LOAD,
      payload: projects
    })
  })
}

export const handleTasksLoad = (projectId) => (dispatch) => {
  return api.loadTasks(projectId).then((tasks) => {
    dispatch({
      type: TASKS_LOAD,
      payload: tasks
    })
  })
}

export const handleAddProject = (name) => (dispatch) => {
  return api.addProject(name).then(() => dispatch(handleProjectsLoad()))
}

export const handleAddTask = (name, description, projectId) => (dispatch) => {
  return api.addTask(name, description, projectId)
    .then(() => dispatch(handleProjectsLoad()))
    .then(() => dispatch(handleTasksLoad(projectId)))
}

export const handleStatusChange = (projectId, id, name, description, completed) => (dispatch) => {
  return api.changeStatus(projectId, id, name, description, completed)
    .then(() => dispatch(handleTasksLoad(projectId)))
}