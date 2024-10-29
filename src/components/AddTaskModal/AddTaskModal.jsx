import { useState, useEffect } from 'react'

import Modal from '../Modal/Modal'

import { v4 as uuidv4 } from 'uuid'

import '../../style/TaskFormModal.scss'

const INITIAL_TASK_FORM = {
  taskTitle: '',
  taskDescription: ''
}

const AddTaskModal = ({ addTask, isModalOpen, onModalClose }) => {
  const [taskForm, setTaskForm] = useState(INITIAL_TASK_FORM)
  const [showTitleInputError, setShowTitleInputError] = useState(false)

  useEffect(() => {
    const resetTaskFormFields = () => {
      setTaskForm(INITIAL_TASK_FORM)
      setShowTitleInputError(false)
    }

    if (isModalOpen) {
      resetTaskFormFields()
    }
  }, [isModalOpen])

  const handleCloseModal = () => {
    onModalClose()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const { target } = event
    const formFields = new FormData(target)
    const formTitle = formFields.get('title')
    const formDescription = formFields.get('description')

    if (!formTitle) {
      setShowTitleInputError(true)

      return
    }

    const task = {
      id: uuidv4(),
      title: formTitle,
      description: formDescription,
      isCompleted: false
    }

    addTask(task)
    onModalClose()
  }

  const handleTitleChange = (event) => {
    const { value } = event.target
    const newTaskForm = {
      ...taskForm,
      taskTitle: value
    }

    setTaskForm(newTaskForm)

    if (!value) {
      setShowTitleInputError(true)
    } else {
      setShowTitleInputError(false)
    }
  }

  const handleDescriptionChange = (event) => {
    const { value } = event.target
    const newTaskForm = {
      ...taskForm,
      taskDescription: value
    }

    setTaskForm(newTaskForm)
  }

  return (
    <Modal isModalOpen={isModalOpen} onModalClose={onModalClose}>
      <h2 className='to-do-list--task-modal-title'>New Task</h2>
      <form className='to-do-list--task-form' onSubmit={handleSubmit}>
        <input type='text' value={taskForm.taskTitle} name='title' placeholder='Enter a title...' className='to-do-list--form-field to-do-list--task-input' onChange={handleTitleChange} />
        {showTitleInputError && <p className='to-do-list--task-input-error'>Please enter a title</p>}
        <textarea value={taskForm.taskDescription} name='description' placeholder='Enter a description...' className='to-do-list--form-field to-do-list--task-textarea' onChange={handleDescriptionChange} />
        <div className='to-do-list--task-form-actions'>
          <button type='button' className='to-do-list--task-cancel-button' onClick={handleCloseModal}>Cancel</button>
          <button type='submit' className='to-do-list--task-submit-button'>Add Task</button>
        </div>
      </form>
    </Modal>
  )
}

export default AddTaskModal
