import api from '@/lib/api'

export interface AuditLog {
  id: number
  userId: number | null
  user: { id: number; name: string; email: string; role: string } | null
  action: string
  entity: string
  entityId: number | null
  detail: string | null
  createdAt: string
}

export interface AuditLogsResponse {
  logs: AuditLog[]
  total: number
  page: number
  limit: number
}

export const auditApi = {
  getLogs: (params?: {
    page?: number
    limit?: number
    action?: string
    entity?: string
    from?: string
    to?: string
  }) => api.get<AuditLogsResponse>('/audit', { params }).then((r) => r.data),
}
