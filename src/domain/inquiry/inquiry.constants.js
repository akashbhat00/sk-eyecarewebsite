export const INQUIRY_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  DONE: 'done',
}

export const INQUIRY_STATUS_LABELS = {
  [INQUIRY_STATUS.NEW]: 'New',
  [INQUIRY_STATUS.CONTACTED]: 'Contacted',
  [INQUIRY_STATUS.DONE]: 'Done',
}

export const STATUS_TRANSITIONS = {
  [INQUIRY_STATUS.NEW]: [INQUIRY_STATUS.CONTACTED, INQUIRY_STATUS.DONE],
  [INQUIRY_STATUS.CONTACTED]: [INQUIRY_STATUS.NEW, INQUIRY_STATUS.DONE],
  [INQUIRY_STATUS.DONE]: [INQUIRY_STATUS.CONTACTED],
}

// Keep in sync with the CHECK constraint in supabase/migrations/002_inquiries.sql
export const INQUIRY_SERVICES = [
  'Eye Test',
  'New Spectacles',
  'Sunglasses',
  'Contact Lenses',
  'Frame Repair',
  'Lens Replacement',
  'Other',
]

export const TIME_SLOTS = ['Morning (10–12)', 'Afternoon (12–4)', 'Evening (4–8)']

export const INQUIRY_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  MESSAGE_MAX: 1000,
}
