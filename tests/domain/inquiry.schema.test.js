import { describe, expect, it } from 'vitest'
import { normalizeIndianPhone, todayISODate, validateNewInquiry } from '../../src/domain/inquiry/inquiry.schema'

const valid = {
  name: '  Rahul Sharma ',
  phone: '+91 98765 43210',
  service: 'Eye Test',
  preferredDate: todayISODate(),
  preferredTime: '',
  message: '  ',
}

describe('normalizeIndianPhone', () => {
  it.each([
    ['+91 98765 43210', '9876543210'],
    ['919876543210', '9876543210'],
    ['09876543210', '9876543210'],
    ['98765-43210', '9876543210'],
  ])('%s → %s', (input, expected) => {
    expect(normalizeIndianPhone(input)).toBe(expected)
  })
})

describe('validateNewInquiry', () => {
  it('accepts a valid enquiry and normalises fields', () => {
    const result = validateNewInquiry(valid)
    expect(result.success).toBe(true)
    expect(result.data).toEqual({
      name: 'Rahul Sharma',
      phone: '9876543210',
      service: 'Eye Test',
      preferredDate: todayISODate(),
      preferredTime: null,
      message: null,
    })
  })

  it('rejects an invalid phone number', () => {
    const result = validateNewInquiry({ ...valid, phone: '12345' })
    expect(result.success).toBe(false)
    expect(result.fieldErrors.phone).toMatch(/10-digit/)
  })

  it('rejects numbers that do not start with 6-9', () => {
    expect(validateNewInquiry({ ...valid, phone: '5876543210' }).success).toBe(false)
  })

  it('rejects an empty name', () => {
    expect(validateNewInquiry({ ...valid, name: ' ' }).fieldErrors.name).toBeDefined()
  })

  it('rejects a past date', () => {
    const result = validateNewInquiry({ ...valid, preferredDate: '2020-01-01' })
    expect(result.fieldErrors.preferredDate).toMatch(/past/)
  })

  it('requires a date', () => {
    expect(validateNewInquiry({ ...valid, preferredDate: '' }).fieldErrors.preferredDate).toBeDefined()
  })

  it('rejects an unknown service', () => {
    expect(validateNewInquiry({ ...valid, service: 'Haircut' }).fieldErrors.service).toBeDefined()
  })

  it('rejects an unknown time slot', () => {
    expect(validateNewInquiry({ ...valid, preferredTime: 'Midnight' }).fieldErrors.preferredTime).toBeDefined()
  })
})
