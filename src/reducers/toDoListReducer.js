import { PROJECT_ADD, TASK_ADD, CHANGE_STATUS, PROJECTS_LOAD, TASKS_LOAD } from "../actions/toDoListAction"
// import NormalizeState from "./NormalizeState"
// import projects from "./projects"

// const normalizedProjects = NormalizeState(projects)
const initialState = {
  projectsById: [],
  tasksById: [],

}
// const initialState = []
// projectsById: { ...normalizedProjects.projectsById },
// projectsById: { ...api.loadProjects },
// tasksById: { ...normalizedProjects.tasksById }
// tasksById: { ...api.loadTasks }


export const toDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_LOAD: {
      return {
        ...state,
        projectsById: action.payload,
      }
    }

    case TASKS_LOAD: {
      console.log('reducer tasks', action.payload)
      return {
        ...state,
        tasksById: [...state.tasksById, action.payload],
      }
      // ...state,
      // // projectsById: action.payload,
      // tasksById: action.payload
      // return action.payload
    }

    case PROJECT_ADD: {
      const project = action.payload
      // project['id'] = Object.keys(state.projectsById).length + 1
      project['tasksCount'] = 0
      // project['tasksIds'] = []
      if (action.payload.name !== '') {
        return {
          ...state,
          projectsById: [...state.projectsById, action.payload]
          // projectsById: { ...state.projectsById, [project['id']]: action.payload },
        }
      }
    }

    case TASK_ADD: {
      const task = action.payload
      let projectId = task.projectId
      projectId = state.projectsById.findIndex(project => project.id == projectId)
      if (action.payload.name !== '' & action.payload.description !== '') {
        const newArr = [...state.projectsById[projectId]['tasksIds'], action.payload.id]
        const newProj = { ...state.projectsById[projectId], ['tasksIds']: newArr }
        return {
          projectsById: { ...state.projectsById, [projectId]: newProj },
          tasksById: { ...state.tasksById, [task['id']]: task },
        }
      }
    }

    case CHANGE_STATUS: {
      const task = action.payload
      const taskId = task.id
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