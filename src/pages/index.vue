<script setup lang="ts">
import { useTodoListsQuery } from '@/graphql/schema'

const { data, fetching, error } = useTodoListsQuery()
</script>

<template>
  <div v-if="fetching">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else class="flex gap-6">
    <div v-if="data" v-for="list in data.todoListCollection?.edges?.reverse()">
      <TodoList v-if="list?.node" :key="list.node.id" :list="list.node" />
    </div>
    <TodoListCreate />
  </div>
</template>
