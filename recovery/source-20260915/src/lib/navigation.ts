/** Progressive enhancement shared by React headers and the existing static header. */
export function attachNavigation(root: Document = document, view: Window = window) {
  const menus = [...root.querySelectorAll<HTMLDetailsElement>('details.nav-more')]
  const removers: Array<() => void> = []
  const close = (menu: HTMLDetailsElement, restoreFocus = false) => {
    if (!menu.open) return
    const trigger = menu.querySelector<HTMLElement>('summary')
    if (restoreFocus) trigger?.focus()
    menu.open = false
    trigger?.setAttribute('aria-expanded', 'false')
  }
  const closeAll = () => menus.forEach(menu => close(menu, menu.contains(root.activeElement)))
  menus.forEach((menu, index) => {
    const trigger = menu.querySelector<HTMLElement>('summary')
    const panel = menu.querySelector<HTMLElement>('.nav-more-menu')
    if (!trigger || !panel) return
    panel.id ||= `secondary-navigation-${index}`
    trigger.setAttribute('aria-controls', panel.id)
    menu.open = false
    trigger.setAttribute('aria-expanded', 'false')
    const sync = () => {
      trigger.setAttribute('aria-expanded', String(menu.open))
      if (menu.open) menus.forEach(other => { if (other !== menu) close(other) })
    }
    menu.addEventListener('toggle', sync)
    removers.push(() => menu.removeEventListener('toggle', sync))
  })
  const outside = (event: Event) => {
    const target = event.target as Node | null
    menus.forEach(menu => { if (!target || !menu.contains(target)) close(menu, menu.contains(root.activeElement)) })
  }
  const click = (event: MouseEvent) => {
    const target = event.target
    if (!(target instanceof Element)) return
    if (target.closest('a[href]')) menus.forEach(menu => close(menu, menu.contains(root.activeElement)))
    else outside(event)
  }
  const escape = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' || !menus.some(menu => menu.open)) return
    event.preventDefault()
    menus.forEach(menu => close(menu, menu.contains(root.activeElement)))
  }
  root.addEventListener('pointerdown', outside)
  root.addEventListener('click', click)
  root.addEventListener('focusin', outside)
  root.addEventListener('keydown', escape)
  // Full-document links are the router. These also cover fragments and back/forward cache.
  const navigationEvents = ['popstate', 'hashchange', 'pagehide', 'pageshow'] as const
  navigationEvents.forEach(name => view.addEventListener(name, closeAll))
  const breakpoint = view.matchMedia('(max-width: 720px)')
  breakpoint.addEventListener('change', closeAll)
  return () => {
    removers.forEach(remove => remove())
    root.removeEventListener('pointerdown', outside)
    root.removeEventListener('click', click)
    root.removeEventListener('focusin', outside)
    root.removeEventListener('keydown', escape)
    navigationEvents.forEach(name => view.removeEventListener(name, closeAll))
    breakpoint.removeEventListener('change', closeAll)
  }
}
