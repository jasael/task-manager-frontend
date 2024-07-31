<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
</script>

<template>
  <header class="header">
    <div>
      <h1>Gestion de tareas diarias</h1>
      <p>Crea, revisa y gestiona tus tareas diarias de manera eficiente</p>
    </div>

    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar class="avatar">
          <AvatarFallback class="avatar-fallback">GD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
</template>

<style scoped>
.header {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;

  h1 {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
    color: #1f1f1f;
  }

  p {
    font-size: 14px;
    line-height: 22px;
    color: #1f1f1f;
    font-weight: normal;
  }

  .avatar {
    background-color: #d0f5f0;

    .avatar-fallback {
      font-family: Poppins, sans-serif;
      color: #065c51;
      font-weight: 600;
    }
  }
}
</style>
