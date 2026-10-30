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
  'Eye test',
  'Frame fitting & repair',
  'Lens replacement',
  'Contact lens fitting',
  'Other',
]

export const TIME_SLOTS = ['10–11 AM', '11 AM–12 PM', '12–1 PM', '3–4 PM', '5–6 PM', '7–8 PM']

export const INQUIRY_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  MESSAGE_MAX: 1000,
}
