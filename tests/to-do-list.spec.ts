import { test, expect, Page } from '@playwright/test';

import { storageGetTasks } from '../src/storage';

const PROD_URL = 'https://to-do-list-nu-nine-31.vercel.app/';

const tasks = [
  {
    title: 'Go to the supermarket',
    description: 'Buy milk and eggs',
  },
  {
    title: 'Go to the post office',
    description: 'Package for John',
  },
];

test.beforeEach(async ({ page }) => {
  await page.goto(PROD_URL);
});

test.describe('No tasks', () => {
  test('should show a message when there are no tasks', async ({ page }) => {
    const messageElem = page.locator('.main__no-tasks-info');
    const messageText = await messageElem.textContent();

    await expect(messageElem).toBeVisible();
    expect(messageText).toContain('There are no tasks');
  });
});

test.describe('New task', () => {
  test("should show a required message when a task's title is empty", async ({
    page,
  }) => {
    const addTaskButton = page.locator('.add-task-button');
    await addTaskButton.click();

    const modalAddTaskButton = page.locator(
      '.main__task-dialog .form-action--submit-button'
    );
    await modalAddTaskButton.click();

    const formFieldTitleElem = page.locator(
      '.main__task-dialog .form__field--title'
    );
    const formFieldTitleValue = await formFieldTitleElem.inputValue();

    if (!formFieldTitleValue) {
      const titleErrorElem = page.locator('.form__title-error');
      await expect(titleErrorElem).toBeVisible();
    }
  });

  test('should allow me to add to do list tasks', async ({ page }) => {
    await createDefaultTasks(page);

    const tasksListItems = page.locator('.main__tasks-items > ul > li');

    await expect(tasksListItems).toHaveCount(tasks.length);
    await checkNumberOfTasksInStorage(page, 2);
  });

  test('should append new items to the top of the list', async ({ page }) => {
    await createDefaultTasks(page);

    const currentTasksElem = page.locator(
      '.main__add-task-button-wrapper > .current-tasks'
    );
    await expect(currentTasksElem).toHaveText('2 Tasks');
  });

  test('the task form modal should not be displayed when we add tasks', async ({
    page,
  }) => {
    await createDefaultTasks(page);

    const modalElems = page.locator('.main > .main__task-dialog');
    const formModalElem = modalElems.first();
    const formModalElemOpen = await formModalElem.getAttribute('open');
    expect(formModalElemOpen).toBeNull();
  });
});

