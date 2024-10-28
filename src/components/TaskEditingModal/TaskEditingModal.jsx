import { useState, useEffect, useRef } from 'react'

import { IoCloseOutline } from 'react-icons/io5'

import '../../style/TaskFormModal.scss'

const INITIAL_TASK_FORM = {
  taskTitle: '',
  taskDescription: ''
}

const TaskEditingModal = ({ task, editTask, isTaskEditingModalOpen, onTaskEditingModalClose }) => {
  const { id, title, description } = task

  const [taskForm, setTaskForm] = useState(INITIAL_TASK_FORM)
  const [showTitleInputError, setShowTitleInputError] = useState(false)
  const dialogRef = useRef(null)

  useEffect(() => {
    if (isTaskEditingModalOpen) {
      setTaskForm({
        taskTitle: title,
        taskDescription: description
      })

      dialogRef.current?.showModal()
      document.body.classList.add('no-scroll')
    } else {
      setTaskForm(INITIAL_TASK_FORM)

      dialogRef.current?.close()
      document.body.classList.remove('no-scroll')
    }
  }, [isTaskEditingModalOpen])

  const handleDialogClick = (event) => {
    const { currentTarget, clientX, clientY } = event
    const { top, right, bottom, left } = currentTarget.getBoundingClientRect()

    if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
      onTaskEditingModalClose()
    }
  }

  const handleCloseModal = () => {
    onTaskEditingModalClose()
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
    onTaskEditingModalClose()
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
    <dialog className='to-do-list--task-modal' ref={dialogRef} onClick={handleDialogClick}>
      <button className='to-do-list--task-close-button' autoFocus onClick={handleCloseModal}>
        <IoCloseOutline />
      </button>
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
    </dialog>
  )
}

export default TaskEditingModal
