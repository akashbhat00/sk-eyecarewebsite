import { scrollToSection } from '../../../utils/scroll.util'

/**
 * In-page link. The app uses hash routing (#/admin), so plain "#section" hrefs would be read as routes;
 * this scrolls instead.
 */
export function SectionLink({ to, onClick, children, ...rest }) {
  return (
    <a
      href="#/"
      onClick={(event) => {
        event.preventDefault()
        onClick?.(event)
        scrollToSection(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
