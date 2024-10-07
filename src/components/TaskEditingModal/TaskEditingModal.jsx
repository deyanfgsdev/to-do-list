import { useState } from 'react'

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
    <div className='to-do-list--edit-task-modal'>
      <div className='to-do-list--edit-task-modal-body'>
        <button className='to-do-list--edit-task-close-button' onClick={handleCloseModalClick}>X</button>
        <h2 className='to-do-list--edit-task-modal-title'>Edit task</h2>
        <form className='to-do-list--edit-task-form' onSubmit={handleSubmit}>
          <input type='text' value={taskForm.taskTitle} name='title' placeholder='Enter a title' className='to-do-list--edit-task-input' onChange={handleTitleChange} />
          {showTitleInputError && <p className='to-do-list--edit-task-input-error'>Please enter a title</p>}
          <textarea value={taskForm.taskDescription} name='description' placeholder='Enter a description' className='to-do-list--edit-task-textarea' onChange={handleDescriptionChange} />
          <button type='submit' className='to-do-list--edit-task-submit-button'>Edit task</button>
        </form>
      </div>
    </div>
  )
}

export default TaskEditingModal
