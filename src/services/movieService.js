/**
 * movieService — camada única de acesso aos dados dos filmes.
 *
 * Dois modos de funcionamento, com a MESMA interface pública:
 *
 *  • MODO AO VIVO  — usa a API do TMDB (v3) quando existe chave configurada
 *                    em .env (VITE_TMDB_TOKEN ou VITE_TMDB_API_KEY).
 *  • MODO DEMO     — sem chave, serve o catálogo local src/data/demoMovies.js,
 *                    aplicando pesquisa, filtros e paginação do lado do cliente.
 *
 * Assim, nenhum componente conhece a origem dos dados: as views e os
 * componentes limitam-se a consumir listas normalizadas.
 */
import { demoMovies } from '../data/demoMovies'

const API_BASE = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p'

const TOKEN = (import.meta.env.VITE_TMDB_TOKEN || '').trim()
const API_KEY = (import.meta.env.VITE_TMDB_API_KEY || '').trim()
const LANGUAGE = (import.meta.env.VITE_TMDB_LANGUAGE || 'pt-PT').trim()

/** true quando existe credencial do TMDB — a interface mostra o modo ativo. */
export const isLiveMode = Boolean(TOKEN || API_KEY)

export const PAGE_SIZE_DEMO = 12

const CATEGORY_ENDPOINTS = {
  popular: '/movie/popular',
  top_rated: '/movie/top_rated',
  upcoming: '/movie/upcoming',
  now_playing: '/movie/now_playing'
}

export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Mais populares' },
  { value: 'vote_average.desc', label: 'Melhor classificados' },
  { value: 'primary_release_date.desc', label: 'Mais recentes' }
]

/* -------------------------------------------------------------------------- */
/* Utilitários                                                                */
/* -------------------------------------------------------------------------- */

/** Erro de domínio, com mensagem já em português e pronta a apresentar. */
export class MovieApiError extends Error {
  constructor(message, status = 0) {
    super(message)
    this.name = 'MovieApiError'
    this.status = status
  }
}

export function posterUrl(path, size = 'w500') {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${IMAGE_BASE}/${size}${path}`
}

export function backdropUrl(path, size = 'w1280') {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${IMAGE_BASE}/${size}${path}`
}

const cache = new Map()

