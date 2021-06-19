function NormalizeState(projects) { 
    const projectsById = {}
    const tasksById = {}

    projects.map(project => {
        projectsById[project.id] = 
            {
                id: project.id,
                name: project.name,
                tasksIds: project.tasks.map(task => task.id)
            }
        })

    projects.map(project => 
        project.tasks.map(task => 
            tasksById[task.id] =
            {
                id: task.id,
                name: task.name,
                description: task.description,
                completed: task.completed,
                projectId: project.id,
            }
        )
    )

    const normilizedState = { 
        projectsById: projectsById,
        tasksById: tasksById,
      }

    return normilizedState
}

export default NormalizeState;