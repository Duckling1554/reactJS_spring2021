export const CHANGE_STATUS = 'CHANGE_STATUS'
export const PROJECT_ADD = 'PROJECT_ADD'
export const TASK_ADD = 'TASK_ADD'

export const handleAddProject = (newProject) => ({
  type: PROJECT_ADD,
  payload: newProject
})

export const handleAddTask = (newTask) => ({
  type: TASK_ADD,
  payload: newTask
})

export const handleStatusChange = (taskId) => ({
  type: CHANGE_STATUS,
  payload: taskId
})