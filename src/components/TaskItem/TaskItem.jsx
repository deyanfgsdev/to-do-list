const TaskItem = ({ task }) => {
  const { title, description, completed } = task

  const handleChange = () => {

  }

  return (
    <li>
      <div className='to-do-list--task-item'>
        <div className='to-do-list--task-item-info'>
          <input type='checkbox' checked={completed} onChange={handleChange} />
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className='to-do-list--task-item-actions'>
          <button>Details</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </li>
  )
}

export default TaskItem
