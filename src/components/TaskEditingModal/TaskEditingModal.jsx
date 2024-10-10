import { useState } from 'react'

import { IoCloseOutline } from 'react-icons/io5'

import '../../style/TaskFormModal.scss'

const TaskEditingModal = ({ task, editTask, checkShowTaskEditingModal }) => {
  const { id, title, description } = task
  const initialTaskTitle = title
  const initialTaskDescription = description

  const [taskForm, setTaskForm] = useState({
    taskTitle: initialTaskTitle,
    taskDescription: initialTaskDescription
  })
  const [showTitleInputError, setShowTitleInputError] = useState(false)

  const handleCloseModalClick = () => {
    checkShowTaskEditingModal(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const { taskTitle, taskDescription } = taskForm

    if (!taskTitle) {
      setShowTitleInputError(true)

      return
    }

    const newTask = {
      id,
      title: taskTitle,
      description: taskDescription
    }

    editTask(newTask)
    checkShowTaskEditingModal(false)
  }

  const handleTitleChange = (event) => {
    const { value } = event.target

    setTaskForm({ ...taskForm, taskTitle: value })
  }

  const handleDescriptionChange = (event) => {
    const { value } = event.target

    setTaskForm({ ...taskForm, taskDescription: value })
  }

  return (
    <div className='to-do-list--task-modal'>
      <div className='to-do-list--task-modal-body'>
        <button className='to-do-list--task-close-button' onClick={handleCloseModalClick}>
          <IoCloseOutline />
        </button>
        <h2 className='to-do-list--task-modal-title'>Edit Task</h2>
        <form className='to-do-list--task-form' onSubmit={handleSubmit}>
          <input type='text' value={taskForm.taskTitle} name='title' placeholder='Enter a title...' className='to-do-list--form-field to-do-list--task-input' onChange={handleTitleChange} />
          {showTitleInputError && <p className='to-do-list--task-input-error'>Please enter a title</p>}
          <textarea value={taskForm.taskDescription} name='description' placeholder='Enter a description...' className='to-do-list--form-field to-do-list--task-textarea' onChange={handleDescriptionChange} />
          <div className='to-do-list--task-form-actions'>
            <button className='to-do-list--task-cancel-button' onClick={handleCloseModalClick}>Cancel</button>
            <button type='submit' className='to-do-list--task-submit-button'>Edit Task</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskEditingModal
