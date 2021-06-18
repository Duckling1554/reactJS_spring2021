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
    console.log('action tasks', tasks)
    dispatch({
      type: TASKS_LOAD,
      payload: tasks
    })
  })
}

export const handleAddProject = (newProject) => (dispatch) => {
  return api.addProject(newProject).then(() => {
    dispatch({
      type: PROJECT_ADD,
      payload: newProject
    })
  })
}

export const handleAddTask = (newTask) => (dispatch) => {
  console.log('check', newTask)
  newTask['priority'] = 1
  console.log('check', newTask)
  return api.addTask(newTask).then(() => {
    dispatch({
      type: TASK_ADD,
      payload: newTask
    })
  })
}

export const handleStatusChange = (task) => (dispatch) => {
  return api.changeStatus(task).then(() => {
    dispatch({
      type: CHANGE_STATUS,
      payload: task
    })
  })
}