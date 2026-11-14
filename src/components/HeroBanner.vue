<script setup>
/**
 * Destaque da página inicial: imagem de fundo em grande plano, título enorme
 * e duas ações principais, sobre um gradiente escuro.
 */
import { computed } from 'vue'
import FavoriteButton from './FavoriteButton.vue'
import { backdropUrl } from '../services/movieService'
import { formatRating, formatRuntime, formatVotes } from '../utils/format'

const props = defineProps({
  movie: { type: Object, default: null },
  loading: { type: Boolean, default: false }
})

const backdrop = computed(() => backdropUrl(props.movie?.backdrop, 'w1280'))
const genres = computed(() => (props.movie?.genres || []).slice(0, 3))
const hasRating = computed(() => Number(props.movie?.rating) > 0)
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div
      class="hero__bg"
      :class="{ 'hero__bg--art': !backdrop }"
      :style="backdrop ? { backgroundImage: `url(${backdrop})` } : null"
      aria-hidden="true"
    ></div>
    <div class="hero__veil" aria-hidden="true"></div>

    <div class="hero__content container">
      <template v-if="loading">
        <div class="hero__skeleton">
          <span class="hero__skeleton-line hero__skeleton-line--lg"></span>
          <span class="hero__skeleton-line"></span>
          <span class="hero__skeleton-line hero__skeleton-line--sm"></span>
        </div>
      </template>

      <template v-else-if="movie">
        <span class="hero__eyebrow">
          <span class="hero__mark">C</span>
          Filme em destaque
        </span>

        <h1 id="hero-title" class="hero__title">{{ movie.title }}</h1>

        <div class="hero__meta">
          <span v-if="hasRating" class="hero__rating">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
              <path d="m12 3.6 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8L12 3.6Z" />
            </svg>
            {{ formatRating(movie.rating) }}
          </span>
          <span v-if="movie.year">{{ movie.year }}</span>
          <span v-if="movie.runtime">{{ formatRuntime(movie.runtime) }}</span>
          <span class="hero__votes">{{ formatVotes(movie.votes || 0) }} votos</span>
          <span v-for="genre in genres" :key="genre.id" class="hero__genre">{{ genre.name }}</span>
        </div>

        <p class="hero__overview text-clamp-3">
          {{ movie.overview || 'Sinopse ainda não disponível para este título.' }}
        </p>

        <div class="hero__actions">
          <router-link :to="{ name: 'movie', params: { id: movie.id } }" class="btn btn--primary">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M8 5.2v13.6L19 12 8 5.2Z" />
            </svg>
            Ver detalhes
          </router-link>
          <FavoriteButton :movie="movie" label />
        </div>
      </template>

      <template v-else>
        <h1 id="hero-title" class="hero__title">Filmes para hoje à noite</h1>
        <p class="hero__overview">
          Pesquisa, filtra por género, ano e classificação, e guarda os títulos na tua lista.
        </p>
      </template>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: min(84vh, 720px);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  background: #000;
}

.hero__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center 18%;
  transform: scale(1.02);
}

.hero__bg--art {
  background:
    radial-gradient(75% 100% at 82% 0%, rgba(229, 9, 20, 0.35), transparent 58%),
    radial-gradient(60% 80% at 8% 100%, rgba(255, 255, 255, 0.06), transparent 62%),
    linear-gradient(150deg, #17171b, #050506 70%);
}

.hero__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, #0b0b0d 1%, rgba(11, 11, 13, 0.75) 26%, rgba(11, 11, 13, 0.1) 62%),
    linear-gradient(95deg, rgba(0, 0, 0, 0.92) 4%, rgba(0, 0, 0, 0.5) 46%, rgba(0, 0, 0, 0) 74%);
}

.hero__content {
  position: relative;
  z-index: 2;
  padding-block: calc(var(--nav-height) + 40px) 62px;
  max-width: var(--container);
  animation: fade-up 0.7s var(--ease) both;
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 16px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--text-soft);
}

.hero__mark {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background: var(--red);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0;
}

.hero__title {
  max-width: 15ch;
  font-size: clamp(2.4rem, 5.6vw, 4.6rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.035em;
  text-wrap: balance;
  text-shadow: 0 4px 26px rgba(0, 0, 0, 0.55);
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 16px;
  margin-top: 18px;
  font-size: 0.85rem;
  color: var(--text-soft);
}

.hero__meta > span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.hero__rating {
  color: #fff;
  font-weight: 700;
}

.hero__rating svg {
  color: var(--red);
}

.hero__votes {
  color: var(--muted);
}

.hero__genre {
  padding: 2px 8px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 2px;
  font-size: 0.72rem;
  color: var(--text-soft);
}

.hero__overview {
  max-width: 54ch;
  margin-top: 16px;
  color: var(--text-soft);
  font-size: 0.98rem;
  line-height: 1.6;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 26px;
}

.hero__skeleton {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 520px;
  padding-top: 30px;
}

.hero__skeleton-line {
  height: 12px;
  width: 100%;
  border-radius: 3px;
  background-color: #e9e9e9;
  opacity: 0.12;
}

.hero__skeleton-line--lg {
  width: 74%;
  height: 54px;
}

.hero__skeleton-line--sm {
  width: 40%;
}

@media (max-width: 720px) {
  .hero {
    min-height: 78vh;
  }

  .hero__content {
    padding-bottom: 40px;
  }

  .hero__title {
    max-width: 100%;
  }

  .hero__overview {
    display: none;
  }
}
</style>
