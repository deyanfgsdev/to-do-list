const AddTaskModal = ({ addTask }) => {
  const handleSubmit = (event) => {
    event.preventDefault()

    const fields = new FormData(event.target)
    console.log(fields.get('title'))
  }

  return (
    <div className='to-do-list--add-task-modal'>
      <h2>New task</h2>
      <form className='to-do-list--add-task-form' onSubmit={handleSubmit}>
        <input type='text' name='title' placeholder='Enter a title' />
        <textarea name='description' placeholder='Enter a description' />
        <button type='submit'>Add task</button>
      </form>
    </div>
  )
}

export default AddTaskModal
