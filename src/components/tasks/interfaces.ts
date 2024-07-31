export type priority = 'low' | 'medium' | 'high'
export type status = 'in-progress' | 'completed' | 'overdue'

export interface TASK {
  id: number
  title: string
  description: string
  assignee: {
    id: number
    name: string
  }
  category: {
    id: number
    name: string
  }
  status: {
    id: number
    name: status
  }
  priority: {
    id: number
    name: priority
  }
  delivery_date: Date
  created_at: Date
}
