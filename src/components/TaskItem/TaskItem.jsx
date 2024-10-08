import { useState } from 'react'

const TaskItem = ({ task, updateTaskState, setTaskDetails, checkShowTaskDetailsModal, checkShowTaskEditingModal, deleteTask }) => {
  const { title, description, isCompleted } = task
  const initialIsCompleted = isCompleted

  const [taskCompleted, setTaskCompleted] = useState(initialIsCompleted)

  const handleTaskStateChange = () => {
    setTaskCompleted(!taskCompleted)

    const updatedTask = { ...task, isCompleted: !taskCompleted }
    updateTaskState(updatedTask)
  }

  const handleDetailsClick = () => {
    setTaskDetails(task)
    checkShowTaskDetailsModal(true)
  }

  const handleEditClick = () => {
    setTaskDetails(task)
    checkShowTaskEditingModal(true)
  }

  const handleDeleteClick = () => {
    deleteTask(task)
  }

  return (
    <li>
      <div className='to-do-list--task-item'>
        <div className='to-do-list--task-item-info'>
          <input type='checkbox' checked={taskCompleted} onChange={handleTaskStateChange} />
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
