import { createPage, setup } from '@nuxt/test-utils/e2e'
import { afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest'

type Page = Awaited<ReturnType<typeof createPage>>

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment',
] as const

let page: Page

beforeAll(async () => {
  await setup({
    browser: true,
    nuxtConfig: {
      sourcemap: false,
    },
  })
})

beforeEach(async () => {
  page = await createPage()
  await page.goto('https://demo.playwright.dev/todomvc', { waitUntil: 'domcontentloaded' })
})

describe('New Todo', async () => {
  test('should allow me to add todo items', async () => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?')

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[0])
    await newTodo.press('Enter')

    // Make sure the list only has one todo item.
    expect(await page.getByTestId('todo-title').allTextContents()).toEqual([
      TODO_ITEMS[0],
    ])

    // Create 2nd todo.
    await newTodo.fill(TODO_ITEMS[1])
    await newTodo.press('Enter')

    // Make sure the list now has two todo items.
    expect(await page.getByTestId('todo-title').allTextContents()).toEqual([
      TODO_ITEMS[0],
      TODO_ITEMS[1],
    ])

    await checkNumberOfTodosInLocalStorage(page, 2)
  })

  test('should clear text input field when an item is added', async () => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?')

    // Create one todo item.
    await newTodo.fill(TODO_ITEMS[0])
    await newTodo.press('Enter')

    // Check that input is empty.
    expect(await newTodo.textContent()).toBeFalsy()
    await checkNumberOfTodosInLocalStorage(page, 1)
  })

  test('should append new items to the bottom of the list', async () => {
    // Create 3 items.
    await createDefaultTodos(page)

    // create a todo count locator
    const todoCount = page.getByTestId('todo-count')

    // Check test using different methods.
    expect(await page.getByText('3 items left').isVisible()).toBe(true)
    expect(await todoCount.allTextContents()).toEqual(['3 items left'])
    expect(await todoCount.textContent()).toContain('3')
    expect(await todoCount.textContent()).toMatch(/3/)

    // Check all items in one call.
    expect(await page.getByTestId('todo-title').allTextContents()).toEqual(TODO_ITEMS)
    await checkNumberOfTodosInLocalStorage(page, 3)
  })
})

describe('Mark all as completed', () => {
  beforeEach(async () => {
    await createDefaultTodos(page)
    await checkNumberOfTodosInLocalStorage(page, 3)
  })

  afterEach(async () => {
    await checkNumberOfTodosInLocalStorage(page, 3)
  })

  test('should allow me to mark all items as completed', async () => {
    // Complete all todos.
    await page.getByLabel('Mark all as complete').check()

    // Ensure all todos have 'completed' class.
    expect(await page.getByTestId('todo-item')
      .evaluateAll(els => els.map(el => el.className)))
      .toEqual(['completed', 'completed', 'completed'])
    await checkNumberOfCompletedTodosInLocalStorage(page, 3)
  })

  test('should allow me to clear the complete state of all items', async () => {
    const toggleAll = page.getByLabel('Mark all as complete')
    // Check and then immediately uncheck.
    await toggleAll.check()
    await toggleAll.uncheck()

    // Should be no completed classes.
    expect(await page.getByTestId('todo-item')
      .evaluateAll(els => els.map(el => el.className)))
      .toEqual(['', '', ''])
  })

  test('complete all checkbox should update state when items are completed / cleared', async () => {
    const toggleAll = page.getByLabel('Mark all as complete')
    await toggleAll.check()
    expect(await toggleAll.isChecked()).toBe(true)
    await checkNumberOfCompletedTodosInLocalStorage(page, 3)

    // Uncheck first todo.
    const firstTodo = page.getByTestId('todo-item').nth(0)
    await firstTodo.getByRole('checkbox').uncheck()

    // Reuse toggleAll locator and make sure its not checked.
    expect(await toggleAll.isChecked()).toBe(false)

    await firstTodo.getByRole('checkbox').check()
    await checkNumberOfCompletedTodosInLocalStorage(page, 3)

    // Assert the toggle all is checked again.
    expect(await toggleAll.isChecked()).toBe(true)
  })
})

