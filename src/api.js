const BASE_URL = 'http://valerystatinov.com/api'

const request = (url, method, body) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      Token: 'Valera',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
}

const get = (url) => {
  return request(url, 'GET')
}

const post = (url, body) => {
  return request(url, 'POST', body)
}

const put = (url, body) => {
  return request(url, 'PUT', body)
}

export const loadTasks = (projectId) => {
  return get(`/projects/${projectId}/tasks/`).then(res => {
    console.log('kek')
    const tasks = []
    res.map((task, id) => {
      return tasks[id] = {
        id: task.id,
        name: task.name,
        description: task.description,
        completed: task.completed,
        projectId: projectId
      }
    })
    console.log('api tasks', tasks)
    return tasks
  }).catch(err =>
    console.log('something bad happens'))
}

export const loadProjects = () => {
  return get('/projects/').then(res => {
    const projects = []
    res.map((project, id) => {
      return projects[id] = {
        id: project.id,
        name: project.name,
        tasksCount: project.tasksCount,
        tasksIds: [],
      }
    })
    return projects

    // const tasks = []
    // projects.map((project, project_id) => {
    //   loadTasks(project.id).then(res => {
    //     res.map((task, id) => {
    //       projects[project_id].tasksIds = [...projects[project_id].tasksIds, id]
    //       return tasks[id] = {
    //         id: task.id,
    //         name: task.name,
    //         description: task.description,
    //         completed: task.completed,
    //         projectId: project.id
    //       }
    //     })
    //   })
    // })
    // const state = {
    //   projectsById: projects,
    //   tasksById: tasks
    // }
  })
    .catch(err =>
      console.log('something bad happens'))
}

export const addProject = (newProject) => {
  return post('/projects/', newProject)
}

export const addTask = (newTask) => {
  return post(`/projects/${newTask.projectId}/tasks/`, newTask)
}

export const changeStatus = (task) => {
  console.log('11111',task)
  const projectId = task.projectId
  const taskId = task.id
  const status = task.completed
  task.completed = !(status)
  console.log('this is you', taskId)
  return put(`/projects/${projectId}/tasks/${taskId}/`, task)
}