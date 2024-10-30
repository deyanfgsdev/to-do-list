import { useState } from 'react'

import './Dashboard.scss'

import TaskItems from '../TasksItems/TasksItems'
import TaskFormModal from '../TaskFormModal/TaskFormModal'
import TaskDetailsModal from '../TaskDetailsModal/TaskDetailsModal'

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
  const [isTaskFormModalOpen, setIsTaskFormModalOpen] = useState(false)
  const [isAddTaskForm, setIsAddTaskForm] = useState(false)
  const [isEditingTaskForm, setIsEditingTaskForm] = useState(false)
  const [task, setTask] = useState(null)
  const [isTaskDetailsModalOpen, setIsTaskDetailsModalOpen] = useState(false)

  const handleAddTaskClick = () => {
    setIsTaskFormModalOpen(true)
    setIsAddTaskForm(true)
  }

  const onTaskFormModalClose = () => {
    setIsTaskFormModalOpen(false)

    if (isAddTaskForm) {
      setIsAddTaskForm(false)
    } else {
      setIsEditingTaskForm(false)
    }
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
    setIsTaskFormModalOpen(true)
    setIsEditingTaskForm(true)
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

  return (
    <main className='main'>
      {!tasks.length && <h3 className='main__no-tasks-info'>There are no tasks. Add your first task!</h3>}
      {!!tasks.length && <TaskItems
        tasks={tasks}
        refreshTaskList={refreshTaskList}
        updateTaskDetails={updateTaskDetails}
        openTaskDetailsModal={openTaskDetailsModal}
        openTaskEditingModal={openTaskEditingModal}
        deleteTask={deleteTask}
                         />}
      <div className='main__add-task-button-wrapper'>
        {!tasks.length && <span className='current-tasks'>0 Tasks</span>}
        {!!tasks.length && <span className='current-tasks'>{`${tasks.length} ${tasks.length > 1 ? 'Tasks' : 'Task'}`}</span>}
        <button className='add-task-button' onClick={handleAddTaskClick}>
          <IoAddCircle />
        </button>
      </div>
      <TaskFormModal
        isTaskFormModalOpen={isTaskFormModalOpen}
        onTaskFormModalClose={onTaskFormModalClose}
        isAddTaskForm={isAddTaskForm}
        addTask={addTask}
        isEditingTaskForm={isEditingTaskForm}
        task={task}
        editTask={editTask}
      />
      <TaskDetailsModal task={task} isTaskDetailsModalOpen={isTaskDetailsModalOpen} onTaskDetailsModalClose={onTaskDetailsModalClose} />
    </main>
  )
}

export default Dashboard
