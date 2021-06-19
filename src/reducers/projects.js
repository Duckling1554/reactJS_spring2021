const projects = [
    {
      id: 1,
      name: 'Учебушка',
      tasks: [
        {
            id: 1,
            name: 'Подготовка к кр по ИАДу',
            description: 'Прослушать лекции, сделать конспекты, расписать вопросы, выжить',
            completed: false,
        },
        {
            id: 2,
            name: 'Тестирование курса Coursera',
            description: 'Просмотреть лекции и задания, оценить наполнение курса, написать отзывы',
            completed: false,
            projectId: 1
        },
        {
            id: 3,
            name: 'Курсовая ИТ-консалтинг',
            description: 'Подготовиться к встрече с руком, обсудить задания с командой',
            completed: false,
            projectId: 1
        },
        {
            id: 4,
            name: 'ДЗ ReactJD',
            description: 'Просмотреть записи лекций, посмотреть доп. курсы, сделать дз',
            completed: false,
            projectId: 1
        },
      ]
    },
    {
      id: 2,
      name: 'Работа',
      tasks: [
        {
            id: 5,
            name: 'Работа - заявки',
            description: 'Отработать заявки на ПО',
            completed: true,
        },
        {
            id: 6,
            name: 'Работа - SAM',
            description: 'Разработать стратегию внедрение SAM системы',
            completed: false,
            projectId: 2
        },
      ]
    },
    {
      id: 3,
      name: 'Домашние делишки',
      tasks: [
        {
            id: 7,
            name: 'Уборка',
            description: 'Протереть пыль, пропылесосить',
            completed: true,
            projectId: 3
        }
        ]
    },
  ]

export default projects;