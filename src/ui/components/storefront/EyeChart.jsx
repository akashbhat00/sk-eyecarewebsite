const ROWS = [
  { letters: 'E', size: 'text-4xl md:text-[72px]' },
  { letters: 'F P', size: 'text-xl md:text-[40px]' },
  { letters: 'T O Z', size: 'text-sm md:text-[28px]' },
  { letters: 'L P E D', size: 'text-[10px] md:text-xl', muted: true },
  { letters: 'P E C F D', size: 'hidden md:block md:text-sm', muted: true },
]

export function EyeChart({ className }) {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-col items-center gap-2 rounded-xl bg-white py-4 font-extrabold tracking-[0.16em] text-navy-900 shadow-raised md:gap-3.5 md:rounded-2xl md:py-8 ${className ?? ''}`}
    >
      {ROWS.map((row) => (
        <span key={row.letters} className={`leading-none ${row.size} ${row.muted ? 'text-muted' : ''}`}>
          {row.letters}
        </span>
      ))}
    </div>
  )
}
