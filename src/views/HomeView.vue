<script setup>
/**
 * Página inicial: destaque em grande plano, filas horizontais por categoria
 * (estilo plataforma de streaming) e, quando há pesquisa ou filtros activos,
 * uma grelha de resultados com paginação.
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import HeroBanner from '../components/HeroBanner.vue'
import SearchBar from '../components/SearchBar.vue'
import MovieFilters from '../components/MovieFilters.vue'
import MovieGrid from '../components/MovieGrid.vue'
import MovieRow from '../components/MovieRow.vue'
import PaginationBar from '../components/PaginationBar.vue'
import StateMessage from '../components/StateMessage.vue'
import {
  discoverMovies,
  getCategory,
  getGenres,
  getTrending,
  isLiveMode,
  searchMovies
} from '../services/movieService'

const SECTIONS = [
  { key: 'popular', title: 'Populares agora' },
  { key: 'top_rated', title: 'Melhores classificações' },
  { key: 'upcoming', title: 'Em estreia' },
  { key: 'now_playing', title: 'Em exibição' }
]

const DEFAULT_FILTERS = { genre: '', year: '', rating: 0, sort: 'popularity.desc' }

const featured = ref(null)
const heroLoading = ref(true)

const genres = ref([])
const rows = ref([])
const rowsLoading = ref(true)
const rowsError = ref('')

const movies = ref([])
const loading = ref(false)
const error = ref('')
const page = ref(1)
const totalPages = ref(1)
const totalResults = ref(0)

const query = ref('')
const searchTerm = ref('')
const filters = ref({ ...DEFAULT_FILTERS })
const searchBar = ref(null)
let debounceId = null

const hasActiveFilters = computed(
  () => Boolean(filters.value.genre) || Boolean(filters.value.year) || Number(filters.value.rating) > 0
)

/** Modo "filas" (navegação) vs. modo "resultados" (pesquisa ou filtros). */
const browsing = computed(
  () => !searchTerm.value && !hasActiveFilters.value && filters.value.sort === 'popularity.desc'
)

const activeFilterChips = computed(() => {
  const chips = []
  if (filters.value.genre) {
    const genre = genres.value.find((item) => String(item.id) === String(filters.value.genre))
    chips.push({ key: 'genre', label: genre ? genre.name : 'Género' })
  }
  if (filters.value.year) chips.push({ key: 'year', label: filters.value.year })
  if (Number(filters.value.rating) > 0) {
    chips.push({ key: 'rating', label: `Nota ${String(filters.value.rating).replace('.', ',')}+` })
  }
  return chips
})

const resultsTitle = computed(() => {
  if (searchTerm.value) return `Resultados para “${searchTerm.value}”`
  return 'Resultados filtrados'
})

const resultsHint = computed(() => {
  if (searchTerm.value && hasActiveFilters.value) {
    return `${movies.value.length} filmes nesta página · filtros aplicados aos resultados da pesquisa`
  }
  if (totalResults.value > 0) return `${totalResults.value.toLocaleString('pt-PT')} filmes encontrados`
  return ''
})

/* ---------------------------------------------------------------- dados --- */

async function loadHero() {
  heroLoading.value = true
  try {
    const trending = await getTrending()
    featured.value = trending?.[0] || null
  } catch {
    featured.value = null
  } finally {
    heroLoading.value = false
  }
}

async function loadRows() {
  rowsLoading.value = true
  rowsError.value = ''
  try {
    const lists = await Promise.all(
      SECTIONS.map(async (section) => {
        const response = await getCategory(section.key, 1)
        return { ...section, movies: response.results || [] }
      })
    )
    rows.value = lists.filter((row) => row.movies.length)
  } catch (err) {
    rowsError.value = err?.message || 'Não foi possível carregar as categorias.'
    rows.value = []
  } finally {
    rowsLoading.value = false
  }
}

async function loadResults() {
  loading.value = true
  error.value = ''
  try {
    const response = searchTerm.value
      ? await searchMovies(searchTerm.value, page.value, filters.value)
      : await discoverMovies({ ...filters.value, page: page.value })
    movies.value = response.results || []
    totalPages.value = response.totalPages || 1
    totalResults.value = response.totalResults || movies.value.length
    page.value = response.page || page.value
  } catch (err) {
    error.value = err?.message || 'Ocorreu um erro inesperado ao obter os filmes.'
    movies.value = []
  } finally {
    loading.value = false
  }
}

function applyChange() {
  page.value = 1
  if (browsing.value) {
    movies.value = []
    if (!rows.value.length) loadRows()
  } else {
    loadResults()
  }
}

function changePage(next) {
  page.value = next
  loadResults()
}

