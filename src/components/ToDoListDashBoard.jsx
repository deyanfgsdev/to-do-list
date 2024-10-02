import ToDoListItems from './ToDoListItems'

import { useState } from 'react'

const ToDoListDashBoard = () => {
  const [tasks, setTasks] = useState([])

  return (
    <div className='to-do-list--dashboard'>
      <ToDoListItems tasks={tasks} />
    </div>
  )
}

export default ToDoListDashBoard
