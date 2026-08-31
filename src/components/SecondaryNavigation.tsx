export function SecondaryNavigation() {
  return (
    <details className="nav-more">
      <summary>Más</summary>
      <nav className="nav-more-menu" aria-label="Navegación secundaria">
        <a className="nav-more-mobile-primary" href="/rutas/">Rutas</a>
        <a className="nav-more-mobile-primary" href="/anunciate/">Anúnciate</a>
        <a href="/colabora/">Colabora</a>
        <a href="/privacy/">Aviso de Privacidad</a>
        <a href="/terminos/">Términos y Condiciones</a>
      </nav>
    </details>
  )
}
