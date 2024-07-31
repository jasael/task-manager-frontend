import type { ColumnDef } from '@tanstack/vue-table'
import type { TASK } from './interfaces'
import { h } from 'vue'
import DropdownAction from '@/components/tasks/data-table-dropdown.vue'
import { PRIORITIES, STATE_STYLES, STATES } from '@/lib/catalog'
import { Badge } from '../ui/badge'

export const columns: ColumnDef<TASK>[] = [
  {
    accessorKey: 'id',
    header: () => h('span', { class: 'font-bold' }, 'ID'),
    cell: (info) => info.getValue()
  },
  {
    accessorKey: 'title',
    header: () => h('span', { class: 'font-bold' }, 'Tarea'),
    cell: (info) => info.getValue()
  },
  {
    accessorKey: 'user.name',
    header: () => h('span', { class: 'font-bold' }, 'Asignado'),
    cell: (info) => info.getValue()
  },
  {
    accessorKey: 'category.name',
    header: () => h('span', { class: 'font-bold' }, 'Categoría'),
    cell: (info) => info.getValue()
  },
  {
    accessorKey: 'priority.name',
    header: () => h('span', { class: 'font-bold' }, 'Prioridad'),
    cell: (info) => PRIORITIES[info.getValue() as keyof typeof PRIORITIES]
  },
  {
    accessorKey: 'delivery_date',
    header: () => h('span', { class: 'font-bold' }, 'Fecha de entrega'),
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString('es-MX')
  },
  {
    accessorKey: 'state.name',
    header: () => h('span', { class: 'font-bold' }, 'Estado'),
    cell: (info) =>
      h(
        Badge,
        { class: STATE_STYLES[info.getValue() as keyof typeof STATE_STYLES] },
        STATES[info.getValue() as keyof typeof STATES]
      )
  },
  {
    id: 'actions',
    header: () => h('span', { class: 'font-bold' }, 'Acciones'),
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original

      return h(
        'div',
        { class: 'relative' },
        h(DropdownAction, {
          task
        })
      )
    }
  }
]
