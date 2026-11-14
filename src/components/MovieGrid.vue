<script setup>
/**
 * Grelha de resultados (usada na pesquisa, nos filtros e nos favoritos),
 * com esqueletos de carregamento, erro e ausência de resultados.
 */
import MovieCard from './MovieCard.vue'
import StateMessage from './StateMessage.vue'

defineProps({
  movies: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  emptyTitle: { type: String, default: 'Nenhum filme encontrado' },
  emptyText: { type: String, default: 'Tenta outro termo de pesquisa ou ajusta os filtros.' },
  emptyAction: { type: String, default: '' },
  skeletonCount: { type: Number, default: 12 }
})

defineEmits(['retry', 'empty-action'])
</script>

<template>
  <div class="grid-wrap">
    <StateMessage
      v-if="error"
      variant="error"
      title="Não foi possível carregar os filmes"
      :text="error"
      action-label="Tentar novamente"
      @action="$emit('retry')"
    />

    <div v-else-if="loading" class="grid" aria-busy="true" aria-live="polite">
      <span class="visually-hidden">A carregar filmes…</span>
      <div v-for="n in skeletonCount" :key="n" class="skeleton">
        <div class="skeleton__poster"></div>
        <div class="skeleton__line"></div>
      </div>
    </div>

    <StateMessage
      v-else-if="!movies.length"
      :title="emptyTitle"
      :text="emptyText"
      :action-label="emptyAction"
      @action="$emit('empty-action')"
    />

    <TransitionGroup v-else tag="div" name="grid" class="grid" appear>
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 24px 10px;
}

.skeleton {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton__poster {
  aspect-ratio: 2 / 3;
  border-radius: var(--radius);
}

.skeleton__line {
  height: 10px;
  width: 58%;
  border-radius: 3px;
}

.skeleton__poster,
.skeleton__line {
  background-color: #151517;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.05) 45%,
    rgba(255, 255, 255, 0) 90%
  );
  background-size: 420px 100%;
  background-repeat: no-repeat;
  animation: shimmer 1.5s infinite linear;
}

@media (max-width: 560px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
    gap: 18px 8px;
  }
}
</style>
