import { useState } from 'react'

import TaskItems from '../TasksItems/TasksItems'
import AddTaskModal from '../AddTaskModal/AddTaskModal'
import TaskDetailsModal from '../TaskDetailsModal/TaskDetailsModal'
import TaskEditingModal from '../TaskEditingModal/TaskEditingModal'

const Dashboard = () => {
  const [tasks, setTasks] = useState(() => {
    const storageTasks = JSON.parse(window.localStorage.getItem('to-do-list--tasks'))

    if (storageTasks) {
      return storageTasks
    }

    return []
  })
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [task, setTask] = useState(null)
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false)
  const [showTaskEditingModal, setShowTaskEditingModal] = useState(false)

  const handleAddTaskClick = () => {
    setShowAddTaskModal(true)
  }

  const addTask = (task) => {
    const newTasks = [task, ...tasks]

    window.localStorage.setItem('to-do-list--tasks', JSON.stringify(newTasks))
    setTasks(newTasks)
  }

  const checkAddTaskShowModal = (showModal) => {
    setShowAddTaskModal(showModal)
  }

  const showTaskDetails = (task) => {
    setTask(task)
  }

  const taskToEdit = (task) => {
    setTask(task)
  }

  const checkShowTaskEditingModal = (showModal) => {
    setShowTaskEditingModal(showModal)
  }

  const deleteTask = (taskToDelete) => {
    const newTasks = tasks.filter((task) => task.id !== taskToDelete.id)
    setTasks(newTasks)
  }

  const editTask = (taskToEdit) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskToEdit.id) {
        return taskToEdit
      }

      return task
    })

    setTasks(newTasks)
  }

  const checkShowTaskDetailsModal = (showModal) => {
    setShowTaskDetailsModal(showModal)
  }

  return (
    <main className='to-do-list--dashboard'>
      {!tasks.length && <p className='to-do-list--no-tasks'>There are no tasks. Add your first task!</p>}
      {!!tasks.length && <TaskItems
        tasks={tasks}
        showTaskDetails={showTaskDetails}
        checkShowTaskDetailsModal={checkShowTaskDetailsModal}
        taskToEdit={taskToEdit}
        checkShowTaskEditingModal={checkShowTaskEditingModal}
        deleteTask={deleteTask}
                         />}
      <button className='to-do-list--add-task-button' onClick={handleAddTaskClick}>Add task</button>
      {showAddTaskModal && <AddTaskModal addTask={addTask} checkAddTaskShowModal={checkAddTaskShowModal} />}
      {task && showTaskDetailsModal && <TaskDetailsModal task={task} checkShowTaskDetailsModal={checkShowTaskDetailsModal} />}
      {task && showTaskEditingModal && <TaskEditingModal task={task} editTask={editTask} checkShowTaskEditingModal={checkShowTaskEditingModal} />}
    </main>
  )
}

export default Dashboard
