<script setup>
/**
 * Página inicial: destaque, pesquisa, filtros combinados, categorias,
 * grelha de resultados e paginação.
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import HeroBanner from '../components/HeroBanner.vue'
import SearchBar from '../components/SearchBar.vue'
import MovieFilters from '../components/MovieFilters.vue'
import MovieGrid from '../components/MovieGrid.vue'
import PaginationBar from '../components/PaginationBar.vue'
import {
  discoverMovies,
  getCategory,
  getGenres,
  getTrending,
  isLiveMode,
  searchMovies
} from '../services/movieService'

const CATEGORIES = [
  { value: 'popular', label: 'Populares' },
  { value: 'top_rated', label: 'Melhores classificações' },
  { value: 'upcoming', label: 'Em estreia' },
  { value: 'now_playing', label: 'Em exibição' }
]

const DEFAULT_FILTERS = { genre: '', year: '', rating: 0, sort: 'popularity.desc' }

const featured = ref(null)
const heroLoading = ref(true)

const genres = ref([])
const movies = ref([])
const loading = ref(true)
const error = ref('')
const page = ref(1)
const totalPages = ref(1)
const totalResults = ref(0)

const query = ref('')
const searchTerm = ref('')
const category = ref('popular')
const filters = ref({ ...DEFAULT_FILTERS })

const searchBar = ref(null)
let debounceId = null

const hasActiveFilters = computed(
  () => Boolean(filters.value.genre) || Boolean(filters.value.year) || Number(filters.value.rating) > 0
)

const usesDiscover = computed(() => hasActiveFilters.value || filters.value.sort !== 'popularity.desc')

const activeFilterChips = computed(() => {
  const chips = []
  if (filters.value.genre) {
    const genre = genres.value.find((item) => String(item.id) === String(filters.value.genre))
    chips.push({ key: 'genre', label: genre ? genre.name : 'Género' })
  }
  if (filters.value.year) chips.push({ key: 'year', label: `Ano ${filters.value.year}` })
  if (Number(filters.value.rating) > 0) {
    chips.push({ key: 'rating', label: `Nota ≥ ${String(filters.value.rating).replace('.', ',')}` })
  }
  return chips
})

const resultsTitle = computed(() => {
  if (searchTerm.value) return `Resultados para “${searchTerm.value}”`
  if (usesDiscover.value) return 'Resultados filtrados'
  return CATEGORIES.find((item) => item.value === category.value)?.label || 'Filmes'
})

const resultsHint = computed(() => {
  if (searchTerm.value && hasActiveFilters.value) {
    return `${movies.value.length} filmes nesta página · filtros aplicados aos resultados da pesquisa`
  }
  if (totalResults.value > 0) {
    return `${totalResults.value.toLocaleString('pt-PT')} filmes encontrados`
  }
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

async function loadMovies() {
  loading.value = true
  error.value = ''
  try {
    let response
    if (searchTerm.value) {
      response = await searchMovies(searchTerm.value, page.value, filters.value)
    } else if (usesDiscover.value) {
      response = await discoverMovies({ ...filters.value, page: page.value })
    } else {
      response = await getCategory(category.value, page.value)
    }
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
  loadMovies()
}

function changePage(next) {
  page.value = next
  loadMovies()
}

function resetFilters() {
  filters.value = { ...DEFAULT_FILTERS }
  if (searchTerm.value || query.value) {
    query.value = ''
    searchTerm.value = ''
  }
}

/**
 * Escolher uma categoria limpa a pesquisa e os filtros: as categorias são um
 * ponto de partida de navegação, não um filtro adicional. Assim o clique tem
 * sempre efeito visível nos resultados.
 */
