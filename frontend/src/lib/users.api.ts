import api from '@/lib/api'

export interface User {
  id: number
  email: string
  name: string
  role: 'ADMIN' | 'DOCTOR' | 'RECEPCION'
  isActive: boolean
  createdAt: string
}

export interface CreateUserData {
  name: string
  email: string
  password: string
  role: 'ADMIN' | 'DOCTOR' | 'RECEPCION'
}

export interface UpdateUserData {
  name?: string
  email?: string
  role?: 'ADMIN' | 'DOCTOR' | 'RECEPCION'
  password?: string
  isActive?: boolean
}

export interface UserStats {
  ADMIN: number
  DOCTOR: number
  RECEPCION: number
}

export const usersApi = {
  getAll: () => api.get<User[]>('/users').then((r) => r.data),
  getOne: (id: number) => api.get<User>(`/users/${id}`).then((r) => r.data),
  create: (data: CreateUserData) => api.post<User>('/users', data).then((r) => r.data),
  update: (id: number, data: UpdateUserData) =>
    api.patch<User>(`/users/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete(`/users/${id}`).then((r) => r.data),
  getStats: () => api.get<UserStats>('/users/stats').then((r) => r.data),
}
