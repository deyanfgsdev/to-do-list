// @ts-check
import { test, expect } from '@playwright/test'

import { storageGetTasks } from '../src/storage'

const LOCALHOST_URL = 'http://localhost:5173/'

const tasks = [{
  title: 'Go to the supermarket',
  description: 'Buy milk and eggs'
}, {
  title: 'Go to the post office',
  description: 'Package for John'
}]

test.beforeEach(async ({ page }) => {
  await page.goto(LOCALHOST_URL)
})

test('should show a message when there are no tasks', async ({ page }) => {
  const storageTasks = await page.evaluate(storageGetTasks)

  if (!storageTasks || !storageTasks.length) {
    const messageElem = await page.locator('.main__no-tasks-info')
    const messageText = await messageElem.textContent()

    await expect(messageElem).toBeVisible()
    await expect(messageText?.length).toBeGreaterThan(0)
    await expect(messageText).toContain('There are no tasks')
  }
})

test.describe('New task', () => {
  test("should show a required message when a task's title is empty", async ({ page }) => {
    const addTaskButton = await page.locator('.add-task-button')
    await addTaskButton.click()

    const modalAddTaskButton = await page.locator('.main__task-dialog .form-action--submit-button')
    await modalAddTaskButton.click()

    const formFieldTitleElem = await page.locator('.main__task-dialog .form__field--title')
    const formFieldTitleValue = await formFieldTitleElem.inputValue()

    if (!formFieldTitleValue) {
      const titleErrorElem = await page.locator('.form__title-error')
      await expect(titleErrorElem).toBeVisible()
    }
  })

  test('should allow me to add to do list tasks', async ({ page }) => {
    await createDefaultTasks(page)

    const tasksListItems = await page.locator('.main__tasks-items > ul > li')

    await expect(tasksListItems).toHaveCount(tasks.length)
    await checkNumberOfTasksInStorage(page, 2)
  })

  test('should append new items to the top of the list', async ({ page }) => {
    await createDefaultTasks(page)

    const currentTasksElem = await page.locator('.main__add-task-button-wrapper > .current-tasks')
    await expect(currentTasksElem).toHaveText('2 Tasks')
  })

  test('the task form modal should not be displayed when we add tasks', async ({ page }) => {
    await createDefaultTasks(page)

    const modalElems = await page.locator('.main > .main__task-dialog')
    const formModalElem = await modalElems.first()
    const formModalElemOpen = await formModalElem.getAttribute('open')
    await expect(formModalElemOpen).toBeNull()
  })
})

