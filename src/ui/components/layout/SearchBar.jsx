import { Search } from 'lucide-react'
import { SECTION_IDS } from '../../../config/routes.config'
import { cn } from '../../../utils/cn.util'
import { scrollToSection } from '../../../utils/scroll.util'

// Phase 1: search is visual only and jumps to the bestsellers; Phase 2 wires it to the catalog service.
export function SearchBar({ className, autoFocus }) {
  return (
    <form
      role="search"
      className={cn(
        'flex h-12 items-center gap-3 rounded-xl border border-line bg-surface px-4 text-muted focus-within:border-navy-900',
        className,
      )}
      onSubmit={(event) => {
        event.preventDefault()
        scrollToSection(SECTION_IDS.BESTSELLERS)
      }}
    >
      <Search size={20} aria-hidden="true" />
      <input
        type="search"
        name="q"
        placeholder="Search frames, sunglasses, lenses…"
        aria-label="Search frames, sunglasses, lenses"
        autoFocus={autoFocus}
        className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none"
      />
    </form>
  )
}
