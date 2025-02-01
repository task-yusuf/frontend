import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://backend:3000/api/todos'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),
  
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get(API_URL)
        this.todos = response.data
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    },

    async addTodo(title) {
      try {
        const response = await axios.post(API_URL, {
          title,
          completed: false
        })
        this.todos.push(response.data)
      } catch (error) {
        console.error('Error adding todo:', error)
      }
    },

    async toggleTodo(id) {
      try {
        const todo = this.todos.find(t => t.id === id)
        const response = await axios.put(`${API_URL}/${id}`, {
          completed: !todo.completed
        })
        const index = this.todos.findIndex(t => t.id === id)
        this.todos[index] = response.data
      } catch (error) {
        console.error('Error toggling todo:', error)
      }
    },

    async deleteTodo(id) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        this.todos = this.todos.filter(t => t.id !== id)
      } catch (error) {
        console.error('Error deleting todo:', error)
      }
    }
  }
})
