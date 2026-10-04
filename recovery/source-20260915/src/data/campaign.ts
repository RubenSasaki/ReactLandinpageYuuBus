const values = new Set(['facebook', 'instagram', 'whatsapp', 'social', 'organic', 'paid_social', 'inspector-septiembre-2026', 'eventos-oaxaca', 'feed', 'story'])
export function safeCampaignParameters(search: string) {
  const params = new URLSearchParams(search)
  const context: Record<string, string> = {}
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const value = params.get(key)
    if (value && values.has(value)) context[key] = value
  }
  return context
}
