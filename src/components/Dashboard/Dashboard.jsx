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
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [task, setTask] = useState(null)
  const [isTaskDetailsModalOpen, setIsTaskDetailsModalOpen] = useState(false)
  const [isTaskEditingModalOpen, setIsTaskEditingModalOpen] = useState(false)

  const handleAddTaskClick = () => {
    setIsAddTaskModalOpen(true)
  }

  const onAddTaskModalClose = () => {
    setIsAddTaskModalOpen(false)
  }

  const saveAndSetTasks = (newTasks) => {
    storageSaveTasks(newTasks)
    setTasks(newTasks)
  }

  const addTask = (task) => {
    const newTasks = [task, ...tasks]

    saveAndSetTasks(newTasks)
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

  const updateTaskDetails = (task) => {
    setTask(task)
  }

  const openTaskDetailsModal = () => {
    setIsTaskDetailsModalOpen(true)
  }

  const openTaskEditingModal = () => {
    setIsTaskEditingModalOpen(true)
  }

  const deleteTask = (taskToDelete) => {
    const newTasks = tasks.filter((task) => task.id !== taskToDelete.id)

    saveAndSetTasks(newTasks)
  }

  const onTaskDetailsModalClose = () => {
    setIsTaskDetailsModalOpen(false)
  }

  const editTask = (taskToEdit) => {
    refreshTaskList(taskToEdit)
  }

  const onTaskEditingModalClose = () => {
    setIsTaskEditingModalOpen(false)
  }

  return (
    <main className='to-do-list--dashboard'>
      {!tasks.length && <h3 className='to-do-list--no-tasks'>There are no tasks. Add your first task!</h3>}
      {!!tasks.length && <TaskItems
        tasks={tasks}
        refreshTaskList={refreshTaskList}
        updateTaskDetails={updateTaskDetails}
        openTaskDetailsModal={openTaskDetailsModal}
        openTaskEditingModal={openTaskEditingModal}
        deleteTask={deleteTask}
                         />}
      <div className='to-do-list--add-task-button-container'>
        {!tasks.length && <span className='to-do-list--current-tasks'>0 Tasks</span>}
        {!!tasks.length && <span className='to-do-list--current-tasks'>{`${tasks.length} ${tasks.length > 1 ? 'Tasks' : 'Task'}`}</span>}
        <button className='to-do-list--add-task-button' onClick={handleAddTaskClick}>
          <IoAddCircle />
        </button>
      </div>
      <AddTaskModal addTask={addTask} isAddTaskModalOpen={isAddTaskModalOpen} onAddTaskModalClose={onAddTaskModalClose} />
      {task && <TaskDetailsModal task={task} isTaskDetailsModalOpen={isTaskDetailsModalOpen} onTaskDetailsModalClose={onTaskDetailsModalClose} />}
      {task && <TaskEditingModal task={task} editTask={editTask} isTaskEditingModalOpen={isTaskEditingModalOpen} onTaskEditingModalClose={onTaskEditingModalClose} />}
    </main>
  )
}

export default Dashboard
