const ToDoListItems = ({ tasks }) => {
  return (
    <main className='to-do-list--items'>
      {!tasks.length && <p className='to-do-list--no-tasks'>No tasks</p>}
    </main>
  )
}

export default ToDoListItems
