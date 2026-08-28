import { useRef, useState, type KeyboardEvent } from 'react'
import { features } from '../data/landingContent'

export function FeatureExplorer() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const selected = features[active]

  const selectTab = (index: number) => {
    setActive(index)
    tabRefs.current[index]?.focus()
  }

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % features.length
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + features.length) % features.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = features.length - 1
    else return

    event.preventDefault()
    selectTab(next)
  }

  return (
    <section className="section" id="features">
      <p className="section-tag">Características reales</p>
      <h2 className="section-title">Lo necesario para moverte con más claridad.</h2>
      <div className="feature-experience">
        <div
          className="feature-preview"
          id="feature-preview"
          role="tabpanel"
          aria-labelledby={`feature-tab-${active}`}
        >
          <div className="feature-device">
            <img
              src={selected.image}
              alt={selected.alt}
              width={selected.width}
              height={selected.height}
              loading="lazy"
            />
          </div>
          <span className="feature-preview-label">{selected.title}</span>
        </div>
        <div className="features" role="tablist" aria-label="Características de Yuu Bus">
          {features.map((feature, index) => (
            <button
              ref={(element) => { tabRefs.current[index] = element }}
              className={`feature-card${index === active ? ' is-active' : ''}`}
              type="button"
              role="tab"
              id={`feature-tab-${index}`}
              aria-selected={index === active}
              aria-controls="feature-preview"
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              key={feature.title}
            >
              <span className="feature-icon"><span className="material-symbols-rounded" aria-hidden="true">{feature.icon}</span></span>
              <span className="feature-content"><strong>{feature.title}</strong><span>{feature.description}</span></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
