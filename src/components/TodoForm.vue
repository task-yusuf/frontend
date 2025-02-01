<template>
  <form class="mb-6" @submit.prevent="handleSubmit">
    <div class="flex gap-2">
      <input
        v-model="title"
        type="text"
        placeholder="Add a new todo..."
        class="flex-1 p-2 border rounded"
        required
      >
      <button 
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-todo'])
const title = ref('')

const handleSubmit = () => {
  if (title.value.trim()) {
    emit('add-todo', title.value)
    title.value = ''
  }
}
</script>
