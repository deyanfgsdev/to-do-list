import { useState, useEffect } from 'react'

import Modal from '../Modal/Modal'

import './TaskDetailsModal.scss'

const INITIAL_TASK_DETAILS = {
  title: '',
  description: ''
}

const TaskDetailsModal = ({ task, isTaskDetailsModalOpen, onTaskDetailsModalClose }) => {
  const [taskDetails, setTaskDetails] = useState(INITIAL_TASK_DETAILS)

  useEffect(() => {
    if (isTaskDetailsModalOpen) {
      const { title, description } = task

      setTaskDetails({ title, description })
    } else {
      setTaskDetails(INITIAL_TASK_DETAILS)
    }
  }, [isTaskDetailsModalOpen])

  return (
    <Modal isModalOpen={isTaskDetailsModalOpen} onModalClose={onTaskDetailsModalClose}>
      <h2 className='dialog__details-title'>{taskDetails.title}</h2>
      <div className='dialog__details-description'>{taskDetails.description}</div>
    </Modal>
  )
}

export default TaskDetailsModal
