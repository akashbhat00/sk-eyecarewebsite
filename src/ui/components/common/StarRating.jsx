const STAR_PATH = 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z'

export function Star({ size = 14, filled = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={filled ? 'fill-gold-500' : 'fill-gold-200'}>
      <path d={STAR_PATH} />
    </svg>
  )
}

/** Five stars, filled up to the rounded-down rating. */
export function StarRating({ rating, size = 14, showValue = false }) {
  const filled = Math.floor(rating)
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} filled={i < filled} />
      ))}
      {showValue && <span className="ml-1.5 text-[13px] font-semibold text-ink-soft">{rating}</span>}
    </span>
  )
}
