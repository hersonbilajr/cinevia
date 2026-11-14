<script setup>
/**
 * Ficha do filme: fundo em grande plano com título e ações, seguido de
 * cartaz, sinopse, informação técnica e elenco.
 */
import { computed } from 'vue'
import MoviePoster from './MoviePoster.vue'
import FavoriteButton from './FavoriteButton.vue'
import { backdropUrl } from '../services/movieService'
import { formatDate, formatMoney, formatRating, formatRuntime, formatVotes } from '../utils/format'

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
  return items.filter((item) => item.value && item.value !== '—')
})
</script>

<template>
  <article class="details">
    <div class="details__hero">
      <div
        class="details__bg"
        :class="{ 'details__bg--art': !backdrop }"
        :style="backdrop ? { backgroundImage: `url(${backdrop})` } : null"
        aria-hidden="true"
      ></div>
      <div class="details__veil" aria-hidden="true"></div>

      <div class="details__hero-inner container">
        <router-link to="/" class="details__back">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor">
            <path d="M10 6 4 12l6 6M4 12h15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Início
        </router-link>

        <h1 class="details__title">{{ movie.title }}</h1>
        <p v-if="movie.originalTitle && movie.originalTitle !== movie.title" class="details__original">
          {{ movie.originalTitle }}
        </p>
        <p v-if="movie.tagline" class="details__tagline">“{{ movie.tagline }}”</p>

        <div class="details__meta">
          <span v-if="movie.year">{{ movie.year }}</span>
          <span v-if="movie.runtime">{{ formatRuntime(movie.runtime) }}</span>
          <span v-if="hasRating" class="details__meta-rating">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true">
              <path d="m12 3.6 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8L12 3.6Z" />
            </svg>
            {{ formatRating(movie.rating) }}
          </span>
          <span v-for="genre in movie.genres" :key="genre.id" class="details__genre">{{ genre.name }}</span>
        </div>

        <div class="details__actions">
          <FavoriteButton :movie="movie" label />
          <a
            v-if="movie.trailer"
            class="btn btn--primary"
            :href="movie.trailer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
              <path d="M8 5.2v13.6L19 12 8 5.2Z" />
            </svg>
            Ver trailer
          </a>
        </div>
      </div>
    </div>

    <div class="container details__body">
      <div class="details__layout">
        <aside class="details__aside">
          <div class="details__poster">
            <MoviePoster :movie="movie" size="w780" />
          </div>
          <div class="details__score">
            <div class="details__score-head">
              <span class="details__score-value">{{ formatRating(movie.rating) }}</span>
              <span class="details__score-max">/ 10</span>
            </div>
            <div class="details__score-bar" role="img" :aria-label="`Classificação ${formatRating(movie.rating)} em 10`">
              <span :style="{ width: scoreWidth }"></span>
            </div>
            <p class="details__score-votes">
              {{ hasRating ? `${formatVotes(movie.votes)} votos no TMDB` : 'Ainda sem classificação' }}
            </p>
          </div>
        </aside>

        <div class="details__main">
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
            <a v-if="movie.homepage" :href="movie.homepage" target="_blank" rel="noopener noreferrer">
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
  background: var(--bg);
}

.details__hero {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: min(64vh, 560px);
  overflow: hidden;
  background: #000;
}

.details__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center 22%;
  opacity: 0.85;
}

.details__bg--art {
  background:
    radial-gradient(70% 100% at 80% 0%, rgba(229, 9, 20, 0.3), transparent 60%),
    linear-gradient(150deg, #18181c, #050506 72%);
}

.details__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, var(--bg) 2%, rgba(11, 11, 13, 0.65) 32%, rgba(11, 11, 13, 0.1) 70%),
    linear-gradient(95deg, rgba(0, 0, 0, 0.9) 4%, rgba(0, 0, 0, 0.35) 55%, transparent 80%);
}

.details__hero-inner {
  position: relative;
  z-index: 2;
  padding-block: calc(var(--nav-height) + 30px) 40px;
  animation: fade-up 0.6s var(--ease) both;
}

.details__back {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 18px;
  padding: 5px 12px 5px 9px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: var(--radius-sm);
  color: var(--text-soft);
  font-size: 0.78rem;
  font-weight: 600;
  transition: background 0.2s var(--ease), color 0.2s var(--ease);
}

.details__back:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.details__title {
  max-width: 18ch;
  font-size: clamp(2rem, 4.6vw, 3.6rem);
  line-height: 1;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.details__original {
  margin-top: 8px;
  font-size: 0.82rem;
  color: var(--dim);
  letter-spacing: 0.04em;
}

.details__tagline {
  margin-top: 10px;
  max-width: 50ch;
  font-size: 0.95rem;
  font-style: italic;
  color: var(--muted);
}

.details__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  margin-top: 16px;
  font-size: 0.84rem;
  color: var(--text-soft);
}

.details__meta > span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.details__meta-rating {
  font-weight: 700;
}

.details__meta-rating svg {
  color: var(--red);
}

.details__genre {
  padding: 2px 8px;
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: 2px;
  font-size: 0.72rem;
}

.details__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.details__body {
  padding-top: 34px;
  padding-bottom: 30px;
}

.details__layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 40px;
  align-items: start;
}

.details__poster {
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.details__score {
  margin-top: 16px;
  padding: 14px;
  border: 1px solid var(--line-soft);
  border-radius: var(--radius);
  background: #101013;
}

.details__score-head {
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.details__score-value {
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 800;
  color: #fff;
  line-height: 1;
}

.details__score-max {
  font-size: 0.78rem;
  color: var(--dim);
}

.details__score-bar {
  height: 4px;
  margin-top: 10px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.14);
  overflow: hidden;
}

.details__score-bar span {
  display: block;
  height: 100%;
  background: var(--red);
  transition: width 0.8s var(--ease);
}

.details__score-votes {
  margin-top: 8px;
  font-size: 0.72rem;
  color: var(--dim);
}

.details__h2 {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--dim);
  margin-bottom: 10px;
}

.details__block + .details__block {
  margin-top: 28px;
}

.details__synopsis {
  max-width: 70ch;
  color: var(--text-soft);
  line-height: 1.7;
  font-size: 0.96rem;
}

.details__facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 1px;
  background: var(--line-soft);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius);
  overflow: hidden;
}

.details__fact {
  padding: 12px 14px;
  background: #101013;
}

.details__fact dt {
  font-size: 0.64rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--dim);
  margin-bottom: 4px;
}

.details__fact dd {
  font-size: 0.87rem;
  color: var(--text-soft);
  line-height: 1.4;
}

.details__cast {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.details__cast li {
  padding: 6px 12px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.07);
  font-size: 0.8rem;
  color: var(--text-soft);
}

.details__links {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 26px;
  font-size: 0.84rem;
}

.details__links a {
  color: var(--muted);
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  padding-bottom: 2px;
  transition: color 0.2s var(--ease), border-color 0.2s var(--ease);
}

.details__links a:hover {
  color: #fff;
  border-color: var(--red);
}

@media (max-width: 860px) {
  .details__layout {
    grid-template-columns: 150px minmax(0, 1fr);
    gap: 22px;
  }
}

@media (max-width: 560px) {
  .details__layout {
    grid-template-columns: 118px minmax(0, 1fr);
    gap: 16px;
  }

  .details__hero {
    min-height: 58vh;
  }
}
</style>
