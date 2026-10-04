const input = document.querySelector('#route-search')
const cards = [...document.querySelectorAll('[data-route-card]')]
const count = document.querySelector('#route-results')
const empty = document.querySelector('[data-routes-empty]')

function normalize(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es-MX').trim()
}

function updateRoutes() {
  const query = normalize(input?.value ?? '')
  let visible = 0
  for (const card of cards) {
    const matches = normalize(card.dataset.search ?? '').includes(query)
    card.hidden = !matches
    if (matches) visible += 1
  }
  if (count) count.textContent = `${visible} ${visible === 1 ? 'ruta disponible' : 'rutas disponibles'}`
  if (empty) empty.hidden = visible !== 0
}

input?.addEventListener('input', updateRoutes)
