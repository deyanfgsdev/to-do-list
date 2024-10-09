import { useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { IoCloseOutline } from 'react-icons/io5'

import './AddTaskModal.scss'

const AddTaskModal = ({ addTask, checkAddTaskShowModal }) => {
  const [showTitleInputError, setShowTitleInputError] = useState(false)

  const handleCloseModalClick = () => {
    checkAddTaskShowModal(false)
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
    checkAddTaskShowModal(false)
  }

  return (
    <div className='to-do-list--add-task-modal'>
      <div className='to-do-list--add-task-modal-body'>
        <button className='to-do-list--add-task-close-button' onClick={handleCloseModalClick}>
          <IoCloseOutline />
        </button>
        <h2 className='to-do-list--add-task-modal-title'>New Task</h2>
        <form className='to-do-list--add-task-form' onSubmit={handleSubmit}>
          <input type='text' name='title' placeholder='Enter a title...' className='to-do-list--form-field to-do-list--add-task-input' />
          {showTitleInputError && <p className='to-do-list--add-task-input-error'>Please enter a title</p>}
          <textarea name='description' placeholder='Enter a description...' className='to-do-list--form-field to-do-list--add-task-textarea' />
          <div className='to-do-list--add-task-form-actions'>
            <button className='to-do-list--add-task-cancel-button'>Cancel</button>
            <button type='submit' className='to-do-list--add-task-submit-button'>Add Task</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTaskModal
