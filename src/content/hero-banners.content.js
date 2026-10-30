import { SECTION_IDS } from '../config/routes.config'
import { FRAME_COLOR, FRAME_SHAPE, LENS_TINT } from './frame-styles.content'

export const BANNER_THEME = { DARK: 'dark', LIGHT: 'light', TINT: 'tint' }
export const BANNER_ART = { FRAME: 'frame', EYE_CHART: 'eye-chart' }

export const heroBanners = [
  {
    id: 'new-season',
    theme: BANNER_THEME.DARK,
    badge: 'New season',
    title: 'New Season Frames',
    priceFrom: 999,
    primary: { label: 'Shop frames', target: SECTION_IDS.BESTSELLERS },
    secondary: { label: 'Visit the store', target: SECTION_IDS.VISIT },
    art: { type: BANNER_ART.FRAME, shape: FRAME_SHAPE.WAYFARER, color: FRAME_COLOR.WHITE, lens: LENS_TINT.ON_DARK },
  },
  {
    id: 'free-eye-test',
    theme: BANNER_THEME.LIGHT,
    badge: 'Free eye test',
    title: 'Free Eye Test, Walk in Today',
    showHoursAndAddress: true,
    primary: { label: 'Book a slot', target: SECTION_IDS.BOOK },
    secondary: { label: 'Get directions', target: SECTION_IDS.VISIT },
    art: { type: BANNER_ART.EYE_CHART },
  },
  {
    id: 'blue-cut',
    theme: BANNER_THEME.TINT,
    badge: 'For screen users',
    title: 'Blue-Cut Lenses for Screen Users',
    body: 'Long hours on a laptop or phone? Ask for blue-cut lenses with your next pair.',
    primary: { label: 'Shop computer glasses', target: SECTION_IDS.SHOP_BY_NEED },
    art: { type: BANNER_ART.FRAME, shape: FRAME_SHAPE.RECTANGLE, color: FRAME_COLOR.NAVY, lens: LENS_TINT.BLUE_CUT },
  },
]