async function request(path, params = {}) {
  const query = new URLSearchParams({ language: LANGUAGE, ...params })
  if (!TOKEN && API_KEY) query.set('api_key', API_KEY)

  const url = `${API_BASE}${path}?${query.toString()}`
  if (cache.has(url)) return cache.get(url)

  const headers = { accept: 'application/json' }
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`

  let response
  try {
    response = await fetch(url, { headers })
  } catch {
    throw new MovieApiError(
      'Não foi possível contactar a API do TMDB. Verifica a ligação à Internet e tenta novamente.'
    )
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new MovieApiError(
        'A chave da API do TMDB foi recusada. Confirma VITE_TMDB_TOKEN no ficheiro .env.',
        401
      )
    }
    if (response.status === 404) {
      throw new MovieApiError('Recurso não encontrado na API do TMDB.', 404)
    }
    if (response.status === 429) {
      throw new MovieApiError('Demasiados pedidos à API do TMDB. Aguarda alguns segundos.', 429)
    }
    throw new MovieApiError(
      `A API do TMDB devolveu um erro (${response.status}). Tenta novamente.`,
      response.status
    )
  }

  const data = await response.json()
  cache.set(url, data)
  return data
}

const DEMO_DELAY = 220
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Mapa id → nome de género. As listagens do TMDB trazem apenas `genre_ids`,
 * pelo que é preciso este índice para mostrar os nomes nos cartões e nas
 * etiquetas de filtro. É pedido uma única vez e reutilizado.
 */
let liveGenreMap = null

async function ensureGenreMap() {
  if (!isLiveMode) return demoGenreMap
  if (liveGenreMap) return liveGenreMap
  const data = await request('/genre/movie/list')
  liveGenreMap = new Map((data.genres || []).map((genre) => [genre.id, genre.name]))
  return liveGenreMap
}

/* -------------------------------------------------------------------------- */
/* Normalização                                                               */
/* -------------------------------------------------------------------------- */

function genreObjectsFromIds(ids = [], genreMap = new Map()) {
  return ids.filter((id) => genreMap.has(id)).map((id) => ({ id, name: genreMap.get(id) }))
}

function normalizeLive(movie, genreMap) {
  const releaseDate = movie.release_date || ''
  return {
    id: movie.id,
    title: movie.title || movie.original_title || 'Sem título',
    originalTitle: movie.original_title || '',
    releaseDate,
    year: releaseDate ? Number(releaseDate.slice(0, 4)) : null,
    rating: Number(movie.vote_average || 0),
    votes: Number(movie.vote_count || 0),
    popularity: Number(movie.popularity || 0),
    poster: movie.poster_path || null,
    backdrop: movie.backdrop_path || null,
    overview: movie.overview || '',
    genres: movie.genres
      ? movie.genres.map((genre) => ({ id: genre.id, name: genre.name }))
      : genreObjectsFromIds(movie.genre_ids, genreMap)
  }
}

/** Índice de géneros do catálogo local: { nome → id } estável. */
const demoGenreIndex = (() => {
  const names = new Set()
  demoMovies.forEach((movie) => movie.genres.forEach((name) => names.add(name)))
  const index = new Map()
  ;[...names].sort((a, b) => a.localeCompare(b, 'pt')).forEach((name, i) => index.set(name, i + 1))
  return index
})()

const demoGenreMap = new Map([...demoGenreIndex].map(([name, id]) => [id, name]))

function normalizeDemo(movie) {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.originalTitle || '',
    releaseDate: movie.releaseDate,
    year: Number(movie.releaseDate.slice(0, 4)),
    rating: movie.rating,
    votes: movie.votes,
    popularity: movie.popularity,
    poster: null,
    backdrop: null,
    overview: movie.synopsis,
    genres: movie.genres.map((name) => ({ id: demoGenreIndex.get(name), name })),
    runtime: movie.runtime,
    director: movie.director,
    cast: movie.cast,
    tagline: movie.tagline || ''
  }
}

/* -------------------------------------------------------------------------- */
/* Filtros / ordenação do lado do cliente                                     */
/* -------------------------------------------------------------------------- */

/** Remove acentos e normaliza para comparações de pesquisa. */
function fold(text = '') {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function applyFilters(list, filters = {}) {
  const { genre, year, rating, sort } = filters

  let result = list.filter((movie) => {
    if (genre && !movie.genres.some((item) => String(item.id) === String(genre))) return false
    if (year && Number(movie.year) !== Number(year)) return false
    if (rating && Number(movie.rating) < Number(rating)) return false
    return true
  })

  result = [...result]
  if (sort === 'vote_average.desc') {
    result.sort((a, b) => b.rating - a.rating || b.votes - a.votes)
  } else if (sort === 'primary_release_date.desc') {
    result.sort((a, b) => (b.releaseDate || '').localeCompare(a.releaseDate || ''))
  } else {
    result.sort((a, b) => b.popularity - a.popularity)
  }
  return result
}

function searchDemo(query) {
  const term = fold(query)
  if (!term) return []
  return demoMovies
    .map(normalizeDemo)
    .filter((movie) => fold(movie.title).includes(term) || fold(movie.originalTitle).includes(term))
}

function paginate(list, page, pageSize) {
  const totalPages = Math.max(1, Math.ceil(list.length / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize
  return {
    results: list.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    totalResults: list.length
  }
}

/* -------------------------------------------------------------------------- */
/* API pública do serviço                                                     */
/* -------------------------------------------------------------------------- */

/** Lista de géneros disponíveis: [{ id, name }]. */
export async function getGenres() {
  if (!isLiveMode) {
    await wait(DEMO_DELAY)
    return [...demoGenreIndex]
      .map(([name, id]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt'))
  }
  const data = await request('/genre/movie/list')
  liveGenreMap = new Map((data.genres || []).map((genre) => [genre.id, genre.name]))
  return (data.genres || []).sort((a, b) => a.name.localeCompare(b.name, 'pt'))
}

/** Filmes em destaque (hero da página inicial). */
export async function getTrending() {
  if (!isLiveMode) {
    await wait(DEMO_DELAY)
    return applyFilters(demoMovies.map(normalizeDemo), { sort: 'popularity.desc' }).slice(0, 6)
  }
  const data = await request('/trending/movie/week')
  const genreMap = await ensureGenreMap()
  return (data.results || []).map((movie) => normalizeLive(movie, genreMap))
}

/**
 * Listagem por categoria: 'popular' | 'top_rated' | 'upcoming' | 'now_playing'.
 */
export async function getCategory(category = 'popular', page = 1) {
  if (!isLiveMode) {
    await wait(DEMO_DELAY)
    const all = demoMovies.map(normalizeDemo)
    const today = new Date().toISOString().slice(0, 10)

    if (category === 'top_rated') {
      return paginate(
        applyFilters(all, { sort: 'vote_average.desc' }).filter((movie) => movie.votes > 0),
        page,
        PAGE_SIZE_DEMO
      )
    }
    if (category === 'upcoming') {
      const upcoming = all
        .filter((movie) => movie.releaseDate > today)
        .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))
      return paginate(upcoming, page, PAGE_SIZE_DEMO)
    }
    if (category === 'now_playing') {
      return paginate(applyFilters(all, { sort: 'primary_release_date.desc' }), page, PAGE_SIZE_DEMO)
    }
    return paginate(applyFilters(all, { sort: 'popularity.desc' }), page, PAGE_SIZE_DEMO)
  }

  const endpoint = CATEGORY_ENDPOINTS[category] || CATEGORY_ENDPOINTS.popular
  const data = await request(endpoint, { page: String(page), region: 'PT' })
  const genreMap = await ensureGenreMap()
  return {
    results: (data.results || []).map((movie) => normalizeLive(movie, genreMap)),
    page: data.page || page,
    totalPages: Math.min(data.total_pages || 1, 500),
    totalResults: data.total_results || 0
  }
}

/**
 * Pesquisa por título.
 * No TMDB o endpoint de pesquisa não aceita filtros, pelo que os filtros
 * ativos são aplicados aos resultados devolvidos (e o total é o da API).
 */
export async function searchMovies(query, page = 1, filters = {}) {
  const term = (query || '').trim()
  if (!term) return { results: [], page: 1, totalPages: 1, totalResults: 0 }

  if (!isLiveMode) {
    await wait(DEMO_DELAY)
    return paginate(applyFilters(searchDemo(term), filters), page, PAGE_SIZE_DEMO)
  }

  const data = await request('/search/movie', {
    query: term,
    page: String(page),
    include_adult: 'false'
  })
  const genreMap = await ensureGenreMap()
  const results = (data.results || []).map((movie) => normalizeLive(movie, genreMap))
  return {
    results: applyFilters(results, filters),
    page: data.page || page,
    totalPages: Math.min(data.total_pages || 1, 500),
    totalResults: data.total_results || 0
  }
}

/** Pesquisa/exploração com filtros combinados (género + ano + classificação). */
export async function discoverMovies({ genre, year, rating, sort, page = 1 } = {}) {
  if (!isLiveMode) {
    await wait(DEMO_DELAY)
    const all = demoMovies.map(normalizeDemo)
    return paginate(applyFilters(all, { genre, year, rating, sort }), page, PAGE_SIZE_DEMO)
  }

  const params = {
    page: String(page),
    sort_by: sort || 'popularity.desc',
    include_adult: 'false',
    watch_region: 'PT'
  }
  if (genre) params.with_genres = String(genre)
  if (year) params.primary_release_year = String(year)
  if (rating) params['vote_average.gte'] = String(rating)
  if (!sort || sort === 'vote_average.desc') params['vote_count.gte'] = '200'

  const data = await request('/discover/movie', params)
  const genreMap = await ensureGenreMap()
  return {
    results: (data.results || []).map((movie) => normalizeLive(movie, genreMap)),
    page: data.page || page,
    totalPages: Math.min(data.total_pages || 1, 500),
    totalResults: data.total_results || 0
  }
}

/** Detalhes completos de um filme (sinopse, duração, elenco, realização…). */
export async function getMovieDetails(id) {
  if (!isLiveMode) {
    await wait(DEMO_DELAY)
    const movie = demoMovies.find((item) => String(item.id) === String(id))
    if (!movie) throw new MovieApiError('Filme não encontrado no catálogo.', 404)
    const normalized = normalizeDemo(movie)
    return {
      ...normalized,
      status: movie.releaseDate > new Date().toISOString().slice(0, 10) ? 'Estreia futura' : 'Lançado',
      originalLanguage: '—',
      productionCompanies: [],
      budget: 0,
      revenue: 0,
      homepage: '',
      imdbId: '',
      trailer: null
    }
  }

  const data = await request(`/movie/${id}`, { append_to_response: 'credits,videos' })
  const credits = data.credits || {}
  const trailer = (data.videos?.results || []).find(
    (video) => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
  )

  return {
    ...normalizeLive(data),
    runtime: data.runtime || null,
    tagline: data.tagline || '',
    status: data.status || '',
    originalLanguage: (data.original_language || '').toUpperCase(),
    productionCompanies: (data.production_companies || []).map((company) => company.name),
    budget: data.budget || 0,
    revenue: data.revenue || 0,
    homepage: data.homepage || '',
    imdbId: data.imdb_id || '',
    director:
      (credits.crew || [])
        .filter((person) => person.job === 'Director')
        .map((person) => person.name)
        .join(', ') || 'Não disponível',
    cast: (credits.cast || []).slice(0, 10).map((person) => person.name),
    trailer: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null
  }
}

/** Sugestões relacionadas com um filme (mesmo género no modo demo). */
export async function getRelated(movie, limit = 6) {
  if (!movie) return []
  if (!isLiveMode) {
    await wait(DEMO_DELAY)
    const genreIds = movie.genres.map((genre) => String(genre.id))
    return demoMovies
      .map(normalizeDemo)
      .filter(
        (item) =>
          item.id !== movie.id && item.genres.some((genre) => genreIds.includes(String(genre.id)))
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }

  const data = await request(`/movie/${movie.id}/recommendations`, { page: '1' })
  const genreMap = await ensureGenreMap()
  return (data.results || []).slice(0, limit).map((item) => normalizeLive(item, genreMap))
}

export { demoGenreMap }
