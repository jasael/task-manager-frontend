<script setup lang="ts">
import { PlusCircle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { onMounted, ref } from 'vue'
import { DateFormatter, type DateValue, getLocalTimeZone, today } from '@internationalized/date'

import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { PRIORITIES } from '@/lib/catalog'
import { getCategories, getPriorities, getUsers } from '@/lib/data'

const df = new DateFormatter('es-MX', {
  dateStyle: 'long'
})

const date = ref<DateValue>()

const users = ref<any[]>([])
const categories = ref<any[]>([])
const priorities = ref<any[]>([])

onMounted(async () => {
  users.value = await getUsers()
  categories.value = await getCategories()
  priorities.value = await getPriorities()
})
</script>

<template>
  <Sheet>
    <SheetTrigger>
      <Button class="create-task">
        <PlusCircle class="size-4 mr-2" />
        Crear tarea
      </Button>
    </SheetTrigger>

    <SheetContent class="flex flex-col rounded-l-xl">
      <SheetHeader>
        <SheetTitle>Crear tarea</SheetTitle>
      </SheetHeader>
      <div class="flex flex-col gap-3">
        <div>
          <Label class="label" for="name"> Nombre tarea </Label>
          <Input class="input" id="name" placeholder="ej. Completar el tutorial" />
        </div>
        <div>
          <Label class="label" for="name"> Responsable </Label>
          <Select>
            <SelectTrigger class="input">
              <SelectValue placeholder="Seleccionar responsable" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label class="label" for="name"> Categoria </Label>
          <Select>
            <SelectTrigger class="input">
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label class="label" for="name"> Nivel de prioridad </Label>
          <Select>
            <SelectTrigger class="input">
              <SelectValue placeholder="Seleccionar nivel de prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="priority in priorities" :key="priority.id" :value="priority.id">
                {{ PRIORITIES[priority.name as keyof typeof PRIORITIES] }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label class="label" for="name"> Fecha de entrega </Label>
          <Popover>
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-full input justify-between text-left font-normal px-3',
                    !date && 'text-muted-foreground'
                  )
                "
              >
                {{
                  date ? df.format(date.toDate(getLocalTimeZone())) : 'Seleccionar fecha de entrega'
                }}
                <CalendarIcon class="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar
                v-model="date"
                initial-focus
                locale="es-MX"
                :min-value="today(getLocalTimeZone())"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <SheetFooter>
        <SheetClose as-child>
          <Button type="submit" class="w-full save-task"> Guardar tarea </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>

<style scoped>
.label {
  font-weight: 600;
  color: #5e5e5e;
  line-height: 22px;
  font-size: 10px;
}

.input {
  border: 1px solid #b8b8b8;
  background-color: #fafafa;
  border-radius: 8px;
  color: #5e5e5e;
  font-size: 14px;
}

.create-task,
.save-task {
  border-radius: 21px;
  background-color: #007174;
  font-size: 14px;
  line-height: 22px;
  color: #ffffff;
  font-weight: 600;

  &:hover {
    background-color: #065c51;
  }
}

.save-task {
  font-size: 12px;
}
</style>
