<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useRouter } from 'vue-router'
import { useToast } from '@/components/ui/toast'
import { client } from '@/lib/utils'

const router = useRouter()
const { toast } = useToast()

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({
        required_error: 'Ingresa un correo electrónico',
        invalid_type_error: 'Ingresa un correo electrónico valido'
      })
      .email('Ingresa un correo electrónico valido'),
    password: z
      .string({
        required_error: 'Ingresa una contraseña',
        invalid_type_error: 'Ingresa una contraseña valida'
      })
      .min(6, 'Ingresa una contraseña de al menos 6 caracteres')
  })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  const response = await client({
    url: '/auth/login',
    method: 'POST',
    data: values
  })

  if (response.status === 201) {
    toast({
      title: 'Sesión iniciada',
      description: 'Será redirigido al inicio',
      variant: 'default',
      class: 'bg-green-600 text-white',
      duration: 3000
    })

    localStorage.setItem('access-token', response.data.access_token)

    setTimeout(() => {
      router.push({ name: 'dashboard' })
    }, 3000)
  }
})
</script>

<template>
  <div class="container">
    <div class="sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <div class="sm:mx-auto sm:w-full sm:max-w-md mb-4">
          <img
            class="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Task Manager Logo"
          />
          <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Inicia sesión
          </h2>
        </div>
        <form class="space-y-4" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>

              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>

              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full"> Iniciar sesión </Button>

          <Button as-child class="w-full" variant="outline">
            <RouterLink to="/signup">Crear cuenta</RouterLink>
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
