const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

export function formatINR(amount) {
  return inr.format(amount)
}

export function formatDate(isoDate) {
  if (!isoDate) return '—'
  const date = isoDate.length === 10 ? new Date(`${isoDate}T00:00:00`) : new Date(isoDate)
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatDateTime(isoTimestamp) {
  return new Date(isoTimestamp).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  })
}

/** 9876543210 → +91 98765 43210 */
export function formatPhone(tenDigits) {
  return `+91 ${tenDigits.slice(0, 5)} ${tenDigits.slice(5)}`
}

export function discountPercent(price, mrp) {
  return Math.round(((mrp - price) / mrp) * 100)
}
