import { useState } from 'react'

import './TaskItem.scss'

import { FaRegEye } from 'react-icons/fa'
import { GoPencil } from 'react-icons/go'
import { MdDeleteOutline } from 'react-icons/md'

const TaskItem = ({ task, refreshTaskList, setTaskDetails, openTaskDetailsModal, checkShowTaskEditingModal, deleteTask }) => {
  const { id, title, description, isCompleted } = task
  const initialIsCompleted = isCompleted

  const [taskCompleted, setTaskCompleted] = useState(initialIsCompleted)

  const titleClassName = taskCompleted ? 'to-do-list--task-title to-do-list--completed-task' : 'to-do-list--task-title'

  const handleTaskStateChange = (event) => {
    setTaskCompleted(!taskCompleted)

    const updatedTask = { ...task, isCompleted: !taskCompleted }
    refreshTaskList(updatedTask)
  }

  const handleDetailsClick = () => {
    setTaskDetails(task)
    openTaskDetailsModal()
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
        <div className='to-do-list--task-item-info-container'>
          <div className='to-do-list--task-checkbox-wrapper'>
            <input type='checkbox' checked={taskCompleted} id={`to-do-list--task-checkbox-${id}`} className='to-do-list--task-checkbox-input' onChange={handleTaskStateChange} />
            <label htmlFor={`to-do-list--task-checkbox-${id}`} />
          </div>
          <div className='to-do-list--task-item-info'>
            <h3 className={titleClassName}>{title}</h3>
            <p className='to-do-list--task-description'>{description}</p>
          </div>
        </div>
        <div className='to-do-list--task-item-actions'>
          <button onClick={handleDetailsClick}>
            <FaRegEye />
          </button>
          <button onClick={handleEditClick}>
            <GoPencil />
          </button>
          <button onClick={handleDeleteClick}>
            <MdDeleteOutline />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TaskItem
