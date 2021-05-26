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

// projects = [
//     {
//       id: 1,
//       name: 'Учебушка',
//       tasks: [
//         {
//             id: 1,
//             name: 'Подготовка к кр по ИАДу',
//             description: 'Прослушать лекции, сделать конспекты, расписать вопросы, выжить',
//             completed: false,
//         },
//       ]
//     },
//     {
//       id: 2,
//       name: 'Работа',
//       tasks: [
//         {
//             id: 5,
//             name: 'Работа - заявки',
//             description: 'Отработать заявки на ПО',
//             completed: true,
//         },
//       ]
//     },
//   ]

export default NormalizeState;