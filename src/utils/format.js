/**
 * Pequenas ajudas de formatação usadas em vários componentes.
 */

/** 8.4 → "8,4" (convenção decimal portuguesa). */
export function formatRating(value) {
  const number = Number(value) || 0
  return number.toFixed(1).replace('.', ',')
}

/** 166 → "2h 46min"; 96 → "1h 36min"; 0 → "—". */
export function formatRuntime(minutes) {
  const total = Number(minutes) || 0
  if (!total) return '—'
  const hours = Math.floor(total / 60)
  const rest = total % 60
  if (!hours) return `${rest}min`
  return rest ? `${hours}h ${String(rest).padStart(2, '0')}min` : `${hours}h`
}

/** 12600 → "12,6 mil"; 1200000 → "1,2 M". */
export function formatVotes(value) {
  const number = Number(value) || 0
  if (number >= 1_000_000) return `${(number / 1_000_000).toFixed(1).replace('.', ',')} M`
  if (number >= 1_000) return `${(number / 1_000).toFixed(1).replace('.', ',')} mil`
  return String(number)
}

/** 200000000 → "200 000 000 USD". */
export function formatMoney(value) {
  const number = Number(value) || 0
  if (!number) return '—'
  return `${number.toLocaleString('pt-PT')} USD`
}

/** Data ISO → "27 de fevereiro de 2024". */
export function formatDate(iso) {
  if (!iso) return '—'
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })
}

/**
 * Cor estável derivada do título — usada no cartaz de substituição quando
 * não existe imagem (modo demo ou filme sem cartaz no TMDB).
 */
export function posterTint(title = '') {
  let hash = 0
  for (let i = 0; i < title.length; i += 1) {
    hash = (hash * 31 + title.charCodeAt(i)) % 360
  }
  return hash
}
