import { useState } from 'react';

import './Dashboard.scss';

import {
  Task,
  Tasks,
  TasksState,
  IsTaskFormModalOpenState,
  IsAddTaskFormState,
  IsEditingTaskFormState,
  TaskState,
  IsTaskDetailsModalOpenState,
} from './Dashboard.types';

import TaskItems from '../TaskItems/TaskItems';
import TaskFormModal from '../TaskFormModal/TaskFormModal';
import TaskDetailsModal from '../TaskDetailsModal/TaskDetailsModal';

import { IoAddCircle } from 'react-icons/io5';

import { storageGetTasks, storageSaveTasks } from '../../storage';

const Dashboard = () => {
  const [tasks, setTasks]: TasksState = useState<Tasks>(() => {
    const storageTasks = storageGetTasks();

    if (storageTasks) {
      return storageTasks;
    }

    return [];
  });
  const [
    isTaskFormModalOpen,
    setIsTaskFormModalOpen,
  ]: IsTaskFormModalOpenState = useState<boolean>(false);
  const [isAddTaskForm, setIsAddTaskForm]: IsAddTaskFormState =
    useState<boolean>(false);
  const [isEditingTaskForm, setIsEditingTaskForm]: IsEditingTaskFormState =
    useState<boolean>(false);
  const [task, setTask]: TaskState = useState<Task | null>(null);
  const [
    isTaskDetailsModalOpen,
    setIsTaskDetailsModalOpen,
  ]: IsTaskDetailsModalOpenState = useState<boolean>(false);

  const handleAddTaskClick = () => {
    setIsTaskFormModalOpen(true);
    setIsAddTaskForm(true);
  };

  const onTaskFormModalClose = () => {
    setIsTaskFormModalOpen(false);

    if (isAddTaskForm) {
      setIsAddTaskForm(false);
    } else {
      setIsEditingTaskForm(false);
    }
  };

  const addTask = (task: Task) => {
    const newTasks = [task, ...tasks];

    storageSaveTasks(newTasks);
    setTasks((prevState) => [task, ...prevState]);
  };

  const refreshTaskList = (taskToUpdate: Task) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskToUpdate.id) {
        return taskToUpdate;
      }

      return task;
    });

    storageSaveTasks(newTasks);
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.id === taskToUpdate.id) {
          return taskToUpdate;
        }

        return task;
      })
    );
  };

  const updateTaskDetails = (task: Task) => {
    setTask(task);
  };

  const openTaskDetailsModal = () => {
    setIsTaskDetailsModalOpen(true);
  };

  const openTaskEditingModal = () => {
    setIsTaskFormModalOpen(true);
    setIsEditingTaskForm(true);
  };

  const deleteTask = (taskToDelete: Task) => {
    const newTasks = tasks.filter((task) => task.id !== taskToDelete.id);

    storageSaveTasks(newTasks);
    setTasks((prevState) =>
      prevState.filter((task) => task.id !== taskToDelete.id)
    );
  };

  const onTaskDetailsModalClose = () => {
    setIsTaskDetailsModalOpen(false);
  };

  const editTask = (taskToEdit: Task) => {
    refreshTaskList(taskToEdit);
  };

  return (
    <main className="main">
      {!tasks.length && (
        <h3 className="main__no-tasks-info">
          There are no tasks. Add your first task!
        </h3>
      )}
      {!!tasks.length && (
        <TaskItems
          tasks={tasks}
          refreshTaskList={refreshTaskList}
          updateTaskDetails={updateTaskDetails}
          openTaskDetailsModal={openTaskDetailsModal}
          openTaskEditingModal={openTaskEditingModal}
          deleteTask={deleteTask}
        />
      )}
      <div className="main__add-task-button-wrapper">
        {!tasks.length && <span className="current-tasks">0 Tasks</span>}
        {!!tasks.length && (
          <span className="current-tasks">{`${tasks.length} ${tasks.length > 1 ? 'Tasks' : 'Task'}`}</span>
        )}
        <button className="add-task-button" onClick={handleAddTaskClick}>
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
      <TaskDetailsModal
        task={task}
        isTaskDetailsModalOpen={isTaskDetailsModalOpen}
        onTaskDetailsModalClose={onTaskDetailsModalClose}
      />
    </main>
  );
};

export default Dashboard;
