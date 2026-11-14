<script setup>
/**
 * Página "A minha lista" (/favoritos): lê os favoritos de localStorage,
 * permite pesquisa dentro da lista e limpeza total.
 */
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import MovieGrid from '../components/MovieGrid.vue'
import SearchBar from '../components/SearchBar.vue'
import { useFavorites } from '../composables/useFavorites'

const router = useRouter()
const { favorites, count, clear } = useFavorites()

const query = ref('')

const filtered = computed(() => {
  const term = query.value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
  if (!term) return favorites.value
  return favorites.value.filter((movie) =>
    movie.title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .includes(term)
  )
})

function clearAll() {
  if (window.confirm('Remover todos os filmes da lista?')) clear()
}
</script>

<template>
  <div class="favorites container">
    <header class="favorites__head">
      <div>
        <span class="section__eyebrow">A minha lista</span>
        <h1 class="favorites__title">Guardados para ver</h1>
        <p class="favorites__sub">
          {{ count }} {{ count === 1 ? 'filme guardado' : 'filmes guardados' }} neste navegador —
          a lista fica em <code>localStorage</code>, mesmo depois de fechares a aplicação.
        </p>
      </div>

      <div v-if="count" class="favorites__tools">
        <div class="favorites__search">
          <SearchBar v-model="query" placeholder="Pesquisar na lista…" />
        </div>
        <button class="btn btn--ghost btn--small" type="button" @click="clearAll">Limpar lista</button>
      </div>
    </header>

    <MovieGrid
      :movies="filtered"
      :skeleton-count="0"
      :empty-title="count ? 'Nada corresponde à pesquisa' : 'A tua lista está vazia'"
      :empty-text="
        count
          ? 'Tenta outro termo ou limpa o campo de pesquisa.'
          : 'Passa o rato sobre um cartaz e usa o «+» para guardares filmes aqui.'
      "
      :empty-action="count ? 'Limpar pesquisa' : 'Explorar filmes'"
      @empty-action="query ? (query = '') : router.push('/')"
    />
  </div>
</template>

<style scoped>
.favorites {
  padding-top: calc(var(--nav-height) + 34px);
  padding-bottom: 50px;
  min-height: 70vh;
}

.favorites__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 22px;
  margin-bottom: 26px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line-soft);
}

.favorites__title {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  font-weight: 800;
}

.favorites__sub {
  max-width: 60ch;
  margin-top: 8px;
  font-size: 0.86rem;
  color: var(--muted);
  line-height: 1.6;
}

.favorites__sub code {
  font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
  font-size: 0.78rem;
  padding: 1px 5px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-soft);
}

.favorites__tools {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.favorites__search {
  min-width: 240px;
  flex: 1;
}

@media (max-width: 640px) {
  .favorites__tools {
    width: 100%;
  }
}
</style>