test.describe('Task Item', () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTasks(page);
  });

  test('should allow me to mark a task item as complete', async ({ page }) => {
    const tasksListItems = page.locator('.main__tasks-items > ul > li');

    // First task
    const firstTaskElem = tasksListItems.first();
    const firstTaskCheckboxLabel = firstTaskElem.locator(
      '.checkbox-wrapper__label'
    );
    await firstTaskCheckboxLabel.click();

    const firstTaskCheckbox = firstTaskElem.locator(
      '.checkbox-wrapper__checkbox'
    );
    await expect(firstTaskCheckbox).toBeChecked();

    const firstTaskTitleElem = firstTaskElem.locator('.task-item-info__title');
    await expect(firstTaskTitleElem).toHaveClass(
      'task-item-info__title task-item-info__title--completed-task'
    );

    // Second task
    const secondTaskElem = tasksListItems.nth(1);
    const secondTaskCheckboxLabel = secondTaskElem.locator(
      '.checkbox-wrapper__label'
    );
    await secondTaskCheckboxLabel.click();

    const secondTaskCheckbox = secondTaskElem.locator(
      '.checkbox-wrapper__checkbox'
    );
    await expect(secondTaskCheckbox).toBeChecked();

    const secondTaskTitleElem = secondTaskElem.locator(
      '.task-item-info__title'
    );
    await expect(secondTaskTitleElem).toHaveClass(
      'task-item-info__title task-item-info__title--completed-task'
    );

    await checkNumberOfCompletedTasksInStorage(page, 2);
  });

  test('should allow me to un-mark a done task item', async ({ page }) => {
    const tasksListItems = page.locator('.main__tasks-items > ul > li');

    const firstTaskElem = tasksListItems.first();
    const firstTaskCheckboxLabel = firstTaskElem.locator(
      '.checkbox-wrapper__label'
    );
    await firstTaskCheckboxLabel.click();

    const firstTaskCheckbox = firstTaskElem.locator(
      '.checkbox-wrapper__checkbox'
    );
    await expect(firstTaskCheckbox).toBeChecked();

    const firstTaskTitleElem = firstTaskElem.locator('.task-item-info__title');
    await expect(firstTaskTitleElem).toHaveClass(
      'task-item-info__title task-item-info__title--completed-task'
    );

    await checkNumberOfCompletedTasksInStorage(page, 1);

    await firstTaskCheckboxLabel.click();
    await expect(firstTaskCheckbox).not.toBeChecked();
    await expect(firstTaskTitleElem).toHaveClass('task-item-info__title');

    await checkNumberOfCompletedTasksInStorage(page, 0);
  });

  test("should allow me to show a task's details", async ({ page }) => {
    const tasksListItems = page.locator('.main__tasks-items > ul > li');

    // First task
    const firstTaskElem = tasksListItems.first();
    const firstTaskViewDetailsButton = firstTaskElem.locator(
      '.task-item__actions > button.task-item-action:first-child'
    );
    await expect(firstTaskViewDetailsButton).toBeVisible();
    await firstTaskViewDetailsButton.click();

    const taskDetailsModal = page.locator(
      '.main > .main__task-dialog:last-child'
    );
    await expect(taskDetailsModal).toHaveAttribute('open');
    await expect(taskDetailsModal).toBeVisible();

    const taskDetailsModalTitle = taskDetailsModal.locator(
      '.dialog__details-title'
    );
    await expect(taskDetailsModalTitle).toBeVisible();
    const taskDetailsModalDescription = taskDetailsModal.locator(
      '.dialog__details-description'
    );
    await expect(taskDetailsModalDescription).toBeVisible();

    const firstTaskDetailsModalTitleText =
      await taskDetailsModalTitle.textContent();
    const firstTaskDetailsModalDescriptionText =
      await taskDetailsModalDescription.textContent();

    const { title: firstTaskTitle, description: firstTaskDescription } =
      tasks[1];
    expect(firstTaskDetailsModalTitleText).toBe(firstTaskTitle);
    expect(firstTaskDetailsModalDescriptionText).toBe(firstTaskDescription);

    const taskDetailsModalCloseButton = taskDetailsModal.locator(
      '.dialog__close-button'
    );
    await taskDetailsModalCloseButton.click();

    // Second task
    const secondTaskElem = tasksListItems.nth(1);
    const secondTaskViewDetailsButton = secondTaskElem.locator(
      '.task-item__actions > button.task-item-action:first-child'
    );
    await expect(secondTaskViewDetailsButton).toBeVisible();
    await secondTaskViewDetailsButton.click();

    await expect(taskDetailsModal).toHaveAttribute('open');
    await expect(taskDetailsModal).toBeVisible();

    await expect(taskDetailsModalTitle).toBeVisible();
    await expect(taskDetailsModalDescription).toBeVisible();

    const secondTaskDetailsModalTitleText =
      await taskDetailsModalTitle.textContent();
    const secondTaskDetailsModalDescriptionText =
      await taskDetailsModalDescription.textContent();

    const { title: secondTaskTitle, description: secondTaskDescription } =
      tasks[0];
    expect(secondTaskDetailsModalTitleText).toBe(secondTaskTitle);
    expect(secondTaskDetailsModalDescriptionText).toBe(secondTaskDescription);

    await taskDetailsModalCloseButton.click();
  });

  test('should allow me to edit a task', async ({ page }) => {
    const tasksListItems = page.locator('.main__tasks-items > ul > li');

    // First task
    const firstTaskElem = tasksListItems.first();
    const firstTaskEditButton = firstTaskElem.locator(
      '.task-item__actions > button.task-item-action:nth-child(2)'
    );
    await expect(firstTaskEditButton).toBeVisible();
    await firstTaskEditButton.click();

    const taskEditingModal = page.locator(
      '.main > .main__task-dialog:nth-child(3)'
    );
    await expect(taskEditingModal).toHaveAttribute('open');
    await expect(taskEditingModal).toBeVisible();

    const taskEditingModalMainTitleElem =
      taskEditingModal.locator('.dialog__title');
    const taskEditingModalMainTitleText =
      await taskEditingModalMainTitleElem.textContent();
    expect(taskEditingModalMainTitleText).toBe('Edit Task');

    const firstTaskFormFieldTitleElem = taskEditingModal.locator(
      '.form__field--title'
    );
    const firstTaskFormFieldTitleValue =
      await firstTaskFormFieldTitleElem.inputValue();

    const firstTaskFormFieldDescriptionElem = taskEditingModal.locator(
      '.form__field--description'
    );
    const firstTaskFormFieldDescriptionValue =
      await firstTaskFormFieldDescriptionElem.inputValue();

    const { title: firstTaskTitle, description: firstTaskDescription } =
      tasks[1];
    expect(firstTaskFormFieldTitleValue).toBe(firstTaskTitle);
    expect(firstTaskFormFieldDescriptionValue).toBe(firstTaskDescription);

    await firstTaskFormFieldTitleElem.fill('Send an email');
    await firstTaskFormFieldDescriptionElem.fill(
      "About the project's progress"
    );

    const taskEditingModalSaveButton = taskEditingModal.locator(
      '.form-action--submit-button'
    );
    await taskEditingModalSaveButton.click();

    const firstTaskTitleElem = firstTaskElem.locator('.task-item-info__title');
    const firstTaskTitleText = await firstTaskTitleElem.textContent();
    expect(firstTaskTitleText).toBe('Send an email');

    const firstTaskDescriptionElem = firstTaskElem.locator(
      '.task-item-info__description'
    );
    const firstTaskDescriptionText =
      await firstTaskDescriptionElem.textContent();
    expect(firstTaskDescriptionText).toBe("About the project's progress");

    await checkTasksInStorage(page, 'Send an email');

    // Second task
    const secondTaskElem = tasksListItems.nth(1);
    const secondTaskEditButton = secondTaskElem.locator(
      '.task-item__actions > button.task-item-action:nth-child(2)'
    );
    await expect(secondTaskEditButton).toBeVisible();
    await secondTaskEditButton.click();

    await expect(taskEditingModal).toHaveAttribute('open');
    await expect(taskEditingModal).toBeVisible();

    const secondTaskFormFieldTitleElem = taskEditingModal.locator(
      '.form__field--title'
    );
    const secondTaskFormFieldTitleValue =
      await secondTaskFormFieldTitleElem.inputValue();

    const secondTaskFormFieldDescriptionElem = taskEditingModal.locator(
      '.form__field--description'
    );
    const secondTaskFormFieldDescriptionValue =
      await secondTaskFormFieldDescriptionElem.inputValue();

    const { title: secondTaskTitle, description: secondTaskDescription } =
      tasks[0];
    expect(secondTaskFormFieldTitleValue).toBe(secondTaskTitle);
    expect(secondTaskFormFieldDescriptionValue).toBe(secondTaskDescription);

    await secondTaskFormFieldTitleElem.fill('Call to the client');
    await secondTaskFormFieldDescriptionElem.fill('To confirm the meeting');

    await taskEditingModalSaveButton.click();

    const secondTaskTitleElem = secondTaskElem.locator(
      '.task-item-info__title'
    );
    const secondTaskTitleText = await secondTaskTitleElem.textContent();
    expect(secondTaskTitleText).toBe('Call to the client');

    const secondTaskDescriptionElem = secondTaskElem.locator(
      '.task-item-info__description'
    );
    const secondTaskDescriptionText =
      await secondTaskDescriptionElem.textContent();
    expect(secondTaskDescriptionText).toBe('To confirm the meeting');

    await checkTasksInStorage(page, 'Call to the client');
  });

  test('should allow me to delete a task', async ({ page }) => {
    const tasksListItems = page.locator('.main__tasks-items > ul > li');

    // First task
    const firstTaskElem = tasksListItems.first();
    const firstTaskDeleteButton = firstTaskElem.locator(
      '.task-item__actions > button.task-item-action:last-child'
    );
    await expect(firstTaskDeleteButton).toBeVisible();
    await firstTaskDeleteButton.click();

    await expect(tasksListItems).toHaveCount(1);
    await checkNumberOfTasksInStorage(page, 1);

    // Second task
    const secondTaskElem = tasksListItems.first();
    const secondTaskDeleteButton = secondTaskElem.locator(
      '.task-item__actions > button.task-item-action:last-child'
    );
    await expect(secondTaskDeleteButton).toBeVisible();
    await secondTaskDeleteButton.click();

    await expect(tasksListItems).toHaveCount(0);
    await checkNumberOfTasksInStorage(page, 0);
  });
});

