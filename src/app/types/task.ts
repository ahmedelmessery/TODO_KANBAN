export type Task = {
  id: number
  title: string
  description: string
  column: 'backlog' | 'in_progress' | 'review' | 'done'
}