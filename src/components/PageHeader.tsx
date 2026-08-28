export function PageHeader() {
  return (
    <header className="page-header">
      <div className="page-header-inner">
        <a className="page-brand" href="/" aria-label="Yuu Bus — inicio">
          <img src="/yuubus-icon-192.png" alt="" width="192" height="192" />
          <span>Yuu Bus</span>
        </a>
        <a className="page-home-link" href="/">Volver al inicio</a>
      </div>
    </header>
  )
}
