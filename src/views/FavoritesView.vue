<script setup>
/**
 * Página de favoritos (/favoritos): lê a lista guardada em localStorage e
 * permite pesquisa dentro da própria lista, remoção individual e limpeza total.
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
  if (window.confirm('Remover todos os filmes da lista de favoritos?')) clear()
}
</script>

<template>
  <div class="favorites container">
    <header class="favorites__head">
      <div>
        <span class="section__eyebrow">A minha lista</span>
        <h1 class="favorites__title">Favoritos</h1>
        <p class="favorites__sub">
          {{ count }} {{ count === 1 ? 'filme guardado' : 'filmes guardados' }} neste navegador.
          A lista é preservada em <code>localStorage</code>, mesmo depois de fechar a aplicação.
        </p>
      </div>

      <div v-if="count" class="favorites__tools">
        <div class="favorites__search">
          <SearchBar v-model="query" placeholder="Pesquisar nos favoritos…" />
        </div>
        <button class="btn btn--ghost btn--small" type="button" @click="clearAll">
          Limpar lista
        </button>
      </div>
    </header>

    <MovieGrid
      :movies="filtered"
      :skeleton-count="0"
      :empty-title="count ? 'Nenhum favorito corresponde à pesquisa' : 'Ainda não tens favoritos'"
      :empty-text="
        count
          ? 'Tenta outro termo ou limpa o campo de pesquisa.'
          : 'Explora o catálogo e toca no coração de um filme para o guardares aqui.'
      "
      :empty-action="count ? 'Limpar pesquisa' : 'Explorar filmes'"
      @empty-action="query ? (query = '') : router.push('/')"
    />
  </div>
</template>

<style scoped>
.favorites {
  padding-top: 46px;
  padding-bottom: 40px;
  min-height: 60vh;
}

.favorites__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 30px;
}

.favorites__title {
  font-size: clamp(1.9rem, 4vw, 2.6rem);
}

.favorites__sub {
  max-width: 62ch;
  margin-top: 10px;
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.65;
}

.favorites__sub code {
  font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
  font-size: 0.8rem;
  padding: 1px 5px;
  border-radius: 5px;
  background: var(--surface-2);
  color: var(--gold-bright);
}

.favorites__tools {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.favorites__search {
  min-width: 250px;
  flex: 1;
}

@media (max-width: 640px) {
  .favorites__tools {
    width: 100%;
  }
}
</style>
