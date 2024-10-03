const TaskEditingModal = () => {
  return (
    <div className='to-do-list--edit-task-modal'>
      <div className='to-do-list--edit-task-modal-body'>
        <button className='to-do-list--edit-task-close-button' onClick={handleCloseModalClick}>X</button>
        <h2 className='to-do-list--edit-task-modal-title'>Edit task</h2>
        <form className='to-do-list--edit-task-form' onSubmit={handleSubmit}>
          <input type='text' name='title' placeholder='Enter a title' className='to-do-list--edit-task-input' />
          {showTitleInputError && <p className='to-do-list--edit-task-input-error'>Please enter a title</p>}
          <textarea name='description' placeholder='Enter a description' className='to-do-list--edit-task-textarea' />
          <button type='submit' className='to-do-list--edit-task-submit-button'>Edit task</button>
        </form>
      </div>
    </div>
  )
}

export default TaskEditingModal
