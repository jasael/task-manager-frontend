import { client } from './utils'

export async function getUsers() {
  const response = await client({
    url: '/users',
    method: 'GET'
  })

  return response.data
}

export async function getCategories() {
  const response = await client({
    url: '/categories',
    method: 'GET'
  })

  return response.data
}
export async function getPriorities() {
  const response = await client({
    url: '/priorities',
    method: 'GET'
  })

  return response.data
}
