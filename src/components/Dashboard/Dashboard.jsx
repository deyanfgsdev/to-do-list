import { useState } from 'react'

import './Dashboard.scss'

import TaskItems from '../TasksItems/TasksItems'
import AddTaskModal from '../AddTaskModal/AddTaskModal'
import TaskDetailsModal from '../TaskDetailsModal/TaskDetailsModal'
import TaskEditingModal from '../TaskEditingModal/TaskEditingModal'

import { IoAddCircle } from 'react-icons/io5'

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

  const saveAndSetTasks = (newTasks) => {
    storageSaveTasks(newTasks)
    setTasks(newTasks)
  }

  const addTask = (task) => {
    const newTasks = [task, ...tasks]

    saveAndSetTasks(newTasks)
  }

  const checkAddTaskShowModal = (showModal) => {
    setShowAddTaskModal(showModal)
  }

  const refreshTaskList = (taskToUpdate) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskToUpdate.id) {
        return taskToUpdate
      }

      return task
    })

    saveAndSetTasks(newTasks)
  }

  const setTaskDetails = (task) => {
    setTask(task)
  }

  const checkShowTaskEditingModal = (showModal) => {
    setShowTaskEditingModal(showModal)
  }

  const deleteTask = (taskToDelete) => {
    const newTasks = tasks.filter((task) => task.id !== taskToDelete.id)

    saveAndSetTasks(newTasks)
  }

  const editTask = (taskToEdit) => {
    refreshTaskList(taskToEdit)
  }

  const checkShowTaskDetailsModal = (showModal) => {
    setShowTaskDetailsModal(showModal)
  }

  return (
    <main className='to-do-list--dashboard'>
      {!tasks.length && <h3 className='to-do-list--no-tasks'>There are no tasks. Add your first task!</h3>}
      {!!tasks.length && <TaskItems
        tasks={tasks}
        refreshTaskList={refreshTaskList}
        setTaskDetails={setTaskDetails}
        checkShowTaskDetailsModal={checkShowTaskDetailsModal}
        checkShowTaskEditingModal={checkShowTaskEditingModal}
        deleteTask={deleteTask}
                         />}
      <div className='to-do-list--add-task-button-container'>
        <div className='to-do-list--add-task-button-wrapper'>
          <button className='to-do-list--add-task-button' onClick={handleAddTaskClick}>
            <IoAddCircle />
          </button>
        </div>
      </div>
      {showAddTaskModal && <AddTaskModal addTask={addTask} checkAddTaskShowModal={checkAddTaskShowModal} />}
      {task && showTaskDetailsModal && <TaskDetailsModal task={task} checkShowTaskDetailsModal={checkShowTaskDetailsModal} />}
      {task && showTaskEditingModal && <TaskEditingModal task={task} editTask={editTask} checkShowTaskEditingModal={checkShowTaskEditingModal} />}
    </main>
  )
}

export default Dashboard
