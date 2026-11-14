<script setup>
/**
 * Apresentação completa dos dados de um filme: cartaz, sinopse, géneros,
 * classificação, duração, realização, elenco e restantes informações
 * disponibilizadas pela API.
 */
import { computed } from 'vue'
import MoviePoster from './MoviePoster.vue'
import FavoriteButton from './FavoriteButton.vue'
import { backdropUrl } from '../services/movieService'
import {
  formatDate,
  formatMoney,
  formatRating,
  formatRuntime,
  formatVotes
} from '../utils/format'

const props = defineProps({
  movie: { type: Object, required: true }
})

const backdrop = computed(() => backdropUrl(props.movie.backdrop, 'w1280'))
const hasRating = computed(() => Number(props.movie.rating) > 0)
const scoreWidth = computed(() => `${Math.min(100, (Number(props.movie.rating) / 10) * 100)}%`)

const facts = computed(() => {
  const items = [
    { label: 'Realização', value: props.movie.director || 'Não disponível' },
    { label: 'Duração', value: formatRuntime(props.movie.runtime) },
    { label: 'Lançamento', value: formatDate(props.movie.releaseDate) },
    { label: 'Estado', value: props.movie.status || '—' },
    { label: 'Idioma original', value: props.movie.originalLanguage || '—' }
  ]
  if (props.movie.budget) items.push({ label: 'Orçamento', value: formatMoney(props.movie.budget) })
  if (props.movie.revenue) items.push({ label: 'Receita', value: formatMoney(props.movie.revenue) })
  if (props.movie.productionCompanies?.length) {
    items.push({ label: 'Produtoras', value: props.movie.productionCompanies.slice(0, 3).join(', ') })
  }
  // Ocultar campos sem informação (comum no catálogo de demonstração).
  return items.filter((item) => item.value && item.value !== '—')
})
</script>

<template>
  <article class="details">
    <div class="details__backdrop" :class="{ 'details__backdrop--art': !backdrop }">
      <div
        v-if="backdrop"
        class="details__backdrop-img"
        :style="{ backgroundImage: `url(${backdrop})` }"
      ></div>
      <div class="details__backdrop-veil"></div>
    </div>

    <div class="container details__inner">
      <router-link to="/" class="details__back">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor">
          <path d="M10 6 4 12l6 6M4 12h15" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Voltar à exploração
      </router-link>

      <div class="details__layout">
        <aside class="details__aside">
          <div class="details__poster">
            <MoviePoster :movie="movie" size="w780" />
          </div>

          <div class="details__actions">
            <FavoriteButton :movie="movie" label />
            <a
              v-if="movie.trailer"
              class="btn btn--ghost"
              :href="movie.trailer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M8 5.2v13.6L19 12 8 5.2Z" />
              </svg>
              Ver trailer
            </a>
          </div>

          <div class="details__score">
            <div class="details__score-head">
              <span class="details__score-value">{{ formatRating(movie.rating) }}</span>
              <span class="details__score-max">/ 10</span>
            </div>
            <div
              class="details__score-bar"
              role="img"
              :aria-label="`Classificação ${formatRating(movie.rating)} em 10`"
            >
              <span :style="{ width: scoreWidth }"></span>
            </div>
            <p class="details__score-votes">
              {{ hasRating ? `${formatVotes(movie.votes)} votos no TMDB` : 'Ainda sem classificação' }}
            </p>
          </div>
        </aside>

        <div class="details__main">
          <span class="details__eyebrow">Ficha do filme</span>
          <h1 class="details__title">{{ movie.title }}</h1>
          <p v-if="movie.originalTitle && movie.originalTitle !== movie.title" class="details__original">
            Título original: {{ movie.originalTitle }}
          </p>
          <p v-if="movie.tagline" class="details__tagline">“{{ movie.tagline }}”</p>

          <div class="details__genres">
            <span v-for="genre in movie.genres" :key="genre.id" class="chip chip--gold">
              {{ genre.name }}
            </span>
            <span v-if="movie.year" class="chip">{{ movie.year }}</span>
          </div>

          <section class="details__block">
            <h2 class="details__h2">Sinopse</h2>
            <p class="details__synopsis">
              {{ movie.overview || 'Sinopse ainda não disponível para este título.' }}
            </p>
          </section>

          <section class="details__block">
            <h2 class="details__h2">Informação</h2>
            <dl class="details__facts">
              <div v-for="fact in facts" :key="fact.label" class="details__fact">
                <dt>{{ fact.label }}</dt>
                <dd>{{ fact.value }}</dd>
              </div>
            </dl>
          </section>

          <section v-if="movie.cast?.length" class="details__block">
            <h2 class="details__h2">Elenco principal</h2>
            <ul class="details__cast">
              <li v-for="person in movie.cast" :key="person">{{ person }}</li>
            </ul>
          </section>

          <p v-if="movie.imdbId || movie.homepage" class="details__links">
            <a
              v-if="movie.imdbId"
              :href="`https://www.imdb.com/title/${movie.imdbId}/`"
              target="_blank"
              rel="noopener noreferrer"
            >
              Página no IMDb ↗
            </a>
            <a
              v-if="movie.homepage"
              :href="movie.homepage"
              target="_blank"
              rel="noopener noreferrer"
            >
              Site oficial ↗
            </a>
          </p>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.details {
  position: relative;
  padding-bottom: 20px;
}

