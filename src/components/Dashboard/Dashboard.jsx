import { useState } from 'react'

import TaskItems from '../TasksItems/TasksItems'
import AddTaskModal from '../AddTaskModal/AddTaskModal'
import TaskDetailsModal from '../TaskDetailsModal/TaskDetailsModal'
import TaskEditingModal from '../TaskEditingModal/TaskEditingModal'

import { storageGetTasks, storageSaveTasks } from '../../storage'

const Dashboard = () => {
  const [tasks, setTasks] = useState(() => {
    const storageTasks = storageGetTasks()

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

    storageSaveTasks(newTasks)
    setTasks(newTasks)
  }

  const checkAddTaskShowModal = (showModal) => {
    setShowAddTaskModal(showModal)
  }

  const updateTaskState = (taskStateToUpdate) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskStateToUpdate.id) {
        return taskStateToUpdate
      }

      return task
    })

    storageSaveTasks(newTasks)
    setTasks(newTasks)
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

    storageSaveTasks(newTasks)
    setTasks(newTasks)
  }

  const editTask = (taskToEdit) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskToEdit.id) {
        return taskToEdit
      }

      return task
    })

    storageSaveTasks(newTasks)
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
        updateTaskState={updateTaskState}
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