test.describe('Task Item', () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTasks(page)
  })

  test('should allow me to mark a task item as complete', async ({ page }) => {
    const tasksListItems = await page.locator('.main__tasks-items > ul > li')

    // First task
    const firstTaskElem = await tasksListItems.first()
    const firstTaskCheckboxLabel = await firstTaskElem.locator('.checkbox-wrapper__label')
    await firstTaskCheckboxLabel.click()

    const firstTaskCheckbox = await firstTaskElem.locator('.checkbox-wrapper__checkbox')
    await expect(firstTaskCheckbox).toBeChecked()

    const firstTaskTitleElem = await firstTaskElem.locator('.task-item-info__title')
    await expect(firstTaskTitleElem).toHaveClass('task-item-info__title task-item-info__title--completed-task')

    // Second task
    const secondTaskElem = await tasksListItems.nth(1)
    const secondTaskCheckboxLabel = await secondTaskElem.locator('.checkbox-wrapper__label')
    await secondTaskCheckboxLabel.click()

    const secondTaskCheckbox = await secondTaskElem.locator('.checkbox-wrapper__checkbox')
    await expect(secondTaskCheckbox).toBeChecked()

    const secondTaskTitleElem = await secondTaskElem.locator('.task-item-info__title')
    await expect(secondTaskTitleElem).toHaveClass('task-item-info__title task-item-info__title--completed-task')

    await checkNumberOfCompletedTasksInStorage(page, 2)
  })

  test('should allow me to un-mark a done task item', async ({ page }) => {
    const tasksListItems = await page.locator('.main__tasks-items > ul > li')

    const firstTaskElem = await tasksListItems.first()
    const firstTaskCheckboxLabel = await firstTaskElem.locator('.checkbox-wrapper__label')
    await firstTaskCheckboxLabel.click()

    const firstTaskCheckbox = await firstTaskElem.locator('.checkbox-wrapper__checkbox')
    await expect(firstTaskCheckbox).toBeChecked()

    const firstTaskTitleElem = await firstTaskElem.locator('.task-item-info__title')
    await expect(firstTaskTitleElem).toHaveClass('task-item-info__title task-item-info__title--completed-task')

    await checkNumberOfCompletedTasksInStorage(page, 1)

    await firstTaskCheckboxLabel.click()
    await expect(firstTaskCheckbox).not.toBeChecked()
    await expect(firstTaskTitleElem).toHaveClass('task-item-info__title')

    await checkNumberOfCompletedTasksInStorage(page, 0)
  })

  test("should allow me to show a task's details", async ({ page }) => {
    const tasksListItems = await page.locator('.main__tasks-items > ul > li')

    // First task
    const firstTaskElem = await tasksListItems.first()
    const firstTaskViewDetailsButton = await firstTaskElem.locator('.task-item__actions > button.task-item-action:first-child')
    await expect(firstTaskViewDetailsButton).toBeVisible()
    await firstTaskViewDetailsButton.click()

    const taskDetailsModal = await page.locator('.main > .main__task-dialog:last-child')
    await expect(taskDetailsModal).toHaveAttribute('open')
    await expect(taskDetailsModal).toBeVisible()

    const taskDetailsModalTitle = await taskDetailsModal.locator('.dialog__details-title')
    await expect(taskDetailsModalTitle).toBeVisible()
    const taskDetailsModalDescription = await taskDetailsModal.locator('.dialog__details-description')
    await expect(taskDetailsModalDescription).toBeVisible()

    const firstTaskDetailsModalTitleText = await taskDetailsModalTitle.textContent()
    const firstTaskDetailsModalDescriptionText = await taskDetailsModalDescription.textContent()

    const { title: firstTaskTitle, description: firstTaskDescription } = tasks[1]
    await expect(firstTaskDetailsModalTitleText).toBe(firstTaskTitle)
    await expect(firstTaskDetailsModalDescriptionText).toBe(firstTaskDescription)

    const taskDetailsModalCloseButton = await taskDetailsModal.locator('.dialog__close-button')
    await taskDetailsModalCloseButton.click()

    // Second task
    const secondTaskElem = await tasksListItems.nth(1)
    const secondTaskViewDetailsButton = await secondTaskElem.locator('.task-item__actions > button.task-item-action:first-child')
    await expect(secondTaskViewDetailsButton).toBeVisible()
    await secondTaskViewDetailsButton.click()

    await expect(taskDetailsModal).toHaveAttribute('open')
    await expect(taskDetailsModal).toBeVisible()

    await expect(taskDetailsModalTitle).toBeVisible()
    await expect(taskDetailsModalDescription).toBeVisible()

    const secondTaskDetailsModalTitleText = await taskDetailsModalTitle.textContent()
    const secondTaskDetailsModalDescriptionText = await taskDetailsModalDescription.textContent()

    const { title: secondTaskTitle, description: secondTaskDescription } = tasks[0]
    await expect(secondTaskDetailsModalTitleText).toBe(secondTaskTitle)
    await expect(secondTaskDetailsModalDescriptionText).toBe(secondTaskDescription)

    await taskDetailsModalCloseButton.click()
  })

  test('should allow me to edit a task', async ({ page }) => {
    const tasksListItems = await page.locator('.main__tasks-items > ul > li')

    // First task
    const firstTaskElem = await tasksListItems.first()
    const firstTaskEditButton = await firstTaskElem.locator('.task-item__actions > button.task-item-action:nth-child(2)')
    await expect(firstTaskEditButton).toBeVisible()
    await firstTaskEditButton.click()

    const taskEditingModal = await page.locator('.main > .main__task-dialog:nth-child(3)')
    await expect(taskEditingModal).toHaveAttribute('open')
    await expect(taskEditingModal).toBeVisible()

    const taskEditingModalMainTitleElem = await taskEditingModal.locator('.dialog__title')
    const taskEditingModalMainTitleText = await taskEditingModalMainTitleElem.textContent()
    await expect(taskEditingModalMainTitleText).toBe('Edit Task')

    const firstTaskFormFieldTitleElem = await taskEditingModal.locator('.form__field--title')
    const firstTaskFormFieldTitleValue = await firstTaskFormFieldTitleElem.inputValue()

    const firstTaskFormFieldDescriptionElem = await taskEditingModal.locator('.form__field--description')
    const firstTaskFormFieldDescriptionValue = await firstTaskFormFieldDescriptionElem.inputValue()

    const { title: firstTaskTitle, description: firstTaskDescription } = tasks[1]
    await expect(firstTaskFormFieldTitleValue).toBe(firstTaskTitle)
    await expect(firstTaskFormFieldDescriptionValue).toBe(firstTaskDescription)

    await firstTaskFormFieldTitleElem.fill('Send an email')
    await firstTaskFormFieldDescriptionElem.fill("About the project's progress")

    const taskEditingModalSaveButton = await taskEditingModal.locator('.form-action--submit-button')
    await taskEditingModalSaveButton.click()

    const firstTaskTitleElem = await firstTaskElem.locator('.task-item-info__title')
    const firstTaskTitleText = await firstTaskTitleElem.textContent()
    await expect(firstTaskTitleText).toBe('Send an email')

    const firstTaskDescriptionElem = await firstTaskElem.locator('.task-item-info__description')
    const firstTaskDescriptionText = await firstTaskDescriptionElem.textContent()
    await expect(firstTaskDescriptionText).toBe("About the project's progress")

    await checkTasksInStorage(page, 'Send an email')

    // Second task
    const secondTaskElem = await tasksListItems.nth(1)
    const secondTaskEditButton = await secondTaskElem.locator('.task-item__actions > button.task-item-action:nth-child(2)')
    await expect(secondTaskEditButton).toBeVisible()
    await secondTaskEditButton.click()

    await expect(taskEditingModal).toHaveAttribute('open')
    await expect(taskEditingModal).toBeVisible()

    const secondTaskFormFieldTitleElem = await taskEditingModal.locator('.form__field--title')
    const secondTaskFormFieldTitleValue = await secondTaskFormFieldTitleElem.inputValue()

    const secondTaskFormFieldDescriptionElem = await taskEditingModal.locator('.form__field--description')
    const secondTaskFormFieldDescriptionValue = await secondTaskFormFieldDescriptionElem.inputValue()

    const { title: secondTaskTitle, description: secondTaskDescription } = tasks[0]
    await expect(secondTaskFormFieldTitleValue).toBe(secondTaskTitle)
    await expect(secondTaskFormFieldDescriptionValue).toBe(secondTaskDescription)

    await secondTaskFormFieldTitleElem.fill('Call to the client')
    await secondTaskFormFieldDescriptionElem.fill('To confirm the meeting')

    await taskEditingModalSaveButton.click()

    const secondTaskTitleElem = await secondTaskElem.locator('.task-item-info__title')
    const secondTaskTitleText = await secondTaskTitleElem.textContent()
    await expect(secondTaskTitleText).toBe('Call to the client')

    const secondTaskDescriptionElem = await secondTaskElem.locator('.task-item-info__description')
    const secondTaskDescriptionText = await secondTaskDescriptionElem.textContent()
    await expect(secondTaskDescriptionText).toBe('To confirm the meeting')

    await checkTasksInStorage(page, 'Call to the client')
  })

  test('should allow me to delete a task', async ({ page }) => {
    const tasksListItems = await page.locator('.main__tasks-items > ul > li')

    // First task
    const firstTaskElem = await tasksListItems.first()
    const firstTaskDeleteButton = firstTaskElem.locator('.task-item__actions > button.task-item-action:last-child')
    await expect(firstTaskDeleteButton).toBeVisible()
    await firstTaskDeleteButton.click()

    await expect(tasksListItems).toHaveCount(1)
    await checkNumberOfTasksInStorage(page, 1)

    // Second task
    const secondTaskElem = await tasksListItems.first()
    const secondTaskDeleteButton = secondTaskElem.locator('.task-item__actions > button.task-item-action:last-child')
    await expect(secondTaskDeleteButton).toBeVisible()
    await secondTaskDeleteButton.click()

    await expect(tasksListItems).toHaveCount(0)
    await checkNumberOfTasksInStorage(page, 0)
  })
})

