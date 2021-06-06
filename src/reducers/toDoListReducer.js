import { PROJECT_ADD, TASK_ADD, CHANGE_STATUS } from "../actions/toDoListAction"
import NormalizeState from "./NormalizeState"
import projects from "./projects"

const normalizedProjects = NormalizeState(projects)

const initialState = {
  projectsById: { ...normalizedProjects.projectsById },
  tasksById: { ...normalizedProjects.tasksById }
}

export const toDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_ADD: {
      const project = action.payload
      project['id'] = Object.keys(state.projectsById).length + 1
      project['tasksIds'] = []
      if (action.payload.name !== '') {
        return {
          ...state,
          projectsById: { ...state.projectsById, [project['id']]: action.payload },
        }
      }
    }

    case TASK_ADD: {
      const task = action.payload
      task['id'] = Object.keys(state.tasksById).length + 1
      task['completed'] = false
      const projectId = task['projectId']
      if (action.payload.name !== '') {
        const newArr = [...state.projectsById[projectId]['tasksIds'], action.payload.id]
        const newProj = { ...state.projectsById[projectId], ['tasksIds']: newArr }
        return {
          projectsById: { ...state.projectsById, [projectId]: newProj },
          tasksById: { ...state.tasksById, [task['id']]: action.payload },
        }
      }
    }

    case CHANGE_STATUS: {
      const taskId = action.payload
      const oldTask = state.tasksById[taskId]
      if (oldTask) {
        const newStatus = !(oldTask['completed'])
        const newTask = { ...oldTask, completed: newStatus }
        return {
          ...state,
          tasksById: { ...state.tasksById, [taskId]: newTask }
        }
      }
    }
    default:
      return state
  }
}