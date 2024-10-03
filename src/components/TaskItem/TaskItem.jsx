import { useState } from 'react'

const TaskItem = ({ task, taskDetails, checkShowTaskDetailsModal, taskToEdit, checkShowTaskEditingModal, deleteTask }) => {
  const { title, description, completed } = task
  const initialIsCompleted = completed

  const [isCompleted, setIsCompleted] = useState(initialIsCompleted)

  const handleTaskStatusChange = () => {
    setIsCompleted(!isCompleted)
  }

  const handleDetailsClick = () => {
    taskDetails(task)
    checkShowTaskDetailsModal(true)
  }

  const handleEditClick = () => {
    taskToEdit(task)
    checkShowTaskEditingModal(true)
  }

  const handleDeleteClick = () => {
    deleteTask(task)
  }

  return (
    <li>
      <div className='to-do-list--task-item'>
        <div className='to-do-list--task-item-info'>
          <input type='checkbox' checked={isCompleted} onChange={handleTaskStatusChange} />
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className='to-do-list--task-item-actions'>
          <button onClick={handleDetailsClick}>Details</button>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
    </li>
  )
}

export default TaskItem
