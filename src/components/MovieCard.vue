<script setup>
/**
 * Cartão de filme usado na grelha de resultados e nas sugestões.
 * Apresenta cartaz, título, ano, primeiro género e classificação.
 */
import { computed } from 'vue'
import MoviePoster from './MoviePoster.vue'
import FavoriteButton from './FavoriteButton.vue'
import { formatRating, formatVotes } from '../utils/format'

const props = defineProps({
  movie: { type: Object, required: true }
})

const genreLabel = computed(() => props.movie.genres?.[0]?.name || '')
const hasRating = computed(() => Number(props.movie.rating) > 0)
</script>

<template>
  <article class="card">
    <div class="card__frame">
      <router-link
        :to="{ name: 'movie', params: { id: movie.id } }"
        class="card__link"
        :aria-label="`Ver detalhes de ${movie.title}`"
      >
        <MoviePoster :movie="movie" />
        <span class="card__shade"></span>
      </router-link>

      <FavoriteButton class="card__fav" :movie="movie" />

      <span v-if="hasRating" class="card__rating" :title="`${formatVotes(movie.votes)} votos`">
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="m12 3.6 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8L12 3.6Z" />
        </svg>
        {{ formatRating(movie.rating) }}
      </span>
      <span v-else-if="movie.year >= new Date().getFullYear()" class="card__soon">Estreia</span>
    </div>

    <div class="card__body">
      <h3 class="card__title">
        <router-link :to="{ name: 'movie', params: { id: movie.id } }">{{ movie.title }}</router-link>
      </h3>
      <p class="card__meta">
        <span>{{ movie.year || '—' }}</span>
        <template v-if="genreLabel">
          <span class="card__dot">·</span>
          <span>{{ genreLabel }}</span>
        </template>
      </p>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: fade-in 0.4s var(--ease) both;
}

.card__frame {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--surface-2);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.35s var(--ease),
    box-shadow 0.35s var(--ease),
    border-color 0.35s var(--ease);
}

.card:hover .card__frame {
  transform: translateY(-6px);
  border-color: rgba(240, 180, 41, 0.42);
  box-shadow: 0 26px 50px -26px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(240, 180, 41, 0.12);
}

.card__link {
  display: block;
  position: relative;
}

.card__link :deep(.poster img) {
  transition: transform 0.6s var(--ease), filter 0.35s var(--ease);
}

.card:hover .card__link :deep(.poster img) {
  transform: scale(1.06);
  filter: brightness(0.78);
}

.card__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(7, 8, 12, 0.85), transparent 46%);
  opacity: 0;
  transition: opacity 0.35s var(--ease);
}

.card:hover .card__shade {
  opacity: 1;
}

.card__fav {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  opacity: 0;
  transform: translateY(-4px);
  transition:
    opacity 0.28s var(--ease),
    transform 0.28s var(--ease),
    background 0.2s var(--ease),
    color 0.2s var(--ease);
}

.card:hover .card__fav,
.card__fav:focus-visible,
.card__fav.fav--active {
  opacity: 1;
  transform: none;
}

.card__rating {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 9px 4px 7px;
  border-radius: var(--radius-pill);
  background: rgba(8, 9, 13, 0.78);
  border: 1px solid rgba(240, 180, 41, 0.45);
  color: var(--gold-bright);
  font-family: var(--font-display);
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  backdrop-filter: blur(6px);
}

.card__rating svg {
  width: 12px;
  height: 12px;
}

.card__soon {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  background: rgba(87, 214, 174, 0.16);
  border: 1px solid rgba(87, 214, 174, 0.45);
  color: var(--mint);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.card__body {
  padding-inline: 2px;
}

.card__title {
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s var(--ease);
}

.card__title a:hover {
  color: var(--gold-bright);
}

.card__meta {
  margin-top: 3px;
  font-size: 0.8rem;
  color: var(--muted);
  display: flex;
  gap: 6px;
  align-items: center;
}

.card__dot {
  opacity: 0.6;
}

@media (hover: none) {
  .card__fav {
    opacity: 1;
    transform: none;
  }
}
</style>
