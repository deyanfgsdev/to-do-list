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

    const tasksListItems = await page.locator('.main__tasks-items > ul > li')
    await expect(tasksListItems).toHaveCount(tasks.length)

    // Get the tasks from the storage
    const storageTasks = await page.evaluate(storageGetTasks)

    console.log('storageTasks', storageTasks)
    await expect(storageTasks?.length).toBe(tasks.length)
  })
})