.details__backdrop {
  position: absolute;
  inset: 0 0 auto;
  height: 420px;
  overflow: hidden;
  z-index: 0;
}

.details__backdrop--art {
  background:
    radial-gradient(80% 120% at 70% 0%, rgba(240, 180, 41, 0.22), transparent 60%),
    linear-gradient(160deg, #12131a, #08090d);
}

.details__backdrop-img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center 25%;
  filter: saturate(1.05);
  opacity: 0.5;
}

.details__backdrop-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(7, 8, 12, 0.55), rgba(7, 8, 12, 0.85) 55%, var(--ink) 96%);
}

.details__inner {
  position: relative;
  z-index: 1;
  padding-top: 26px;
}

.details__back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px 8px 10px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--line);
  background: rgba(16, 18, 25, 0.7);
  color: var(--text-soft);
  font-size: 0.83rem;
  font-weight: 500;
  backdrop-filter: blur(8px);
  transition: background 0.2s var(--ease), color 0.2s var(--ease), transform 0.2s var(--ease);
}

.details__back:hover {
  background: var(--surface-3);
  color: var(--text);
  transform: translateX(-2px);
}

.details__layout {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 44px;
  margin-top: 34px;
  animation: fade-up 0.6s var(--ease) both;
}

.details__poster {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: var(--shadow-lg);
}

.details__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.details__score {
  margin-top: 18px;
  padding: 16px;
  border-radius: var(--radius);
  border: 1px solid var(--line-soft);
  background: var(--surface);
}

.details__score-head {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.details__score-value {
  font-family: var(--font-display);
  font-size: 1.9rem;
  font-weight: 700;
  color: var(--gold-bright);
  line-height: 1;
}

.details__score-max {
  font-size: 0.85rem;
  color: var(--muted);
}

.details__score-bar {
  height: 6px;
  margin-top: 12px;
  border-radius: var(--radius-pill);
  background: var(--surface-3);
  overflow: hidden;
}

.details__score-bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--gold), var(--gold-bright));
  transition: width 0.8s var(--ease);
}

.details__score-votes {
  margin-top: 9px;
  font-size: 0.76rem;
  color: var(--muted);
}

.details__eyebrow {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 12px;
}

.details__title {
  font-size: clamp(1.9rem, 4.4vw, 3rem);
  line-height: 1.05;
  text-wrap: balance;
}

.details__original {
  margin-top: 8px;
  font-size: 0.86rem;
  color: var(--muted);
}

.details__tagline {
  margin-top: 14px;
  font-family: var(--font-display);
  font-size: 1rem;
  font-style: italic;
  color: var(--text-soft);
}

.details__genres {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.details__block {
  margin-top: 30px;
}

.details__h2 {
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 12px;
  font-weight: 600;
}

.details__synopsis {
  max-width: 68ch;
  color: var(--text-soft);
  line-height: 1.75;
  font-size: 0.97rem;
}

.details__facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1px;
  background: var(--line-soft);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius);
  overflow: hidden;
}

.details__fact {
  padding: 13px 16px;
  background: var(--surface);
}

.details__fact dt {
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 4px;
}

.details__fact dd {
  font-size: 0.9rem;
  color: var(--text);
  line-height: 1.4;
}

.details__cast {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.details__cast li {
  padding: 7px 14px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--line);
  background: var(--surface);
  font-size: 0.83rem;
  color: var(--text-soft);
}

.details__links {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 30px;
  font-size: 0.86rem;
}

.details__links a {
  color: var(--gold-bright);
  border-bottom: 1px solid rgba(240, 180, 41, 0.35);
  padding-bottom: 2px;
  transition: border-color 0.2s var(--ease), color 0.2s var(--ease);
}

.details__links a:hover {
  border-color: var(--gold-bright);
  color: #fff;
}

@media (max-width: 880px) {
  .details__layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .details__aside {
    display: grid;
    grid-template-columns: 160px minmax(0, 1fr);
    gap: 20px;
    align-items: start;
  }

  .details__actions,
  .details__score {
    margin-top: 0;
  }

  .details__score {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .details__aside {
    grid-template-columns: 128px minmax(0, 1fr);
    gap: 14px;
  }

  .details__backdrop {
    height: 300px;
  }
}
</style>
