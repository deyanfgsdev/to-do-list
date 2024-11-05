export const storageGetTasks = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(window.localStorage.getItem('to-do-list--tasks'))
  } else {
    return null
  }
}

export const storageSaveTasks = (tasks) => {
  window.localStorage.setItem('to-do-list--tasks', JSON.stringify(tasks))
}