function resetFilters() {
  filters.value = { ...DEFAULT_FILTERS }
  if (query.value) query.value = ''
  if (searchTerm.value) searchTerm.value = ''
}

function removeFilter(key) {
  if (key === 'rating') filters.value = { ...filters.value, rating: 0 }
  else filters.value = { ...filters.value, [key]: '' }
}

/* -------------------------------------------------------------- efeitos --- */

watch(query, (value) => {
  clearTimeout(debounceId)
  debounceId = setTimeout(() => {
    const term = (value || '').trim()
    if (term !== searchTerm.value) searchTerm.value = term
  }, 420)
})

watch([searchTerm, filters], applyChange, { deep: true })

function onKeydown(event) {
  const tag = document.activeElement?.tagName
  const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
  if (event.key === '/' && !typing) {
    event.preventDefault()
    searchBar.value?.focus()
  }
}

onMounted(async () => {
  window.addEventListener('keydown', onKeydown)
  loadHero()
  loadRows()
  try {
    genres.value = await getGenres()
  } catch {
    genres.value = []
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  clearTimeout(debounceId)
})
</script>

<template>
  <div class="home">
    <HeroBanner :movie="featured" :loading="heroLoading" />

    <section class="controls container" aria-label="Pesquisa e filtros">
      <div class="controls__search">
        <SearchBar ref="searchBar" v-model="query" />
      </div>
      <MovieFilters v-model="filters" :genres="genres" @reset="resetFilters" />

      <p v-if="!isLiveMode" class="notice">
        <span class="notice__dot" aria-hidden="true"></span>
        <span>
          Catálogo local de demonstração. Define <code>VITE_TMDB_TOKEN</code> no ficheiro
          <code>.env</code> para usar os dados reais do TMDB.
        </span>
      </p>
    </section>

    <section v-if="browsing" class="rows container">
      <StateMessage
        v-if="rowsError"
        variant="error"
        title="Não foi possível carregar as categorias"
        :text="rowsError"
        action-label="Tentar novamente"
        @action="loadRows"
      />
      <template v-else>
        <MovieRow
          v-for="row in rows"
          :key="row.key"
          :title="row.title"
          :movies="row.movies"
          :loading="rowsLoading"
        />
        <div v-if="rowsLoading" class="rows__loading">
          <MovieRow title="Populares agora" :movies="[]" loading />
        </div>
      </template>
    </section>

    <section v-else class="results container" aria-live="polite">
      <header class="results__head">
        <div>
          <h2 class="results__title">{{ resultsTitle }}</h2>
          <p v-if="resultsHint" class="results__hint">{{ resultsHint }}</p>
        </div>
        <div v-if="activeFilterChips.length" class="results__chips">
          <button
            v-for="chip in activeFilterChips"
            :key="chip.key"
            class="chip"
            type="button"
            :aria-label="`Remover filtro ${chip.label}`"
            @click="removeFilter(chip.key)"
          >
            {{ chip.label }}
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor">
              <path d="m7 7 10 10M17 7 7 17" stroke-width="2.2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <MovieGrid
        :movies="movies"
        :loading="loading"
        :error="error"
        empty-title="Nenhum filme encontrado"
        empty-text="Não existem títulos com estes critérios. Experimenta outro termo ou limpa os filtros."
        :empty-action="hasActiveFilters || query ? 'Limpar pesquisa e filtros' : ''"
        @retry="loadResults"
        @empty-action="resetFilters"
      />

      <PaginationBar
        v-if="!loading && !error"
        :page="page"
        :total-pages="totalPages"
        :disabled="loading"
        @update:page="changePage"
      />
    </section>
  </div>
</template>

<style scoped>
.controls {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-block: 18px 6px;
}

.controls__search {
  max-width: 420px;
}

.notice {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-left: 3px solid var(--red);
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--muted);
  font-size: 0.78rem;
  line-height: 1.5;
}

.notice__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--red);
  flex-shrink: 0;
}

.notice code {
  font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
  font-size: 0.74rem;
  padding: 1px 5px;
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.6);
  color: var(--text-soft);
}

.rows {
  padding-block: 26px 10px;
}

.rows__loading {
  margin-top: 6px;
}

.results {
  padding-block: 30px 10px;
}

.results__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 20px;
}

.results__title {
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  font-weight: 700;
}

.results__hint {
  margin-top: 5px;
  font-size: 0.8rem;
  color: var(--dim);
}

.results__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.results__chips .chip {
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.16);
}

.results__chips .chip:hover {
  border-color: var(--red);
  color: #fff;
}

@media (max-width: 720px) {
  .controls__search {
    max-width: none;
  }

  .notice span:last-child {
    font-size: 0.74rem;
  }
}
</style>
