export function HeroRouteMap() {
  return (
    <svg
      className="hero-route-map"
      viewBox="0 0 1440 820"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path
        className="hero-route-ghost"
        d="M-80 620H152V488H354V646H512V382H720V244H916V408H1110V214H1324V88H1510"
      />
      <path
        id="yuubus-hero-route"
        className="hero-route-line"
        d="M-80 620H152V488H354V646H512V382H720V244H916V408H1110V214H1324V88H1510"
      />
      <g className="hero-route-nodes">
        <circle cx="152" cy="488" r="8" />
        <circle cx="354" cy="646" r="8" />
        <circle cx="512" cy="382" r="8" />
        <circle cx="720" cy="244" r="8" />
        <circle cx="916" cy="408" r="8" />
        <circle cx="1110" cy="214" r="8" />
        <circle cx="1324" cy="88" r="8" />
      </g>
      <circle className="hero-route-traveler" r="7">
        <animateMotion dur="18s" repeatCount="indefinite" rotate="auto">
          <mpath href="#yuubus-hero-route" />
        </animateMotion>
      </circle>
    </svg>
  )
}

export function RouteDivider({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <div className={`route-divider route-divider--${tone}`} aria-hidden="true">
      <svg viewBox="0 0 1080 40" preserveAspectRatio="none">
        <path d="M0 20H176V8H286V32H446V20H632V8H756V32H914V20H1080" />
        <circle cx="176" cy="20" r="5" />
        <circle cx="446" cy="20" r="5" />
        <circle cx="756" cy="32" r="5" />
        <circle cx="914" cy="20" r="5" />
      </svg>
    </div>
  )
}

export function YuuBusCorner() {
  return (
    <svg className="yuubus-corner" viewBox="0 0 96 96" aria-hidden="true">
      <path d="M8 88V36h28V8h52" />
      <circle cx="36" cy="36" r="6" />
      <circle cx="88" cy="8" r="6" />
    </svg>
  )
}
