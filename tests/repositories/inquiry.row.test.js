import { describe, expect, it } from 'vitest'
import { toInquiry, toInquiryInsertRow } from '../../src/repositories/supabase/models/inquiry.row'

describe('inquiry row mapping', () => {
  it('maps a database row to the domain model', () => {
    const row = {
      id: 'abc',
      created_at: '2026-10-30T10:00:00Z',
      name: 'Sunita Verma',
      phone: '9876543210',
      service: 'Eye test',
      preferred_date: '2026-11-02',
      preferred_time: '10–11 AM',
      message: null,
      status: 'new',
    }
    expect(toInquiry(row)).toEqual({
      id: 'abc',
      createdAt: '2026-10-30T10:00:00Z',
      name: 'Sunita Verma',
      phone: '9876543210',
      service: 'Eye test',
      preferredDate: '2026-11-02',
      preferredTime: '10–11 AM',
      message: null,
      status: 'new',
    })
  })

  it('builds an insert row without id, status or created_at', () => {
    const insert = toInquiryInsertRow({
      name: 'A B',
      phone: '9876543210',
      service: 'Other',
      preferredDate: '2026-11-02',
    })
    expect(insert).toEqual({
      name: 'A B',
      phone: '9876543210',
      service: 'Other',
      preferred_date: '2026-11-02',
      preferred_time: null,
      message: null,
    })
  })
})
