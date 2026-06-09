import { useQuery } from '@tanstack/react-query'
import { auditApi } from '@/lib/audit.api'

export const auditKeys = {
  all: ['audit'] as const,
  list: (params?: object) => [...auditKeys.all, 'list', params] as const,
}

export function useAuditLogs(params?: {
  page?: number
  limit?: number
  action?: string
  entity?: string
  from?: string
  to?: string
}) {
  return useQuery({
    queryKey: auditKeys.list(params),
    queryFn: () => auditApi.getLogs(params),
  })
}
