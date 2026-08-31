type IconProps = {
  className?: string
}

export function PlanCheckIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.2 12.1 2.5 2.5 5.2-5.4" />
    </svg>
  )
}

export function PlanMailIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  )
}
