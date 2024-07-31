<script lang="ts" setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableEmpty
} from '@/components/ui/table'
import { PlusCircle } from 'lucide-vue-next'
import { tasks } from './tasks/data'
</script>

<template>
  <TableEmpty
    v-if="tasks.length === 0"
    class="w-screen bg-[#FAFAFA] border border-[#D6D6D6] rounded-xl"
  >
    <div class="grid place-items-center">
      <PlusCircle class="size-16 text-[#B8B8B8]" />

      <p class="mt-4 text-[#1F1F1F] font-normal text-sm">Aún no hay tareas</p>
      <p class="text-[#10B09C] underline hover:cursor-pointer">Crea una nueva tarea</p>
    </div>
  </TableEmpty>

  <Table class="overflow-hidden">
    <TableHeader>
      <TableRow>
        <TableHead> ID </TableHead>
        <TableHead> Tarea </TableHead>
        <TableHead> Responsable </TableHead>
        <TableHead> Categoría </TableHead>
        <TableHead> Nivel de prioridad </TableHead>
        <TableHead> Fecha de entrega </TableHead>
        <TableHead> Estado </TableHead>
        <TableHead> Acciones </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="task in tasks" :key="task.id">
        <TableCell class="font-medium">
          {{ task.id }}
        </TableCell>
        <TableCell class="font-medium">
          {{ task.title }}
        </TableCell>
        <TableCell>{{ task.assignee.name }}</TableCell>
        <TableCell>{{ task.category.name }}</TableCell>
        <TableCell>
          {{ task.priority.name }}
        </TableCell>
        <TableCell>
          {{ task.delivery_date.toLocaleDateString('es-MX') }}
        </TableCell>
        <TableCell>
          {{ task.status.name }}
        </TableCell>
        <TableCell> </TableCell>
      </TableRow>
    </TableBody>
    <!-- <TableFooter>
        <TableRow>
          <TableHead class="w-[100px]"> Invoice </TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead class="text-right"> Amount </TableHead>
        </TableRow>
      </TableFooter> -->
  </Table>
</template>

<style scoped></style>
