import TaskItems from '../TasksItems/TasksItems'
import AddTaskModal from '../AddTaskModal/AddTaskModal'

import { useState } from 'react'

const Dashboard = () => {
  const customTasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      completed: false
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description 2',
      completed: true
    }
  ]

  const [tasks, setTasks] = useState(customTasks)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)

  const handleAddTaskClick = () => {
    setShowAddTaskModal(true)
  }

  return (
    <main className='to-do-list--dashboard'>
      <TaskItems tasks={tasks} />
      <button className='to-do-list--add-task-button' onClick={handleAddTaskClick}>Add task</button>
      {showAddTaskModal && <AddTaskModal />}
    </main>
  )
}

export default Dashboard
