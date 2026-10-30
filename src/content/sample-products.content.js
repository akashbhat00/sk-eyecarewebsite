import { FRAME_COLOR, FRAME_SHAPE, LENS_TINT } from './frame-styles.content'

// Sample frames for the Phase 1 storefront; Phase 2 replaces this with a catalog service.
export const PRODUCT_BADGE = { BESTSELLER: 'bestseller', NEW: 'new' }

export const sampleProducts = [
  { id: 'aria-round', title: 'Aria Round', shapeLabel: 'Round', size: 'Medium', price: 1299, mrp: 2499, rating: 4.8, badge: PRODUCT_BADGE.BESTSELLER, shape: FRAME_SHAPE.ROUND, color: FRAME_COLOR.TORTOISE, lens: LENS_TINT.CLEAR },
  { id: 'metro-rectangle', title: 'Metro Rectangle', shapeLabel: 'Rectangle', size: 'Wide', price: 999, mrp: 1999, rating: 4.6, badge: PRODUCT_BADGE.NEW, shape: FRAME_SHAPE.RECTANGLE, color: FRAME_COLOR.BLACK, lens: LENS_TINT.CLEAR },
  { id: 'luna-cateye', title: 'Luna Cat-eye', shapeLabel: 'Cat-eye', size: 'Medium', price: 1499, mrp: 2799, rating: 4.7, badge: PRODUCT_BADGE.BESTSELLER, shape: FRAME_SHAPE.CAT_EYE, color: FRAME_COLOR.WINE, lens: LENS_TINT.CLEAR },
  { id: 'sky-aviator', title: 'Sky Aviator Sunglasses', shapeLabel: 'Aviator', size: 'Large', price: 1799, mrp: 3299, rating: 4.8, badge: PRODUCT_BADGE.BESTSELLER, shape: FRAME_SHAPE.AVIATOR, color: FRAME_COLOR.GOLD, lens: LENS_TINT.SUN },
  { id: 'classic-wayfarer', title: 'Classic Wayfarer', shapeLabel: 'Wayfarer', size: 'Medium', price: 1199, mrp: 2199, rating: 4.6, badge: PRODUCT_BADGE.NEW, shape: FRAME_SHAPE.WAYFARER, color: FRAME_COLOR.NAVY, lens: LENS_TINT.CLEAR },
  { id: 'air-rimless', title: 'Air Rimless', shapeLabel: 'Rimless', size: 'Medium', price: 2199, mrp: 3999, rating: 4.7, badge: PRODUCT_BADGE.NEW, shape: FRAME_SHAPE.RIMLESS, color: FRAME_COLOR.SILVER, lens: LENS_TINT.FAINT },
  { id: 'kids-flexi-round', title: 'Kids Flexi Round', shapeLabel: 'Round', size: 'Small', price: 899, mrp: 1599, rating: 4.9, badge: PRODUCT_BADGE.BESTSELLER, shape: FRAME_SHAPE.ROUND, color: FRAME_COLOR.BLUE, lens: LENS_TINT.CLEAR },
  { id: 'blueshield-rectangle', title: 'BlueShield Rectangle', shapeLabel: 'Rectangle', size: 'Medium', price: 1399, mrp: 2599, rating: 4.7, badge: PRODUCT_BADGE.BESTSELLER, shape: FRAME_SHAPE.RECTANGLE, color: FRAME_COLOR.STEEL, lens: LENS_TINT.BLUE_CUT_LIGHT },
]
