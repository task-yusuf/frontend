<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">
      Todo App
    </h1>
    <div class="max-w-md mx-auto">
      <TodoForm @add-todo="addTodo" />
      <TodoList 
        :todos="todos" 
        @toggle-todo="toggleTodo"
        @delete-todo="deleteTodo"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import { useTodoStore } from './stores/todo'

const todoStore = useTodoStore()
const todos = ref([])

onMounted(async () => {
  await todoStore.fetchTodos()
  todos.value = todoStore.todos
})

const addTodo = async (title) => {
  await todoStore.addTodo(title)
  todos.value = todoStore.todos
}

const toggleTodo = async (id) => {
  await todoStore.toggleTodo(id)
  todos.value = todoStore.todos
}

const deleteTodo = async (id) => {
  await todoStore.deleteTodo(id)
  todos.value = todoStore.todos
}
</script>
