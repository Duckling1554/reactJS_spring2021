import { PROJECTS_LOAD, TASKS_LOAD } from "../actions/toDoListAction"

const initialState = {
  projectsById: [],
  tasksById: [],
}

export const toDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_LOAD: {
      return {
        ...state,
        projectsById: action.payload,
      }
    }

    case TASKS_LOAD: {
      let newTasksIds = action.payload.map(task => task.id)
      let oldTasks = state.tasksById.filter(task => !(newTasksIds.includes(task.id)))
      let newTasks = (oldTasks.concat(action.payload)) //обновление будет происходить только по отдельным проектам
      return {
        ...state,
        tasksById: newTasks
      }
    }
    default:
      return state
  }
}