test.describe('Number of current tasks', () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTasks(page);
  });

  test('should display the current number of tasks', async ({ page }) => {
    const currentTasksElem = page.locator(
      '.main__add-task-button-wrapper > .current-tasks'
    );
    await expect(currentTasksElem).toBeVisible();
    await expect(currentTasksElem).toHaveText('2 Tasks');

    const tasksListItems = page.locator('.main__tasks-items > ul > li');
    const firstTaskElem = tasksListItems.first();
    const firstTaskDeleteButton = firstTaskElem.locator(
      '.task-item__actions > button.task-item-action:last-child'
    );
    await firstTaskDeleteButton.click();

    await expect(currentTasksElem).toHaveText('1 Task');
  });
});

test.describe('Browser data persistence', () => {
  test('should persist the tasks data', async ({ page }) => {
    await createDefaultTasks(page);

    const tasksListItems = page.locator('.main__tasks-items > ul > li');
    await expect(tasksListItems).toHaveCount(tasks.length);

    const firstTaskElem = tasksListItems.first();
    const firstTaskCheckboxLabel = firstTaskElem.locator(
      '.checkbox-wrapper__label'
    );
    await firstTaskCheckboxLabel.click();
    const firstTaskCheckbox = firstTaskElem.locator(
      '.checkbox-wrapper__checkbox'
    );
    await expect(firstTaskCheckbox).toBeChecked();
    const firstTaskTitleElem = firstTaskElem.locator('.task-item-info__title');
    await expect(firstTaskTitleElem).toHaveClass(
      'task-item-info__title task-item-info__title--completed-task'
    );

    const secondTaskElem = tasksListItems.nth(1);
    const secondTaskCheckbox = secondTaskElem.locator(
      '.checkbox-wrapper__checkbox'
    );
    await expect(secondTaskCheckbox).not.toBeChecked();
    const secondTaskTitleElem = secondTaskElem.locator(
      '.task-item-info__title'
    );
    await expect(secondTaskTitleElem).toHaveClass('task-item-info__title');

    await checkNumberOfCompletedTasksInStorage(page, 1);

    // Reload the page
    await page.reload();
    await expect(tasksListItems).toHaveCount(tasks.length);
    await expect(firstTaskCheckbox).toBeChecked();
    await expect(firstTaskTitleElem).toHaveClass(
      'task-item-info__title task-item-info__title--completed-task'
    );

    await expect(secondTaskCheckbox).not.toBeChecked();
    await expect(secondTaskTitleElem).toHaveClass('task-item-info__title');

    await checkNumberOfCompletedTasksInStorage(page, 1);
  });
});

