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
  await page.exposeFunction('storageGetTasks', storageGetTasks)
  await page.goto(LOCALHOST_URL)
})

test('should show a message when there are no tasks', async ({ page }) => {
  const storageTasks = await page.evaluate(async () => {
    const tasks = await window.storageGetTasks()

    return tasks
  })

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
})
