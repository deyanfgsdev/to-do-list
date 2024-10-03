const TaskDetailsModal = ({ task, checkShowTaskDetailsModal }) => {
  const { title, description } = task

  const handleCloseModalClick = () => {
    checkShowTaskDetailsModal(false)
  }

  return (
    <div className='to-do-list--task-details-modal'>
      <div className='to-do-list--task-details-modal-body'>
        <button className='to-do-list--task-details-close-button' onClick={handleCloseModalClick}>X</button>
        <h2 className='to-do-list--task-details-modal-title'>{title}</h2>
        <p className='to-do-list--task-details-modal-description'>{description}</p>
      </div>
    </div>
  )
}

export default TaskDetailsModal
