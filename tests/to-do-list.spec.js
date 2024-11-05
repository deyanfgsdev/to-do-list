// @ts-check
import { test, expect } from '@playwright/test'

import { storageGetTasks } from '../src/storage'

const LOCALHOST_URL = 'http://localhost:5173/'

test('should show a message when there are no tasks', async ({ page }) => {
  await page.exposeFunction('storageGetTasks', storageGetTasks)
  await page.goto(LOCALHOST_URL)

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
