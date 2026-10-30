import { frameShapeChips } from '../../../content/categories.content'
import { Chip } from '../common/Chip'
import { FrameIllustration } from './FrameIllustration'

/** Toggles a frame-shape filter on the bestseller grid. */
export function FrameShapeChips({ selected, onSelect }) {
  return (
    <section aria-labelledby="shape-chips-h" className="mx-auto max-w-[1440px] pt-5 md:flex md:items-center md:gap-3 md:px-8 md:pt-9 xl:px-20">
      <h2 id="shape-chips-h" className="px-4 text-[15px] font-bold md:mr-3 md:shrink-0 md:px-0 md:text-base">
        Shop by frame shape
      </h2>
      <div className="scrollbar-none flex gap-2 overflow-x-auto px-4 pb-0.5 pt-3 md:flex-wrap md:gap-3 md:px-0 md:pt-0">
        {frameShapeChips.map((chip) => (
          <Chip
            key={chip.shape}
            pressed={selected === chip.shape}
            onClick={() => onSelect(selected === chip.shape ? null : chip.shape)}
            className="h-11 pl-2.5 pr-3.5 text-[13px] md:h-[46px] md:pl-3 md:pr-[18px] md:text-sm"
          >
            <FrameIllustration
              shape={chip.shape}
              color={selected === chip.shape ? '#FFFFFF' : '#0B1F4E'}
              lens="rgba(11,31,78,0.05)"
              decorative
              className="w-8 md:w-10"
            />
            {chip.label}
          </Chip>
        ))}
      </div>
    </section>
  )
}
