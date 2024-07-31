<script setup lang="ts">
import { MoreHorizontal, Pencil, Trash } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

defineProps<{
  task: {
    id: number
  }
}>()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="() => {}">
        <Pencil class="w-4 h-4 mr-2 text-green-500" /> Editar tarea
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Trash class="w-4 h-4 mr-2 text-red-500" /> Eliminar tarea
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
