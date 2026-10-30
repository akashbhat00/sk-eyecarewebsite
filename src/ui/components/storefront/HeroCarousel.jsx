import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BANNER_ART, BANNER_THEME, heroBanners } from '../../../content/hero-banners.content'
import { siteConfig } from '../../../config/site.config'
import { themeConfig } from '../../../config/theme.config'
import { cn } from '../../../utils/cn.util'
import { formatINR } from '../../../utils/format.util'
import { scrollToSection } from '../../../utils/scroll.util'
import { Badge } from '../common/Badge'
import { Button } from '../common/Button'
import { Container } from '../common/Container'
import { EyeChart } from './EyeChart'
import { FrameIllustration } from './FrameIllustration'

const THEME = {
  [BANNER_THEME.DARK]: { bg: 'bg-navy-900', title: 'text-white', body: 'text-on-navy', badge: 'gold', primary: 'light', secondary: 'outline-light' },
  [BANNER_THEME.LIGHT]: { bg: 'bg-surface', title: 'text-navy-900', body: 'text-ink-soft', badge: 'navy', primary: 'primary', secondary: 'outline' },
  [BANNER_THEME.TINT]: { bg: 'bg-navy-100', title: 'text-navy-900', body: 'text-ink-soft', badge: 'gold', primary: 'primary', secondary: 'outline' },
}

function BannerArt({ art, dark }) {
  if (art.type === BANNER_ART.EYE_CHART) {
    return <EyeChart className="absolute right-[18px] top-[34px] w-[104px] md:static md:w-[300px]" />
  }
  return (
    <>
      {dark && (
        <>
          <span aria-hidden="true" className="absolute hidden size-[440px] rounded-full bg-white/5 md:block" />
          <span aria-hidden="true" className="absolute hidden size-[300px] rounded-full bg-white/5 md:block" />
        </>
      )}
      <FrameIllustration
        {...art}
        decorative
        className={cn(
          'absolute md:relative md:w-[min(440px,90%)]',
          dark ? '-right-10 bottom-[26px] w-[210px]' : '-right-7 top-[60px] w-[170px]',
          'md:right-auto md:top-auto md:bottom-auto',
        )}
      />
    </>
  )
}

function Banner({ banner, isFirst }) {
  const theme = THEME[banner.theme]
  const Heading = isFirst ? 'h1' : 'h2'
  return (
    <div className={cn('absolute inset-0 overflow-hidden md:grid md:grid-cols-2 md:items-center', theme.bg)}>
      <div className="relative z-10 flex h-full flex-col items-start gap-2.5 px-5 py-6 md:h-auto md:gap-[18px] md:py-0 md:pl-[72px] md:pr-6">
        <Badge variant={theme.badge} className="text-[10.5px] md:text-xs md:tracking-[0.08em]">
          {banner.badge}
        </Badge>
        <Heading className={cn('max-w-[220px] text-[28px] font-extrabold leading-[1.1] tracking-[-0.02em] md:max-w-none md:text-[52px] md:leading-[1.08] md:tracking-[-0.025em]', theme.title)}>
          {banner.title}
        </Heading>
        {banner.priceFrom && (
          <p className={cn('text-[15px] font-semibold md:text-[22px]', theme.body)}>
            Starting <span className="text-xl font-extrabold text-gold-500 md:text-[30px]">{formatINR(banner.priceFrom)}</span>
          </p>
        )}
        {banner.showHoursAndAddress && (
          <p className={cn('hidden text-[17px] leading-normal md:block', theme.body)}>
            {siteConfig.hours.map((h) => `${h.days} ${h.time}`).join(' · ')}
            <br />
            {siteConfig.address.line1}, {siteConfig.address.city}
          </p>
        )}
        {banner.body && <p className={cn('hidden max-w-[440px] text-[17px] leading-normal md:block', theme.body)}>{banner.body}</p>}
        <div className="mt-auto flex gap-3 md:mt-2">
          <Button variant={theme.primary} size="sm" className="md:h-12 md:px-6 md:text-[15px]" onClick={() => scrollToSection(banner.primary.target)}>
            {banner.primary.label}
          </Button>
          {banner.secondary && (
            <Button
              variant={theme.secondary}
              className="max-md:hidden"
              onClick={() => scrollToSection(banner.secondary.target)}
            >
              {banner.secondary.label}
            </Button>
          )}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 md:relative md:flex md:h-full md:items-center md:justify-center">
        <BannerArt art={banner.art} dark={banner.theme === BANNER_THEME.DARK} />
      </div>
    </div>
  )
}

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
const SWIPE_THRESHOLD_PX = 50

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef(null)
  const count = heroBanners.length

  const goTo = useCallback((next) => setIndex(((next % count) + count) % count), [count])

  useEffect(() => {
    if (paused || prefersReducedMotion()) return
    const timer = setTimeout(() => goTo(index + 1), themeConfig.heroAutoplayMs)
    return () => clearTimeout(timer)
  }, [index, paused, goTo])

  return (
    <Container as="section" aria-roledescription="carousel" aria-label="Offers" className="pt-4 md:pt-7">
      <div
        className="relative h-60 touch-pan-y overflow-hidden rounded-2xl md:h-[400px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0].clientX
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current == null) return
          const delta = event.changedTouches[0].clientX - touchStartX.current
          touchStartX.current = null
          if (delta < -SWIPE_THRESHOLD_PX) goTo(index + 1)
          else if (delta > SWIPE_THRESHOLD_PX) goTo(index - 1)
        }}
      >
        {heroBanners.map((banner, i) => (
          <div
            key={banner.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
            inert={i !== index}
            className={cn(
              'absolute inset-0 transition-opacity duration-500',
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
          >
            <Banner banner={banner} isFirst={i === 0} />
          </div>
        ))}
        {[
          { label: 'Previous slide', Icon: ChevronLeft, step: -1, side: 'left-5' },
          { label: 'Next slide', Icon: ChevronRight, step: 1, side: 'right-5' },
        ].map(({ label, Icon, step, side }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            onClick={() => goTo(index + step)}
            className={cn(
              'absolute top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-float md:flex',
              side,
            )}
          >
            <Icon size={20} strokeWidth={2.2} />
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-center gap-0.5 md:mt-3.5 md:gap-1">
        {heroBanners.map((b, i) => (
          <button
            key={b.id}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className="flex h-7 items-center px-1"
          >
            <span className={cn('block h-2 rounded-full transition-all', i === index ? 'w-[26px] bg-navy-900' : 'w-2 bg-dot')} />
          </button>
        ))}
      </div>
    </Container>
  )
}
