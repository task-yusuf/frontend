import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoForm from '../components/TodoForm.vue'

describe('TodoForm', () => {
  it('renders properly', () => {
    const wrapper = mount(TodoForm)
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('emits add-todo event with input value', async () => {
    const wrapper = mount(TodoForm)
    const input = wrapper.find('input')
    const form = wrapper.find('form')

    await input.setValue('New Todo')
    await form.trigger('submit')

    expect(wrapper.emitted('add-todo')).toBeTruthy()
    expect(wrapper.emitted('add-todo')[0]).toEqual(['New Todo'])
  })

  it('clears input after submission', async () => {
    const wrapper = mount(TodoForm)
    const input = wrapper.find('input')
    const form = wrapper.find('form')

    await input.setValue('New Todo')
    await form.trigger('submit')

    expect(input.element.value).toBe('')
  })

  it('does not emit if input is empty', async () => {
    const wrapper = mount(TodoForm)
    const form = wrapper.find('form')

    await form.trigger('submit')

    expect(wrapper.emitted('add-todo')).toBeFalsy()
  })
})
