import { IoCloseOutline } from 'react-icons/io5'

import './TaskDetailsModal.scss'

const TaskDetailsModal = ({ task, checkShowTaskDetailsModal }) => {
  const { title, description } = task

  const handleCloseModalClick = () => {
    checkShowTaskDetailsModal(false)
  }

  return (
    <div className='to-do-list--task-details-modal'>
      <div className='to-do-list--task-details-modal-body'>
        <button className='to-do-list--task-close-button' onClick={handleCloseModalClick}>
          <IoCloseOutline />
        </button>
        <h2 className='to-do-list--task-details-modal-title'>{title}</h2>
        <div className='to-do-list--task-details-modal-description'>{description}</div>
      </div>
    </div>
  )
}

export default TaskDetailsModal
