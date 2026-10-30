import { SECTION_IDS } from '../config/routes.config'
import { FRAME_COLOR, FRAME_SHAPE, LENS_TINT } from './frame-styles.content'

export const navCategories = [
  { label: 'Eyeglasses', target: SECTION_IDS.BESTSELLERS },
  { label: 'Sunglasses', target: SECTION_IDS.SHOP_BY_NEED },
  { label: 'Contact Lenses', target: SECTION_IDS.SHOP_BY_NEED },
  { label: 'Kids', target: SECTION_IDS.SHOP_BY_NEED },
  { label: 'Computer Glasses', target: SECTION_IDS.SHOP_BY_NEED },
  { label: 'Sports', target: SECTION_IDS.SHOP_BY_NEED },
]

export const categoryCircles = [
  { label: 'Men', shape: FRAME_SHAPE.RECTANGLE, color: FRAME_COLOR.BLACK, lens: LENS_TINT.CLEAR },
  { label: 'Women', shape: FRAME_SHAPE.CAT_EYE, color: FRAME_COLOR.WINE, lens: LENS_TINT.CLEAR },
  { label: 'Kids', shape: FRAME_SHAPE.ROUND, color: FRAME_COLOR.BLUE, lens: LENS_TINT.CLEAR },
  { label: 'Sunglasses', shape: FRAME_SHAPE.AVIATOR, color: FRAME_COLOR.GOLD, lens: LENS_TINT.SUN },
  { label: 'Contact Lenses', shape: FRAME_SHAPE.LENS, color: FRAME_COLOR.CONTACT_BLUE, lens: LENS_TINT.CONTACT },
  { label: 'Blue-light', shape: FRAME_SHAPE.WAYFARER, color: FRAME_COLOR.NAVY, lens: LENS_TINT.BLUE_CUT },
]

export const frameShapeChips = [
  { label: 'Round', shape: FRAME_SHAPE.ROUND },
  { label: 'Rectangle', shape: FRAME_SHAPE.RECTANGLE },
  { label: 'Cat-eye', shape: FRAME_SHAPE.CAT_EYE },
  { label: 'Aviator', shape: FRAME_SHAPE.AVIATOR },
  { label: 'Wayfarer', shape: FRAME_SHAPE.WAYFARER },
  { label: 'Rimless', shape: FRAME_SHAPE.RIMLESS },
]

export const shopByNeed = [
  { title: 'Prescription Glasses', desc: 'Single vision, bifocal and progressive', shape: FRAME_SHAPE.RECTANGLE, color: FRAME_COLOR.NAVY, lens: LENS_TINT.CLEAR },
  { title: 'Sunglasses', desc: 'UV-protected styles for Jammu summers', shape: FRAME_SHAPE.AVIATOR, color: FRAME_COLOR.GOLD, lens: LENS_TINT.SUN },
  { title: 'Contact Lenses', desc: 'Daily, monthly and coloured lenses', shape: FRAME_SHAPE.LENS, color: FRAME_COLOR.CONTACT_BLUE, lens: LENS_TINT.CONTACT },
  { title: 'Kids’ Eyewear', desc: 'Light, flexible frames that last', shape: FRAME_SHAPE.ROUND, color: FRAME_COLOR.BLUE, lens: LENS_TINT.CLEAR },
  { title: 'Safety & Computer Glasses', desc: 'Blue-cut and protective eyewear', shape: FRAME_SHAPE.WAYFARER, color: FRAME_COLOR.BLACK, lens: LENS_TINT.BLUE_CUT },
  { title: 'Sports & Outdoor', desc: 'Wraparound fits for riding and play', shape: FRAME_SHAPE.WRAP, color: FRAME_COLOR.BLACK, lens: LENS_TINT.SUN },
]
