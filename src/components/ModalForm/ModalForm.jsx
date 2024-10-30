import { useState, useEffect } from 'react'

import { v4 as uuidv4 } from 'uuid'

import './ModalForm.scss'

const INITIAL_TASK_FORM = {
  taskTitle: '',
  taskDescription: ''
}

const ModalForm = ({ isAddTaskForm, addTask, isEditingTaskForm, task, editTask, isModalOpen, onModalClose }) => {
  const [modalTitle, setModalTitle] = useState('')
  const [formSubmitButtonText, setFormSubmitButtonText] = useState('')
  const [taskForm, setTaskForm] = useState(INITIAL_TASK_FORM)
  const [showTitleInputError, setShowTitleInputError] = useState(false)

  useEffect(() => {
    const resetTaskFormFields = () => {
      setTaskForm(INITIAL_TASK_FORM)
      setShowTitleInputError(false)
    }

    if (isModalOpen) {
      if (isAddTaskForm) {
        setModalTitle('New Task')
        resetTaskFormFields()
        setFormSubmitButtonText('Add Task')
      }

      if (isEditingTaskForm && task) {
        const { title, description } = task

        setModalTitle('Edit Task')
        setTaskForm({
          taskTitle: title,
          taskDescription: description
        })
        setFormSubmitButtonText('Edit Task')
      }
    } else {
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

    let newTask = {}

    if (isAddTaskForm) {
      newTask = {
        id: uuidv4(),
        title: formTitle,
        description: formDescription,
        isCompleted: false
      }

      addTask(newTask)
    }

    if (isEditingTaskForm) {
      const { id } = task

      newTask = {
        id,
        title: formTitle,
        description: formDescription
      }

      editTask(newTask)
    }

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
    <>
      <h2 className='dialog__title'>{modalTitle}</h2>
      <form className='form' onSubmit={handleSubmit}>
        <input type='text' value={taskForm.taskTitle} name='title' placeholder='Enter a title...' className='form__field form__field--title' onChange={handleTitleChange} />
        {showTitleInputError && <p className='form__title-error'>Please enter a title</p>}
        <textarea value={taskForm.taskDescription} name='description' placeholder='Enter a description...' className='form__field form__field--description' onChange={handleDescriptionChange} />
        <div className='form__actions'>
          <button type='button' className='form-action form-action--cancel-button' onClick={handleCloseModal}>Cancel</button>
          <button type='submit' className='form-action form-action--submit-button'>{formSubmitButtonText}</button>
        </div>
      </form>
    </>
  )
}

export default ModalForm
