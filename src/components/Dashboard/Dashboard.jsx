import TaskItems from '../TasksItems/TasksItems'
import AddTaskModal from '../AddTaskModal/AddTaskModal'

import { useState } from 'react'

const Dashboard = () => {
  // Initial fake tasks
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

  const addTask = (task) => {
    const newTasks = [task, ...tasks]
    setTasks(newTasks)
  }

  const checkShowModal = (showModal) => {
    setShowAddTaskModal(showModal)
  }

  return (
    <main className='to-do-list--dashboard'>
      <TaskItems tasks={tasks} />
      <button className='to-do-list--add-task-button' onClick={handleAddTaskClick}>Add task</button>
      {showAddTaskModal && <AddTaskModal currentTasksNumber={tasks.length} addTask={addTask} checkShowModal={checkShowModal} />}
    </main>
  )
}

export default Dashboard
