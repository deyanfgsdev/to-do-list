import { useState, useEffect, useRef } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { IoCloseOutline } from 'react-icons/io5'

import '../../style/TaskFormModal.scss'

const AddTaskModal = ({ addTask, isAddTaskModalOpen, onAddTaskModalClose }) => {
  const dialogRef = useRef(null)
  const [titleInput, setTitleInput] = useState('')
  const [showTitleInputError, setShowTitleInputError] = useState(false)

  useEffect(() => {
    if (isAddTaskModalOpen) {
      dialogRef.current?.showModal()
      document.body.classList.add('no-scroll')
    } else {
      dialogRef.current?.close()
      document.body.classList.remove('no-scroll')
    }
  }, [isAddTaskModalOpen])

  const handleDialogClick = (event) => {
    const { target } = event

    if (target === dialogRef.current) {
      onAddTaskModalClose()
    }
  }

  const handleCloseModal = () => {
    onAddTaskModalClose()
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
    onAddTaskModalClose()
  }

  const handleTitleChange = (event) => {
    const { value } = event.target

    setTitleInput(value)

    if (!value) {
      setShowTitleInputError(true)
    } else {
      setShowTitleInputError(false)
    }
  }

  return (
    <dialog className='to-do-list--task-modal' ref={dialogRef} onClick={handleDialogClick} onClose={handleCloseModal}>
      <button className='to-do-list--task-close-button' autoFocus onClick={handleCloseModal}>
        <IoCloseOutline />
      </button>
      <h2 className='to-do-list--task-modal-title'>New Task</h2>
      <form className='to-do-list--task-form' onSubmit={handleSubmit}>
        <input type='text' value={titleInput} name='title' placeholder='Enter a title...' className='to-do-list--form-field to-do-list--task-input' onChange={handleTitleChange} />
        {showTitleInputError && <p className='to-do-list--task-input-error'>Please enter a title</p>}
        <textarea name='description' placeholder='Enter a description...' className='to-do-list--form-field to-do-list--task-textarea' />
        <div className='to-do-list--task-form-actions'>
          <button className='to-do-list--task-cancel-button' onClick={handleCloseModal}>Cancel</button>
          <button type='submit' className='to-do-list--task-submit-button'>Add Task</button>
        </div>
      </form>
    </dialog>
  )
}

export default AddTaskModal
