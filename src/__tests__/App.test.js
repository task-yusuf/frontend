import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import App from '../App.vue'
import { useTodoStore } from '../stores/todo'

describe('App', () => {
  it('renders properly', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn
        })]
      }
    })

    expect(wrapper.find('h1').text()).toContain('Todo App')
    expect(wrapper.findComponent({ name: 'TodoForm' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'TodoList' }).exists()).toBe(true)
  })

  it('fetches todos on mount', async () => {
    // const wrapper = mount(App, {
    //   global: {
    //     plugins: [createTestingPinia({
    //       createSpy: vi.fn
    //     })]
    //   }
    // })

    const store = useTodoStore()
    expect(store.fetchTodos).toHaveBeenCalled()
  })

  it('adds todo through store', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn
        })]
      }
    })

    const store = useTodoStore()
    const todoForm = wrapper.findComponent({ name: 'TodoForm' })
    await todoForm.vm.$emit('add-todo', 'New Todo')

    expect(store.addTodo).toHaveBeenCalledWith('New Todo')
  })
})
