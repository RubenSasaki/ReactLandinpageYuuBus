import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { showcaseScreens } from '../data/landingContent'
import { usePointerTilt } from '../hooks/usePointerTilt'

export function AppShowcase() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const { tilt, onPointerMove, onPointerLeave } = usePointerTilt(2.5)

  const classFor = (index: number) => {
    const previous = (active - 1 + showcaseScreens.length) % showcaseScreens.length
    const next = (active + 1) % showcaseScreens.length

    if (index === active) return 'phone-screen is-active'
    if (index === previous) return 'phone-screen is-prev'
    if (index === next) return 'phone-screen is-next'
    return 'phone-screen is-hidden'
  }

  const selectTab = (index: number) => {
    setActive(index)
    tabRefs.current[index]?.focus()
  }

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number
    if (event.key === 'ArrowRight') next = (index + 1) % showcaseScreens.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + showcaseScreens.length) % showcaseScreens.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = showcaseScreens.length - 1
    else return

    event.preventDefault()
    selectTab(next)
  }

  return (
    <div className="app-showcase" aria-label="Pantallas reales de Yuu Bus">
      <div className="showcase-orbit" aria-hidden="true" />
      <div
        className="phone-stack"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          '--showcase-rx': `${tilt.x}deg`,
          '--showcase-ry': `${tilt.y}deg`,
        } as CSSProperties}
      >
        {showcaseScreens.map((screen, index) => (
          <figure
            className={classFor(index)}
            id={`showcase-screen-${index}`}
            aria-hidden={index !== active}
            key={screen.src}
          >
            <img
              src={screen.src}
              alt={screen.alt}
              width={screen.width}
              height={screen.height}
              fetchPriority={index === 0 ? 'high' : undefined}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </figure>
        ))}
      </div>
      <div className="showcase-controls" role="tablist" aria-label="Explorar Yuu Bus">
        {showcaseScreens.map((screen, index) => (
          <button
            ref={(element) => { tabRefs.current[index] = element }}
            className={`showcase-control${index === active ? ' is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`showcase-screen-${index}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
            key={screen.label}
          >
            <span>{String(index + 1).padStart(2, '0')}</span> {screen.label}
          </button>
        ))}
      </div>
    </div>
  )
}