function selectCategory(value) {
  category.value = value
  resetFilters()
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

// Um único observador (lista de fontes) para que alterações simultâneas — por
// exemplo escolher uma categoria, que limpa a pesquisa e os filtros — resultem
// numa só chamada à API.
watch([searchTerm, filters, category], applyChange, { deep: true })

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
  loadMovies()
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

    <section class="toolbar section container">
      <div class="toolbar__head">
        <div>
          <span class="section__eyebrow">Catálogo</span>
          <h2 class="toolbar__title">O que vais ver hoje?</h2>
        </div>
        <div class="toolbar__search">
          <SearchBar ref="searchBar" v-model="query" />
        </div>
      </div>

      <p v-if="!isLiveMode" class="notice">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke-width="1.6" />
          <path d="M12 11v5.4M12 7.9h.01" stroke-width="1.8" stroke-linecap="round" />
        </svg>
        <span>
          <strong>Modo demonstração.</strong> Estás a explorar um catálogo local de filmes. Define
          <code>VITE_TMDB_TOKEN</code> no ficheiro <code>.env</code> para usar os dados reais do TMDB.
        </span>
      </p>

      <nav class="tabs" aria-label="Categorias de filmes">
        <button
          v-for="item in CATEGORIES"
          :key="item.value"
          class="tabs__btn"
          :class="{ 'tabs__btn--active': category === item.value && !searchTerm && !usesDiscover }"
          type="button"
          @click="selectCategory(item.value)"
        >
          {{ item.label }}
        </button>
      </nav>

      <MovieFilters
        v-model="filters"
        :genres="genres"
        :disabled="loading"
        @reset="resetFilters"
      />
    </section>

    <section class="results container">
      <div class="results__head">
        <div>
          <h2 class="results__title">{{ resultsTitle }}</h2>
          <p v-if="resultsHint" class="results__hint">{{ resultsHint }}</p>
        </div>

        <div v-if="activeFilterChips.length" class="results__chips">
          <span class="chip chip--gold results__chip-label">Filtros ativos</span>
          <button
            v-for="chip in activeFilterChips"
            :key="chip.key"
            class="chip results__chip"
            type="button"
            :aria-label="`Remover filtro ${chip.label}`"
            @click="removeFilter(chip.key)"
          >
            {{ chip.label }}
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor">
              <path d="m7 7 10 10M17 7 7 17" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <MovieGrid
        :movies="movies"
        :loading="loading"
        :error="error"
        empty-title="Nenhum filme encontrado"
        empty-text="Não encontrámos títulos com estes critérios. Experimenta outro termo ou limpa os filtros."
        :empty-action="hasActiveFilters || query ? 'Limpar pesquisa e filtros' : ''"
        @retry="loadMovies"
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
.home {
  padding-bottom: 20px;
}

.toolbar {
  padding-top: 44px;
}

.toolbar__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 26px;
  flex-wrap: wrap;
  margin-bottom: 22px;
}

.toolbar__title {
  font-size: clamp(1.5rem, 2.6vw, 2rem);
}

.toolbar__search {
  flex: 1;
  min-width: 260px;
  max-width: 460px;
}

.notice {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  margin-bottom: 18px;
  border-radius: var(--radius);
  border: 1px solid rgba(240, 180, 41, 0.28);
  background: var(--gold-soft);
  color: var(--text-soft);
  font-size: 0.83rem;
  line-height: 1.55;
}

.notice svg {
  color: var(--gold);
  flex-shrink: 0;
  margin-top: 2px;
}

.notice code {
  font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
  font-size: 0.78rem;
  padding: 1px 5px;
  border-radius: 5px;
  background: rgba(7, 8, 12, 0.55);
  color: var(--gold-bright);
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tabs__btn {
  padding: 9px 18px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--text-soft);
  font-family: var(--font-display);
  font-size: 0.83rem;
  font-weight: 500;
  transition:
    background 0.22s var(--ease),
    color 0.22s var(--ease),
    border-color 0.22s var(--ease),
    transform 0.22s var(--ease);
}

.tabs__btn:hover {
  transform: translateY(-1px);
  border-color: #3a4150;
  color: var(--text);
}

.tabs__btn--active {
  background: rgba(244, 242, 237, 0.1);
  border-color: rgba(244, 242, 237, 0.35);
  color: var(--text);
  box-shadow: inset 0 0 0 1px rgba(244, 242, 237, 0.08);
}

.results {
  padding-top: 38px;
}

.results__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 22px;
}

.results__title {
  font-size: clamp(1.25rem, 2.4vw, 1.6rem);
}

.results__hint {
  margin-top: 5px;
  font-size: 0.82rem;
  color: var(--muted);
}

.results__chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.results__chip-label {
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.68rem;
}

.results__chip {
  cursor: pointer;
  transition: border-color 0.2s var(--ease), color 0.2s var(--ease);
}

.results__chip:hover {
  border-color: var(--gold);
  color: var(--gold-bright);
}

@media (max-width: 720px) {
  .toolbar {
    padding-top: 30px;
  }

  .toolbar__search {
    max-width: none;
  }
}
</style>
