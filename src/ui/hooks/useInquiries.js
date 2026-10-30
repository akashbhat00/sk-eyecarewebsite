import { useCallback, useEffect, useState } from 'react'
import { toAppError } from '../../shared/errors/app-error'
import { useServices } from './useServices'

/** Loads enquiries for the admin list, with status counts and optimistic status changes. */
export function useInquiries(statusFilter) {
  const { inquiryService } = useServices()
  const [inquiries, setInquiries] = useState([])
  const [counts, setCounts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [list, statusCounts] = await Promise.all([
        inquiryService.listInquiries(statusFilter ? { status: statusFilter } : {}),
        inquiryService.getStatusCounts(),
      ])
      setInquiries(list)
      setCounts(statusCounts)
    } catch (err) {
      setError(toAppError(err).message)
    } finally {
      setIsLoading(false)
    }
  }, [inquiryService, statusFilter])

  useEffect(() => {
    load()
  }, [load])

  const changeStatus = useCallback(
    async (inquiry, nextStatus) => {
      const previous = inquiries
      setInquiries((list) =>
        list
          .map((item) => (item.id === inquiry.id ? { ...item, status: nextStatus } : item))
          .filter((item) => !statusFilter || item.status === statusFilter),
      )
      setCounts((current) =>
        current && { ...current, [inquiry.status]: current[inquiry.status] - 1, [nextStatus]: current[nextStatus] + 1 },
      )
      try {
        await inquiryService.changeStatus(inquiry, nextStatus)
        return null
      } catch (err) {
        setInquiries(previous)
        load()
        return toAppError(err).message
      }
    },
    [inquiries, inquiryService, load, statusFilter],
  )

  return { inquiries, counts, isLoading, error, reload: load, changeStatus, canTransition: inquiryService.canTransition }
}
