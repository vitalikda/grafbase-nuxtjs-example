<script setup lang="ts">
import { TodoListFragment, useTodoListDeleteMutation, useTodoListUpdateMutation } from '@/graphql/schema'
interface Props {
  list: TodoListFragment
}

const { list } = defineProps<Props>()
const { id, todos } = list
const title = ref(list.title)
const inputRef = ref<HTMLElement>()

const todoListUpdate = useTodoListUpdateMutation()
const { executeMutation: todoListDelete, fetching: isDeleting } = useTodoListDeleteMutation()

watch(title, (newValue) => {
  if (!newValue || newValue === list.title) return
  todoListUpdate.executeMutation({ id, title: newValue })
})

const handleTodoListDelete = () => {
  todoListDelete({ id }, { additionalTypenames: ['TodoList', 'Todo'] })
}
</script>

<template>
  <div class="space-y-4 flex-1 min-w-[300px]">
    <div :title="title" :style="{ borderColor: getColor(id) }" class="flex justify-between border-b-2">
      <h2 class="text-xl font-bold truncate">
        <input
          ref="inputRef"
          v-model.trim.lazy="title"
          class="bg-transparent focus:outline-0 focus:text-blue-600 focus:dark:text-blue-400"
        />
      </h2>
      <div class="relative z-20">
        <Spinner v-if="isDeleting" />
        <Dropdown v-else>
          <template #trigger>
            <IconHeroiconsOutlineDotsVertical class="w-5 h-5 text-gray-400 transition hover:text-red-400" />
          </template>
          <DropdownItem @click="() => nextTick(() => inputRef?.focus())">
            <IconHeroiconsOutlinePencil class="w-5 h-5 mr-3" aria-hidden="true" />
            Rename
          </DropdownItem>
          <DropdownItem @click="handleTodoListDelete">
            <IconHeroiconsOutlineTrash class="w-5 h-5 mr-3" aria-hidden="true" />
            Delete
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
    <div v-if="todos" class="space-y-4">
      <div v-for="todo in todos" :key="todo?.id">
        <TodoItem v-if="todo" :todo="todo" />
      </div>
    </div>
    <TodoItemCreate :todoListId="id" />
  </div>
</template>
