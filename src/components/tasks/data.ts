import type { TASK } from './interfaces'

export const tasks: TASK[] = [
  {
    id: 1,
    title: 'Tarea 1',
    description: 'Descripción de la tarea',
    assignee: {
      id: 1,
      name: 'John Doe'
    },
    category: {
      id: 1,
      name: 'Category 1'
    },
    status: {
      id: 1,
      name: 'in-progress'
    },
    priority: {
      id: 1,
      name: 'low'
    },
    delivery_date: new Date(),
    created_at: new Date()
  },
  {
    id: 2,
    title: 'Tarea 2',
    description: 'Descripción de la tarea',
    assignee: {
      id: 1,
      name: 'John Doe'
    },
    category: {
      id: 1,
      name: 'Category 1'
    },
    status: {
      id: 1,
      name: 'overdue'
    },
    priority: {
      id: 1,
      name: 'medium'
    },
    delivery_date: new Date(),
    created_at: new Date()
  },
  {
    id: 3,
    title: 'Tarea 3',
    description: 'Descripción de la tarea',
    assignee: {
      id: 1,
      name: 'John Doe'
    },
    category: {
      id: 1,
      name: 'Category 1'
    },
    status: {
      id: 1,
      name: 'completed'
    },
    priority: {
      id: 1,
      name: 'high'
    },
    delivery_date: new Date(),
    created_at: new Date()
  }
]
