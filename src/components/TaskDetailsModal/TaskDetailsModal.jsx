import { useEffect, useRef } from 'react'

import { IoCloseOutline } from 'react-icons/io5'

import './TaskDetailsModal.scss'

const TaskDetailsModal = ({ task, isTaskDetailsModalOpen, onTaskDetailsModalClose }) => {
  const dialogRef = useRef(null)
  const { title, description } = task

  useEffect(() => {
    if (isTaskDetailsModalOpen) {
      dialogRef.current?.showModal()
      document.body.classList.add('no-scroll')
    } else {
      dialogRef.current?.close()
      document.body.classList.remove('no-scroll')
    }
  }, [isTaskDetailsModalOpen])

  const handleDialogClick = (event) => {
    const { target } = event

    if (target === dialogRef.current) {
      onTaskDetailsModalClose()
    }
  }

  const handleCloseModal = () => {
    onTaskDetailsModalClose()
  }

  return (
    <dialog className='to-do-list--task-details-modal' ref={dialogRef} onClick={handleDialogClick} onClose={handleCloseModal}>
      <button className='to-do-list--task-close-button' autoFocus onClick={handleCloseModal}>
        <IoCloseOutline />
      </button>
      <h2 className='to-do-list--task-details-modal-title'>{title}</h2>
      <div className='to-do-list--task-details-modal-description'>{description}</div>
    </dialog>
  )
}

export default TaskDetailsModal
