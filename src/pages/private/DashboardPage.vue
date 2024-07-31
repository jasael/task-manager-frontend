<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'
import LayoutHeader from '@/components/LayoutHeader.vue'
import TaskTable from '@/components/TaskTable.vue'
import CreateTask from '@/components/CreateTask.vue'

import { onMounted, ref } from 'vue'
import { columns } from '@/components/tasks/columns'
import type { TASK } from '@/components/tasks/interfaces'
import DataTable from '@/components/tasks/data-table.vue'
import { client } from '@/lib/utils'

const data = ref<TASK[]>([])

async function getData(): Promise<TASK[]> {
  return await client({
    url: '/tasks',
    method: 'GET'
  }).then((response) => response.data)
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <LayoutHeader />

  <main class="main">
    <header class="mb-4">
      <h2>Lista de tareas (<span>5</span>)</h2>

      <div>
        <!-- Search -->
        <div class="relative w-full max-w-sm items-center">
          <Input id="search" type="text" placeholder="Buscar" class="pl-8" />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Search class="size-4 text-muted-foreground" />
          </span>
        </div>

        <!-- Button -->
        <CreateTask />
      </div>
    </header>

    <!-- <TaskTable /> -->
    <DataTable :columns="columns" :data="data"></DataTable>
  </main>
</template>

<style scoped>
.main {
  margin-top: 16px;
  height: 100vh - 140px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      font-weight: bold;
      color: #1f1f1f;
      line-height: 28px;

      span {
        color: #0b8778;
      }
    }

    div {
      display: flex;
      align-items: center;
      gap: 16px;

      #search {
        border: 1px solid #b8b8b8;
        background-color: #fafafa;
        border-radius: 8px;
      }
    }
  }
}
</style>
