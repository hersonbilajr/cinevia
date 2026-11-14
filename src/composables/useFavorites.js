/**
 * useFavorites — lista de favoritos persistida em localStorage.
 *
 * O estado é partilhado por toda a aplicação (estado de módulo), pelo que a
 * barra de navegação, os cartões e a página de favoritos ficam sempre
 * sincronizados. Cada favorito guarda apenas o resumo necessário para voltar
 * a desenhar o cartão, mesmo sem nova chamada à API.
 */
import { computed, ref } from 'vue'

const STORAGE_KEY = 'cinevia:favoritos:v1'

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const items = ref(readStorage())

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
  } catch {
    /* modo privado / quota cheia: os favoritos ficam apenas em memória */
  }
}

function toSummary(movie) {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.year,
    rating: movie.rating,
    votes: movie.votes,
    poster: movie.poster || null,
    genres: movie.genres || [],
    overview: movie.overview || '',
    addedAt: new Date().toISOString()
  }
}

export function useFavorites() {
  const isFavorite = (id) => items.value.some((movie) => String(movie.id) === String(id))

  function toggle(movie) {
    if (!movie) return false
    if (isFavorite(movie.id)) {
      items.value = items.value.filter((item) => String(item.id) !== String(movie.id))
      persist()
      return false
    }
    items.value = [toSummary(movie), ...items.value]
    persist()
    return true
  }

  function remove(id) {
    items.value = items.value.filter((item) => String(item.id) !== String(id))
    persist()
  }

  function clear() {
    items.value = []
    persist()
  }

  const count = computed(() => items.value.length)

  return { favorites: items, count, isFavorite, toggle, remove, clear }
}