const createDefaultTasks = async (page: Page) => {
  for (const task of tasks) {
    const addTaskButton = page.locator('.add-task-button');
    await addTaskButton.click();

    const { title, description } = task;

    const formFieldTitleElem = page.locator(
      '.main__task-dialog .form__field--title'
    );
    await formFieldTitleElem.fill(title);

    const formFieldDescriptionElem = page.locator(
      '.main__task-dialog .form__field--description'
    );
    await formFieldDescriptionElem.fill(description);

    const modalAddTaskButton = page.locator(
      '.main__task-dialog .form-action--submit-button'
    );
    await modalAddTaskButton.click();
  }
};

const checkNumberOfTasksInStorage = async (
  page: Page,
  expectedTasksNumber: number
) => {
  // Get the tasks from the storage
  const storageTasks = await page.evaluate(storageGetTasks);
  expect(storageTasks?.length).toBe(expectedTasksNumber);
};

const checkNumberOfCompletedTasksInStorage = async (
  page: Page,
  expectedCompletedTasksNumber: number
) => {
  const storageTasks = await page.evaluate(storageGetTasks);
  const completedTasks = storageTasks?.filter((task) => task.isCompleted);
  expect(completedTasks?.length).toBe(expectedCompletedTasksNumber);
};

const checkTasksInStorage = async (page: Page, title: string) => {
  const storageTasks = await page.evaluate(storageGetTasks);
  const task = storageTasks?.find((task) => task.title === title);

  expect(task).toBeTruthy();
};
