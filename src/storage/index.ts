import { Tasks } from '../components/Dashboard/Dashboard.types';

export const storageGetTasks = () => {
  const storageTasksItem = window.localStorage.getItem('to-do-list--tasks');
  const storageTasks: Tasks | null = storageTasksItem
    ? JSON.parse(storageTasksItem)
    : null;

  return storageTasks;
};

export const storageSaveTasks = (tasks: Tasks) => {
  window.localStorage.setItem('to-do-list--tasks', JSON.stringify(tasks));
};
