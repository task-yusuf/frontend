<template>
  <div class="space-y-2">
    <div 
      v-for="todo in todos" 
      :key="todo.id"
      :data-test="'todo-item'"
      :class="{ 'completed': todo.completed }"
      class="flex items-center gap-2 p-3 bg-white rounded shadow"
    >
      <input
        type="checkbox"
        :checked="todo.completed"
        class="h-5 w-5"
        @change="$emit('toggle-todo', todo.id)"
      >
      <span 
        :class="{ 'line-through text-gray-500': todo.completed }"
        class="flex-1"
      >
        {{ todo.title }}
      </span>
      <button
        data-test="delete-button"
        class="text-red-500 hover:text-red-600"
        @click="$emit('delete-todo', todo.id)"
      >
        Delete
      </button>
    </div>
    <p 
      v-if="!todos.length" 
      data-test="empty-state"
      class="text-center text-gray-500 py-4"
    >
      No todos yet. Add one above!
    </p>
  </div>
</template>
<script setup>
defineProps({
  todos: {
    type: Array,
    required: true
  }
})
</script>
