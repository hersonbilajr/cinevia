<script setup>
/**
 * Secção de destaque da página inicial: filme principal em grande formato,
 * com imagem de fundo (ou composição gráfica quando não existe imagem).
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
    <div class="hero__bg" :class="{ 'hero__bg--art': !backdrop }" :style="backdrop ? { backgroundImage: `url(${backdrop})` } : null">
      <span v-if="!backdrop && !loading" class="hero__ring" aria-hidden="true"></span>
    </div>
    <div class="hero__veil" aria-hidden="true"></div>

    <div class="hero__content container">
      <template v-if="loading">
        <div class="hero__skeleton">
          <span class="hero__skeleton-line hero__skeleton-line--sm"></span>
          <span class="hero__skeleton-line hero__skeleton-line--lg"></span>
          <span class="hero__skeleton-line"></span>
          <span class="hero__skeleton-line"></span>
        </div>
      </template>

      <template v-else-if="movie">
        <span class="hero__badge">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
            <path d="m12 3 2.6 6.1 6.6.5-5 4.3 1.5 6.5L12 17l-5.7 3.4 1.5-6.5-5-4.3 6.6-.5L12 3Z" />
          </svg>
          Em destaque
        </span>

        <h1 id="hero-title" class="hero__title">{{ movie.title }}</h1>

        <div class="hero__meta">
          <span v-if="hasRating" class="hero__rating">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
              <path d="m12 3.6 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8L12 3.6Z" />
            </svg>
            {{ formatRating(movie.rating) }}
            <span class="hero__votes">({{ formatVotes(movie.votes) }})</span>
          </span>
          <span v-if="movie.year">{{ movie.year }}</span>
          <span v-if="movie.runtime">{{ formatRuntime(movie.runtime) }}</span>
          <span v-for="genre in genres" :key="genre.id" class="hero__genre">{{ genre.name }}</span>
        </div>

        <p class="hero__overview text-clamp-3">
          {{ movie.overview || 'Sinopse ainda não disponível para este título.' }}
        </p>

        <div class="hero__actions">
          <router-link
            :to="{ name: 'movie', params: { id: movie.id } }"
            class="btn btn--primary"
          >
            <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
              <path d="M8 5.2v13.6L19 12 8 5.2Z" />
            </svg>
            Ver detalhes
          </router-link>
          <FavoriteButton :movie="movie" label />
        </div>
      </template>

      <template v-else>
        <h1 id="hero-title" class="hero__title">Descobre o teu próximo filme</h1>
        <p class="hero__overview">
          Pesquisa, filtra por género, ano e classificação, e guarda os teus favoritos.
        </p>
      </template>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: min(76vh, 620px);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  border-bottom: 1px solid var(--line-soft);
  isolation: isolate;
}

.hero__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center 22%;
  transform: scale(1.04);
  animation: hero-zoom 22s ease-out both;
}

.hero__bg--art {
  background:
    radial-gradient(90% 120% at 78% 8%, rgba(240, 180, 41, 0.28), transparent 58%),
    radial-gradient(70% 90% at 12% 90%, rgba(87, 214, 174, 0.18), transparent 62%),
    linear-gradient(140deg, #10100f, #0a0b10 60%);
}

.hero__ring {
  position: absolute;
  right: -8%;
  top: 50%;
  width: min(560px, 62vw);
  aspect-ratio: 1;
  transform: translateY(-50%);
  border-radius: 50%;
  border: 1px solid rgba(240, 180, 41, 0.22);
  box-shadow:
    inset 0 0 0 60px rgba(240, 180, 41, 0.03),
    inset 0 0 0 61px rgba(240, 180, 41, 0.12);
}

.hero__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, var(--ink) 2%, rgba(7, 8, 12, 0.72) 42%, rgba(7, 8, 12, 0.25) 78%),
    linear-gradient(100deg, rgba(7, 8, 12, 0.92) 8%, rgba(7, 8, 12, 0.28) 62%, transparent);
}

.hero__content {
  position: relative;
  z-index: 2;
  padding-block: 56px 52px;
  max-width: calc(var(--container));
  animation: fade-up 0.75s var(--ease) both;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 13px;
  margin-bottom: 16px;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(240, 180, 41, 0.45);
  background: rgba(240, 180, 41, 0.13);
  color: var(--gold-bright);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  backdrop-filter: blur(6px);
}

.hero__title {
  max-width: 17ch;
  font-size: clamp(2.1rem, 5.2vw, 3.9rem);
  letter-spacing: -0.03em;
  line-height: 1.02;
  text-wrap: balance;
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 14px;
  margin-top: 18px;
  font-size: 0.86rem;
  color: var(--text-soft);
}

.hero__meta > span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.hero__rating {
  color: var(--gold-bright);
  font-weight: 600;
}

.hero__votes {
  color: var(--muted);
  font-weight: 400;
  font-size: 0.8rem;
}

.hero__genre {
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.76rem;
}

.hero__overview {
  max-width: 56ch;
  margin-top: 16px;
  color: var(--text-soft);
  font-size: 0.96rem;
  line-height: 1.65;
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
}

.hero__skeleton-line {
  height: 14px;
  border-radius: 8px;
  width: 100%;
  background-color: var(--surface-2);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.07) 45%,
    rgba(255, 255, 255, 0) 90%
  );
  background-size: 420px 100%;
  background-repeat: no-repeat;
  animation: shimmer 1.5s infinite linear;
}

.hero__skeleton-line--sm {
  width: 120px;
  height: 22px;
}

.hero__skeleton-line--lg {
  width: 78%;
  height: 46px;
}

@keyframes hero-zoom {
  from {
    transform: scale(1.12);
  }
  to {
    transform: scale(1.04);
  }
}

@media (max-width: 720px) {
  .hero {
    min-height: 72vh;
  }

  .hero__content {
    padding-block: 44px 40px;
  }

  .hero__title {
    max-width: 100%;
  }
}
</style>