describe('Item', () => {
  test('should allow me to mark items as complete', async () => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?')

    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item)
      await newTodo.press('Enter')
    }

    // Check first item.
    const firstTodo = page.getByTestId('todo-item').nth(0)
    await firstTodo.getByRole('checkbox').check()
    expect(await firstTodo.getAttribute('class')).toContain('completed')

    // Check second item.
    const secondTodo = page.getByTestId('todo-item').nth(1)
    expect(await secondTodo.getAttribute('class')).not.toContain('completed')
    await secondTodo.getByRole('checkbox').check()

    // Assert completed class.
    expect(await firstTodo.getAttribute('class')).toContain('completed')
    expect(await secondTodo.getAttribute('class')).toContain('completed')
  })

  test('should allow me to un-mark items as complete', async () => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?')

    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item)
      await newTodo.press('Enter')
    }

    const firstTodo = page.getByTestId('todo-item').nth(0)
    const secondTodo = page.getByTestId('todo-item').nth(1)
    const firstTodoCheckbox = firstTodo.getByRole('checkbox')

    await firstTodoCheckbox.check()
    expect(await firstTodo.getAttribute('class')).toContain('completed')
    expect(await secondTodo.getAttribute('class')).not.toContain('completed')
    await checkNumberOfCompletedTodosInLocalStorage(page, 1)

    await firstTodoCheckbox.uncheck()
    expect(await firstTodo.getAttribute('class')).not.toContain('completed')
    expect(await secondTodo.getAttribute('class')).not.toContain('completed')
    await checkNumberOfCompletedTodosInLocalStorage(page, 0)
  })

  test('should allow me to edit an item', async () => {
    await createDefaultTodos(page)

    const todoItems = page.getByTestId('todo-item')
    const secondTodo = todoItems.nth(1)
    await secondTodo.dblclick()
    expect(await secondTodo.getByRole('textbox', { name: 'Edit' }).inputValue()).toEqual(TODO_ITEMS[1])
    await secondTodo.getByRole('textbox', { name: 'Edit' }).fill('buy some sausages')
    await secondTodo.getByRole('textbox', { name: 'Edit' }).press('Enter')

    // Explicitly assert the new text value.
    expect(await todoItems.allTextContents()).toEqual([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2],
    ])
    await checkTodosInLocalStorage(page, 'buy some sausages')
  })
})

describe('Editing', () => {
  beforeEach(async () => {
    await createDefaultTodos(page)
    await checkNumberOfTodosInLocalStorage(page, 3)
  })

  test('should hide other controls when editing', async () => {
    const todoItem = page.getByTestId('todo-item').nth(1)
    await todoItem.dblclick()
    expect(await todoItem.getByRole('checkbox').isVisible()).toBe(false)
    expect(await todoItem.locator('label', {
      hasText: TODO_ITEMS[1],
    }).isVisible()).toBe(false)
    await checkNumberOfTodosInLocalStorage(page, 3)
  })

  test('should save edits on blur', async () => {
    const todoItems = page.getByTestId('todo-item')
    await todoItems.nth(1).dblclick()
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('buy some sausages')
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).dispatchEvent('blur')

    expect(await todoItems.allTextContents()).toEqual([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2],
    ])
    await checkTodosInLocalStorage(page, 'buy some sausages')
  })

  test('should trim entered text', async () => {
    const todoItems = page.getByTestId('todo-item')
    await todoItems.nth(1).dblclick()
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('    buy some sausages    ')
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).press('Enter')

    expect(await todoItems.allTextContents()).toEqual([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2],
    ])
    await checkTodosInLocalStorage(page, 'buy some sausages')
  })

  test('should remove the item if an empty text string was entered', async () => {
    const todoItems = page.getByTestId('todo-item')
    await todoItems.nth(1).dblclick()
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('')
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).press('Enter')

    expect(await todoItems.allTextContents()).toEqual([
      TODO_ITEMS[0],
      TODO_ITEMS[2],
    ])
  })

  test('should cancel edits on escape', async () => {
    const todoItems = page.getByTestId('todo-item')
    await todoItems.nth(1).dblclick()
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('buy some sausages')
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).press('Escape')
    expect(await todoItems.allTextContents()).toEqual(TODO_ITEMS)
  })
})

describe('Counter', () => {
  test('should display the current number of todo items', async () => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?')

    // create a todo count locator
    const todoCount = page.getByTestId('todo-count')

    await newTodo.fill(TODO_ITEMS[0])
    await newTodo.press('Enter')

    expect(await todoCount.textContent()).toContain('1')

    await newTodo.fill(TODO_ITEMS[1])
    await newTodo.press('Enter')
    expect(await todoCount.textContent()).toContain('2')

    await checkNumberOfTodosInLocalStorage(page, 2)
  })
})

describe('Clear completed button', () => {
  beforeEach(async () => {
    await createDefaultTodos(page)
  })

  test('should display the correct text', async () => {
    await page.locator('.todo-list li .toggle').first().check()
    expect(await page.getByRole('button', { name: 'Clear completed' }).isVisible()).toBe(true)
  })

  test('should remove completed items when clicked', async () => {
    const todoItems = page.getByTestId('todo-item')
    await todoItems.nth(1).getByRole('checkbox').check()
    await page.getByRole('button', { name: 'Clear completed' }).click()
    expect(await todoItems.count()).toBe(2)
    expect(await todoItems.allTextContents()).toEqual([TODO_ITEMS[0], TODO_ITEMS[2]])
  })

  test('should be hidden when there are no items that are completed', async () => {
    await page.locator('.todo-list li .toggle').first().check()
    await page.getByRole('button', { name: 'Clear completed' }).click()
    expect(await page.getByRole('button', { name: 'Clear completed' }).isHidden()).toBe(true)
  })
})

