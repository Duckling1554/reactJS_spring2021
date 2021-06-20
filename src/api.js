const BASE_URL = 'http://valerystatinov.com/api'

const request = (url, method, body) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      Token: 'Utochka1554',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

const get = (url) => {
  return request(url, 'GET').then(res => res.json())
}

const post = (url, body) => {
  return request(url, 'POST', body).then(res => res.json())
}

const put = (url, body) => {
  return request(url, 'PUT', body)
}

export const loadTasks = (projectId) => {
  return get(`/projects/${projectId}/tasks/`).then(res => {
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
    return tasks
  }).catch(err =>
    console.log('Something bad happens, try to reload the page'))
}

export const loadProjects = () => {
  return get('/projects/').then(res => {

    const projects = []
    res.map((project, id) => {
      return projects[id] = {
        id: project.id,
        name: project.name,
        tasksCount: project.tasksCount,
      }
    })
    return projects
  })
    .catch(err => console.log('Something bad happens, try to reload the page'))
}

export const addProject = (name) => {
  const newProject = {
    'name': name
  }
  return post('/projects/', newProject)
}

export const addTask = (name, description, projectId) => {
  const newTask = {
    'name': name,
    'description': description,
    'projectId': Number(projectId),
    'completed': false
  }
  return post(`/projects/${newTask.projectId}/tasks/`, newTask).catch(err => console.log('You should input description'))
}

export const changeStatus = (projectId, id, name, description, completed) => {
  const updatedTask = {
    'name': name,
    'description': description,
    'priority': 1,
    'completed': !(completed),
    'projectId': Number(projectId)
  }
  return put(`/projects/${projectId}/tasks/${id}/`, updatedTask)
}