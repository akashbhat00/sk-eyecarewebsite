import { useCallback, useState } from 'react'
import { ERROR_CODES, toAppError } from '../../shared/errors/app-error'
import { formatDate, formatPhone } from '../../utils/format.util'
import { buildWhatsAppLink } from '../../utils/whatsapp.util'
import { useServices } from './useServices'

export const SUBMIT_STATUS = { IDLE: 'idle', SUBMITTING: 'submitting', SUCCESS: 'success', ERROR: 'error' }

export const SUBMIT_CHANNEL = { SAVED: 'saved', WHATSAPP: 'whatsapp' }

export function buildBookingMessage(booking) {
  return [
    'Hi SK Eye Care, I would like to book an appointment.',
    `Name: ${booking.name}`,
    `Phone: ${formatPhone(booking.phone)}`,
    `Service: ${booking.service}`,
    `Date: ${formatDate(booking.preferredDate)}`,
    booking.preferredTime && `Time: ${booking.preferredTime}`,
    booking.message && `Note: ${booking.message}`,
  ]
    .filter(Boolean)
    .join('\n')
}

/**
 * Submits a booking. With a backend it is saved; without one (no keys yet) the validated
 * booking is handed off to WhatsApp so the form still works.
 */
export function useSubmitInquiry() {
  const { inquiryService, isBackendConfigured } = useServices()
  const [status, setStatus] = useState(SUBMIT_STATUS.IDLE)
  const [fieldErrors, setFieldErrors] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [lastBooking, setLastBooking] = useState(null)

  const channel = isBackendConfigured ? SUBMIT_CHANNEL.SAVED : SUBMIT_CHANNEL.WHATSAPP

  const submit = useCallback(
    async (input) => {
      setErrorMessage(null)
      const result = inquiryService.validate(input)
      if (!result.success) {
        setFieldErrors(result.fieldErrors)
        return false
      }
      setFieldErrors({})
      setLastBooking(result.data)

      if (!isBackendConfigured) {
        // Must stay synchronous with the click so the browser doesn't block the new tab.
        window.open(buildWhatsAppLink(buildBookingMessage(result.data)), '_blank', 'noopener')
        setStatus(SUBMIT_STATUS.SUCCESS)
        return true
      }

      setStatus(SUBMIT_STATUS.SUBMITTING)
      try {
        await inquiryService.submitInquiry(input)
        setStatus(SUBMIT_STATUS.SUCCESS)
        return true
      } catch (error) {
        const appError = toAppError(error)
        if (appError.code === ERROR_CODES.VALIDATION && appError.fieldErrors) {
          setFieldErrors(appError.fieldErrors)
          setStatus(SUBMIT_STATUS.IDLE)
        } else {
          setErrorMessage(appError.message)
          setStatus(SUBMIT_STATUS.ERROR)
        }
        return false
      }
    },
    [inquiryService, isBackendConfigured],
  )

  const clearFieldError = useCallback((field) => {
    setFieldErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setStatus(SUBMIT_STATUS.IDLE)
    setFieldErrors({})
    setErrorMessage(null)
  }, [])

  return { submit, status, channel, fieldErrors, errorMessage, lastBooking, clearFieldError, reset }
}
