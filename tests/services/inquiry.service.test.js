import { beforeEach, describe, expect, it } from 'vitest'
import { todayISODate } from '../../src/domain/inquiry/inquiry.schema'
import { createMemoryInquiryRepository } from '../../src/repositories/memory/memory-inquiry.repository'
import { createInquiryService } from '../../src/services/inquiry.service'
import { ERROR_CODES } from '../../src/shared/errors/app-error'

const input = {
  name: 'Priya Gupta',
  phone: '9876543210',
  service: 'Contact Lenses',
  preferredDate: todayISODate(),
  preferredTime: 'Evening (4–8)',
  message: 'Need monthly lenses',
}

describe('inquiryService', () => {
  let service

  beforeEach(() => {
    service = createInquiryService({ inquiryRepository: createMemoryInquiryRepository() })
  })

  it('stores a valid enquiry with status "new"', async () => {
    await service.submitInquiry(input)
    const [stored] = await service.listInquiries()
    expect(stored).toMatchObject({ name: 'Priya Gupta', status: 'new' })
  })

  it('throws a validation error with field errors and stores nothing', async () => {
    await expect(service.submitInquiry({ ...input, phone: 'abc' })).rejects.toMatchObject({
      code: ERROR_CODES.VALIDATION,
      fieldErrors: { phone: expect.any(String) },
    })
    expect(await service.listInquiries()).toHaveLength(0)
  })

  it('filters by status and counts by status', async () => {
    await service.submitInquiry(input)
    await service.submitInquiry({ ...input, name: 'Arun Dogra' })
    const [first] = await service.listInquiries()
    await service.changeStatus(first, 'contacted')

    expect(await service.listInquiries({ status: 'new' })).toHaveLength(1)
    expect(await service.getStatusCounts()).toEqual({ new: 1, contacted: 1, done: 0 })
  })

  it('enforces allowed status transitions', async () => {
    await service.submitInquiry(input)
    const [inquiry] = await service.listInquiries()
    const done = await service.changeStatus(inquiry, 'done')
    await expect(service.changeStatus(done, 'new')).rejects.toMatchObject({
      code: ERROR_CODES.INVALID_TRANSITION,
    })
  })

  it('reports NOT_CONFIGURED when there is no backend', async () => {
    const unconfigured = createInquiryService({ inquiryRepository: null })
    await expect(unconfigured.submitInquiry(input)).rejects.toMatchObject({
      code: ERROR_CODES.NOT_CONFIGURED,
    })
  })
})
