export const storageGetTasks = () => {
  return JSON.parse(window.localStorage.getItem('to-do-list--tasks'))
}

export const storageSaveTasks = (tasks) => {
  window.localStorage.setItem('to-do-list--tasks', JSON.stringify(tasks))
}
