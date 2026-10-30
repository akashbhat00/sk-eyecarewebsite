import { FRAME_SHAPE } from '../../../content/frame-styles.content'

const LABELS = {
  [FRAME_SHAPE.ROUND]: 'Round frame',
  [FRAME_SHAPE.RECTANGLE]: 'Rectangle frame',
  [FRAME_SHAPE.CAT_EYE]: 'Cat-eye frame',
  [FRAME_SHAPE.AVIATOR]: 'Aviator frame',
  [FRAME_SHAPE.WAYFARER]: 'Wayfarer frame',
  [FRAME_SHAPE.RIMLESS]: 'Rimless frame',
  [FRAME_SHAPE.WRAP]: 'Sports wrap frame',
  [FRAME_SHAPE.LENS]: 'Contact lens',
}

const STROKE_WIDTH = { [FRAME_SHAPE.RIMLESS]: 2, [FRAME_SHAPE.WAYFARER]: 7 }

const SHAPES = {
  [FRAME_SHAPE.ROUND]: (
    <>
      <circle cx="62" cy="44" r="27" />
      <circle cx="138" cy="44" r="27" />
      <path d="M89 40 Q100 31 111 40" fill="none" />
      <path d="M35 38 L10 32" fill="none" />
      <path d="M165 38 L190 32" fill="none" />
    </>
  ),
  [FRAME_SHAPE.RECTANGLE]: (
    <>
      <rect x="28" y="24" width="62" height="40" rx="8" />
      <rect x="110" y="24" width="62" height="40" rx="8" />
      <path d="M90 38 Q100 31 110 38" fill="none" />
      <path d="M28 32 L8 28" fill="none" />
      <path d="M172 32 L192 28" fill="none" />
    </>
  ),
  [FRAME_SHAPE.CAT_EYE]: (
    <>
      <path d="M26 30 Q34 20 58 24 Q80 26 90 34 Q88 58 64 62 Q40 64 32 50 Q26 40 26 30 Z" />
      <path d="M174 30 Q166 20 142 24 Q120 26 110 34 Q112 58 136 62 Q160 64 168 50 Q174 40 174 30 Z" />
      <path d="M90 36 Q100 30 110 36" fill="none" />
      <path d="M26 30 L12 22" fill="none" />
      <path d="M174 30 L188 22" fill="none" />
    </>
  ),
  [FRAME_SHAPE.AVIATOR]: (
    <>
      <path d="M30 26 Q60 18 90 28 Q92 52 74 62 Q52 70 38 56 Q28 44 30 26 Z" />
      <path d="M170 26 Q140 18 110 28 Q108 52 126 62 Q148 70 162 56 Q172 44 170 26 Z" />
      <path d="M90 28 Q100 24 110 28" fill="none" />
      <path d="M92 40 Q100 37 108 40" fill="none" />
      <path d="M30 28 L10 24" fill="none" />
      <path d="M170 28 L190 24" fill="none" />
    </>
  ),
  [FRAME_SHAPE.WAYFARER]: (
    <>
      <path d="M24 24 L94 24 L88 54 Q64 66 34 56 Z" />
      <path d="M176 24 L106 24 L112 54 Q136 66 166 56 Z" />
      <path d="M94 30 Q100 26 106 30" fill="none" />
      <path d="M24 28 L6 26" fill="none" />
      <path d="M176 28 L194 26" fill="none" />
    </>
  ),
  [FRAME_SHAPE.RIMLESS]: (
    <>
      <ellipse cx="62" cy="44" rx="30" ry="22" />
      <ellipse cx="138" cy="44" rx="30" ry="22" />
      <path d="M92 40 L108 40" fill="none" />
      <path d="M32 38 L10 34" fill="none" />
      <path d="M168 38 L190 34" fill="none" />
    </>
  ),
  [FRAME_SHAPE.WRAP]: (
    <>
      <path d="M20 30 Q100 14 180 30 Q178 56 150 62 Q120 66 104 50 Q100 46 96 50 Q80 66 50 62 Q22 56 20 30 Z" />
      <path d="M20 30 L6 28" fill="none" />
      <path d="M180 30 L194 28" fill="none" />
    </>
  ),
  [FRAME_SHAPE.LENS]: (
    <>
      <path d="M56 56 Q100 4 144 56 Z" />
      <ellipse cx="100" cy="56" rx="44" ry="10" />
      <path d="M78 34 Q90 24 104 24" fill="none" strokeWidth="2" />
    </>
  ),
}

/**
 * Line illustration of an eyewear frame, used instead of product photos until the catalog has real images.
 * @param {{ shape: string, color?: string, lens?: string, className?: string, decorative?: boolean }} props
 */
export function FrameIllustration({ shape, color = '#0B1F4E', lens = 'rgba(11,31,78,0.06)', className, decorative = false }) {
  const a11y = decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': LABELS[shape] ?? 'Eyewear frame' }
  return (
    <svg
      viewBox="0 0 200 84"
      className={className}
      fill={lens}
      stroke={color}
      strokeWidth={STROKE_WIDTH[shape] ?? 5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
    >
      {SHAPES[shape] ?? SHAPES[FRAME_SHAPE.ROUND]}
    </svg>
  )
}
