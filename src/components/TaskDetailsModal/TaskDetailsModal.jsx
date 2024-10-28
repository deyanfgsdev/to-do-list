import Modal from '../Modal/Modal'

import './TaskDetailsModal.scss'

const TaskDetailsModal = ({ task, isModalOpen, onModalClose }) => {
  const { title, description } = task

  return (
    <Modal isModalOpen={isModalOpen} onModalClose={onModalClose}>
      <h2 className='to-do-list--task-details-modal-title'>{title}</h2>
      <div className='to-do-list--task-details-modal-description'>{description}</div>
    </Modal>
  )
}

export default TaskDetailsModal
