import { useState, useEffect } from 'react'

import Modal from '../Modal/Modal'

import '../../style/TaskFormModal.scss'

const INITIAL_TASK_FORM = {
  taskTitle: '',
  taskDescription: ''
}

const TaskEditingModal = ({ task, editTask, isModalOpen, onModalClose }) => {
  const { id, title, description } = task

  const [taskForm, setTaskForm] = useState(INITIAL_TASK_FORM)
  const [showTitleInputError, setShowTitleInputError] = useState(false)

  useEffect(() => {
    if (isModalOpen) {
      setTaskForm({
        taskTitle: title,
        taskDescription: description
      })
    } else {
      setTaskForm(INITIAL_TASK_FORM)
    }
  }, [isModalOpen])

  const handleCloseModal = () => {
    onModalClose()
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
    onModalClose()
  }

  const handleTitleChange = (event) => {
    const { value } = event.target

    setTaskForm({ ...taskForm, taskTitle: value })

    if (!value) {
      setShowTitleInputError(true)
    } else {
      setShowTitleInputError(false)
    }
  }

  const handleDescriptionChange = (event) => {
    const { value } = event.target

    setTaskForm({ ...taskForm, taskDescription: value })
  }

  return (
    <Modal isModalOpen={isModalOpen} onModalClose={onModalClose}>
      <h2 className='to-do-list--task-modal-title'>Edit Task</h2>
      <form className='to-do-list--task-form' onSubmit={handleSubmit}>
        <input type='text' value={taskForm.taskTitle} name='title' placeholder='Enter a title...' className='to-do-list--form-field to-do-list--task-input' onChange={handleTitleChange} />
        {showTitleInputError && <p className='to-do-list--task-input-error'>Please enter a title</p>}
        <textarea value={taskForm.taskDescription} name='description' placeholder='Enter a description...' className='to-do-list--form-field to-do-list--task-textarea' onChange={handleDescriptionChange} />
        <div className='to-do-list--task-form-actions'>
          <button type='button' className='to-do-list--task-cancel-button' onClick={handleCloseModal}>Cancel</button>
          <button type='submit' className='to-do-list--task-submit-button'>Edit Task</button>
        </div>
      </form>
    </Modal>
  )
}

export default TaskEditingModal
