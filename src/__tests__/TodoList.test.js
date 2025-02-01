import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoList from '../components/TodoList.vue'

describe('TodoList', () => {
  const mockTodos = [
    { id: 1, title: 'Test Todo 1', completed: false },
    { id: 2, title: 'Test Todo 2', completed: true }
  ]

  it('renders todos properly', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos
      }
    })

    const todoItems = wrapper.findAll('[data-test="todo-item"]')
    expect(todoItems).toHaveLength(2)
  })

  it('emits toggle-todo event when checkbox is clicked', async () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos
      }
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.trigger('change')

    expect(wrapper.emitted('toggle-todo')).toBeTruthy()
    expect(wrapper.emitted('toggle-todo')[0]).toEqual([1])
  })

  it('emits delete-todo event when delete button is clicked', async () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos
      }
    })

    const deleteButton = wrapper.find('[data-test="delete-button"]')
    await deleteButton.trigger('click')

    expect(wrapper.emitted('delete-todo')).toBeTruthy()
    expect(wrapper.emitted('delete-todo')[0]).toEqual([1])
  })

  it('shows completed status correctly', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos
      }
    })

    const completedTodo = wrapper.findAll('[data-test="todo-item"]')[1]
    expect(completedTodo.classes()).toContain('completed')
  })

  it('shows empty state when no todos', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: []
      }
    })

    expect(wrapper.find('[data-test="empty-state"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('No todos yet')
  })
})
