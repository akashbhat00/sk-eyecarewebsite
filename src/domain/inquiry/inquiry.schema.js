import { z } from 'zod'
import { INQUIRY_LIMITS, INQUIRY_SERVICES, TIME_SLOTS } from './inquiry.constants'

export function todayISODate(now = new Date()) {
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
  return local.toISOString().slice(0, 10)
}

export function normalizeIndianPhone(value) {
  const digits = String(value ?? '').replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1)
  return digits
}

const emptyToNull = (value) => {
  if (typeof value !== 'string') return value ?? null
  const trimmed = value.trim()
  return trimmed === '' ? null : trimmed
}

export const createInquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(INQUIRY_LIMITS.NAME_MIN, 'Please enter your name')
    .max(INQUIRY_LIMITS.NAME_MAX, 'Name is too long'),
  phone: z
    .string()
    .transform(normalizeIndianPhone)
    .pipe(z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')),
  service: z.enum(INQUIRY_SERVICES, { error: 'Please choose a service' }),
  preferredDate: z.preprocess(
    emptyToNull,
    z
      .iso.date({ error: 'Please pick a date' })
      .refine((date) => date >= todayISODate(), 'Date cannot be in the past'),
  ),
  preferredTime: z.preprocess(emptyToNull, z.enum(TIME_SLOTS).nullable()),
  message: z.preprocess(
    emptyToNull,
    z.string().max(INQUIRY_LIMITS.MESSAGE_MAX, 'Message is too long').nullable(),
  ),
})

/** @returns {{ success: true, data: import('./inquiry.model').NewInquiry } | { success: false, fieldErrors: Record<string, string> }} */
export function validateNewInquiry(input) {
  const result = createInquirySchema.safeParse(input)
  if (result.success) return { success: true, data: result.data }
  const fieldErrors = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0]
    if (field && !fieldErrors[field]) fieldErrors[field] = issue.message
  }
  return { success: false, fieldErrors }
}