describe('Persistence', () => {
  test('should persist its data', async () => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?')

    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item)
      await newTodo.press('Enter')
    }

    const todoItems = page.getByTestId('todo-item')
    const firstTodoCheck = todoItems.nth(0).getByRole('checkbox')
    await firstTodoCheck.check()
    expect(await todoItems.allTextContents()).toEqual([TODO_ITEMS[0], TODO_ITEMS[1]])
    expect(await firstTodoCheck.isChecked()).toBe(true)
    expect(await todoItems.evaluateAll(els => els.map(el => el.className))).toEqual(['completed', ''])

    // Ensure there is 1 completed item.
    await checkNumberOfCompletedTodosInLocalStorage(page, 1)

    // Now reload.
    await page.reload()
    expect(await todoItems.allTextContents()).toEqual([TODO_ITEMS[0], TODO_ITEMS[1]])
    expect(await firstTodoCheck.isChecked()).toBe(true)
    expect(await todoItems.evaluateAll(els => els.map(el => el.className))).toEqual(['completed', ''])
  })
})

describe('Routing', () => {
  beforeEach(async () => {
    await createDefaultTodos(page)
    // make sure the app had a chance to save updated todos in storage
    // before navigating to a new view, otherwise the items can get lost :(
    // in some frameworks like Durandal
    await checkTodosInLocalStorage(page, TODO_ITEMS[0])
  })

  test('should allow me to display active items', async () => {
    const todoItem = page.getByTestId('todo-item')
    await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check()

    await checkNumberOfCompletedTodosInLocalStorage(page, 1)
    await page.getByRole('link', { name: 'Active' }).click()
    expect(await todoItem.count()).toBe(2)
    expect(await todoItem.allTextContents()).toEqual([TODO_ITEMS[0], TODO_ITEMS[2]])
  })

  test('should respect the back button', async () => {
    const todoItem = page.getByTestId('todo-item')
    await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check()

    await checkNumberOfCompletedTodosInLocalStorage(page, 1)

    // Showing all items
    await page.getByRole('link', { name: 'All' }).click()
    expect(await todoItem.count()).toBe(3)

    // Showing active items
    await page.getByRole('link', { name: 'Active' }).click()

    // Showing completed items
    await page.getByRole('link', { name: 'Completed' }).click()

    expect(await todoItem.count()).toBe(1)
    await page.goBack()
    expect(await todoItem.count()).toBe(2)
    await page.goBack()
    expect(await todoItem.count()).toBe(3)
  })

  test('should allow me to display completed items', async () => {
    await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check()
    await checkNumberOfCompletedTodosInLocalStorage(page, 1)
    await page.getByRole('link', { name: 'Completed' }).click()
    expect(await page.getByTestId('todo-item').count()).toBe(1)
  })

  test('should allow me to display all items', async () => {
    await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check()
    await checkNumberOfCompletedTodosInLocalStorage(page, 1)
    await page.getByRole('link', { name: 'Active' }).click()
    await page.getByRole('link', { name: 'Completed' }).click()
    await page.getByRole('link', { name: 'All' }).click()
    expect(await page.getByTestId('todo-item').count()).toBe(3)
  })

  test('should highlight the currently applied filter', async () => {
    expect(await page.getByRole('link', { name: 'All' }).getAttribute('class')).toEqual('selected')

    // create locators for active and completed links
    const activeLink = page.getByRole('link', { name: 'Active' })
    const completedLink = page.getByRole('link', { name: 'Completed' })
    await activeLink.click()

    // Page change - active items.
    expect(await activeLink.getAttribute('class')).toEqual('selected')
    await completedLink.click()

    // Page change - completed items.
    expect(await completedLink.getAttribute('class')).toEqual('selected')
  })
})

async function createDefaultTodos(page: Page) {
  // create a new todo locator
  const newTodo = page.getByPlaceholder('What needs to be done?')

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item)
    await newTodo.press('Enter')
  }
}

async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction((e) => {
    return JSON.parse(localStorage['react-todos']).length === e
  }, expected)
}

async function checkNumberOfCompletedTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction((e) => {
    return JSON.parse(localStorage['react-todos']).filter((todo: any) => todo.completed).length === e
  }, expected)
}

async function checkTodosInLocalStorage(page: Page, title: string) {
  return await page.waitForFunction((t) => {
    return JSON.parse(localStorage['react-todos']).map((todo: any) => todo.title).includes(t)
  }, title)
}