test.describe('Number of current tasks', () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTasks(page)
  })

  test('should display the current number of tasks', async ({ page }) => {
    const currentTasksElem = await page.locator('.main__add-task-button-wrapper > .current-tasks')
    await expect(currentTasksElem).toBeVisible()
    await expect(currentTasksElem).toHaveText('2 Tasks')

    const tasksListItems = await page.locator('.main__tasks-items > ul > li')
    const firstTaskElem = await tasksListItems.first()
    const firstTaskDeleteButton = await firstTaskElem.locator('.task-item__actions > button.task-item-action:last-child')
    await firstTaskDeleteButton.click()

    await expect(currentTasksElem).toHaveText('1 Task')
  })
})

const createDefaultTasks = async (page) => {
  for (const task of tasks) {
    const addTaskButton = await page.locator('.add-task-button')
    await addTaskButton.click()

    const { title, description } = task

    const formFieldTitleElem = await page.locator('.main__task-dialog .form__field--title')
    await formFieldTitleElem.fill(title)

    const formFieldDescriptionElem = await page.locator('.main__task-dialog .form__field--description')
    await formFieldDescriptionElem.fill(description)

    const modalAddTaskButton = await page.locator('.main__task-dialog .form-action--submit-button')
    await modalAddTaskButton.click()
  }
}

const checkNumberOfTasksInStorage = async (page, expectedTasksNumber) => {
  // Get the tasks from the storage
  const storageTasks = await page.evaluate(storageGetTasks)
  await expect(storageTasks?.length).toBe(expectedTasksNumber)
}

const checkNumberOfCompletedTasksInStorage = async (page, expectedCompletedTasksNumber) => {
  const storageTasks = await page.evaluate(storageGetTasks)
  const completedTasks = storageTasks?.filter((task) => task.isCompleted)
  await expect(completedTasks.length).toBe(expectedCompletedTasksNumber)
}

const checkTasksInStorage = async (page, title) => {
  const storageTasks = await page.evaluate(storageGetTasks)
  const task = storageTasks?.find((task) => task.title === title)

  await expect(task).toBeTruthy()
}
