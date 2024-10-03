import TaskItems from '../TasksItems/TasksItems'
import AddTaskModal from '../AddTaskModal/AddTaskModal'
import TaskDetailsModal from '../TaskDetailsModal/TaskDetailsModal'

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
  const [task, setTask] = useState(null)
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false)

  const handleAddTaskClick = () => {
    setShowAddTaskModal(true)
  }

  const addTask = (task) => {
    const newTasks = [task, ...tasks]
    setTasks(newTasks)
  }

  const checkAddTaskShowModal = (showModal) => {
    setShowAddTaskModal(showModal)
  }

  const taskDetails = (task) => {
    setTask(task)
  }

  const deleteTask = (taskToDelete) => {
    const newTasks = tasks.filter((task) => task.id !== taskToDelete.id)
    setTasks(newTasks)
  }

  const checkShowTaskDetailsModal = (showModal) => {
    setShowTaskDetailsModal(showModal)
  }

  return (
    <main className='to-do-list--dashboard'>
      <TaskItems
        tasks={tasks}
        taskDetails={taskDetails}
        checkShowTaskDetailsModal={checkShowTaskDetailsModal}
        deleteTask={deleteTask}
      />
      <button className='to-do-list--add-task-button' onClick={handleAddTaskClick}>Add task</button>
      {showAddTaskModal && <AddTaskModal currentTasksNumber={tasks.length} addTask={addTask} checkAddTaskShowModal={checkAddTaskShowModal} />}
      {task && showTaskDetailsModal && <TaskDetailsModal task={task} checkShowTaskDetailsModal={checkShowTaskDetailsModal} />}
    </main>
  )
}

export default Dashboard
