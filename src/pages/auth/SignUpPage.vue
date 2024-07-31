<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Loader2 } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { client } from '@/lib/utils'
import { useToast } from '@/components/ui/toast/use-toast'
import { useRouter } from 'vue-router'

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
      .min(6, 'Ingresa una contraseña de al menos 6 caracteres'),
    name: z
      .string({
        required_error: 'Ingresa tu nombre',
        invalid_type_error: 'Ingresa tu nombre'
      })
      .min(1, 'Ingresa tu nombre'),
    phone: z
      .string({
        required_error: 'Ingresa un número de telefono',
        invalid_type_error: 'Ingresa un número de telefono valido'
      })
      .min(10, 'Ingresa un número de telefono valido')
  })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  const response = await client({
    url: '/auth/signup',
    method: 'POST',
    data: values
  })

  if (response.status === 201) {
    toast({
      title: 'Cuenta creada',
      description: 'Será redirigido al inicio de sesión',
      variant: 'default',
      class: 'bg-green-600 text-white',
      duration: 3000
    })

    setTimeout(() => {
      router.push({ name: 'auth.login' })
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
            Crea una nueva cuenta
          </h2>
        </div>
        <form class="space-y-4" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" placeholder="Ej. john.doe@example.com" />
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

          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Ej. John Doe" v-bind="componentField" />
              </FormControl>

              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="phone">
            <FormItem>
              <FormLabel>Número de Celular</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Ej. 123456789" v-bind="componentField" />
              </FormControl>

              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full" :disabled="form.isSubmitting.value">
            <Loader2 v-if="form.isSubmitting.value" class="w-4 h-4 mr-2 animate-spin" />

            {{ form.isSubmitting.value ? 'Creando cuenta' : 'Crear cuenta' }}
          </Button>

          <Button as-child class="w-full" variant="outline" :disabled="form.isSubmitting.value">
            <RouterLink to="/login">Iniciar sesión</RouterLink>
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
