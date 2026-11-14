<script setup>
import { computed } from 'vue'
import MoviePoster from './MoviePoster.vue'
import FavoriteButton from './FavoriteButton.vue'
import { formatRating, formatVotes } from '../utils/format'

const props = defineProps({
  movie: { type: Object, required: true }
})

const genreLabel = computed(() => props.movie.genres?.[0]?.name || '')
const hasRating = computed(() => Number(props.movie.rating) >= 1)
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
        <span class="card__title-overlay">{{ movie.title }}</span>
      </router-link>

      <span v-if="hasRating" class="card__rating" :title="`${formatVotes(movie.votes)} votos`">
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="m12 3.6 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8L12 3.6Z" />
        </svg>
        {{ formatRating(movie.rating) }}
      </span>
      <span v-else class="card__soon">Estreia</span>

      <FavoriteButton class="card__fav" :movie="movie" />
    </div>

    <div class="card__meta">
      <span class="card__year">{{ movie.year || '—' }}</span>
      <span v-if="genreLabel" class="card__genre">{{ genreLabel }}</span>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: block;
}

.card__frame {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--surface-2);
  transition:
    transform 0.3s var(--ease),
    box-shadow 0.3s var(--ease);
}

.card:hover .card__frame {
  transform: scale(1.055);
  box-shadow: 0 18px 40px -18px rgba(0, 0, 0, 1);
  z-index: 3;
}

.card__link {
  display: block;
  position: relative;
}

.card__link :deep(.poster img) {
  transition: filter 0.3s var(--ease);
}

.card:hover .card__link :deep(.poster img) {
  filter: brightness(0.82);
}

.card__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent 55%);
  opacity: 0;
  transition: opacity 0.3s var(--ease);
}

.card__title-overlay {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 9px;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.25;
  color: #fff;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.28s var(--ease), transform 0.28s var(--ease);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
}

.card:hover .card__shade,
.card:hover .card__title-overlay {
  opacity: 1;
  transform: none;
}

.card__rating {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 3px 7px;
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.72);
  color: #fff;
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.card__rating svg {
  width: 10px;
  height: 10px;
  color: var(--red);
}

.card__soon {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  padding: 3px 7px;
  border-radius: var(--radius-sm);
  background: var(--red);
  color: #fff;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.card__fav {
  position: absolute;
  top: 6px;
  left: 6px;
  z-index: 3;
  opacity: 0;
  transition: opacity 0.22s var(--ease), background 0.2s var(--ease), color 0.2s var(--ease);
}

.card:hover .card__fav,
.card__fav:focus-visible,
.card__fav.fav--active {
  opacity: 1;
}

.card__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 2px 0;
  font-size: 0.74rem;
  color: var(--dim);
  white-space: nowrap;
  overflow: hidden;
}

.card__year {
  color: var(--muted);
  font-weight: 600;
}

.card__genre {
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (hover: none) {
  .card__fav {
    opacity: 1;
  }

  .card__title-overlay {
    opacity: 1;
    transform: none;
  }
}
</style>
