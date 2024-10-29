import Modal from '../Modal/Modal'

import './TaskDetailsModal.scss'

const TaskDetailsModal = ({ task, isTaskDetailsModalOpen, onTaskDetailsModalClose }) => {
  const { title, description } = task

  return (
    <Modal isModalOpen={isTaskDetailsModalOpen} onModalClose={onTaskDetailsModalClose}>
      <h2 className='to-do-list--task-details-modal-title'>{title}</h2>
      <div className='to-do-list--task-details-modal-description'>{description}</div>
    </Modal>
  )
}

export default TaskDetailsModal
