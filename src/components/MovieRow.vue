<script setup>
/**
 * Fila horizontal de filmes, com setas de navegação — o padrão das
 * plataformas de streaming para apresentar várias categorias na página inicial.
 */
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import MovieCard from './MovieCard.vue'

const props = defineProps({
  title: { type: String, required: true },
  movies: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  skeletonCount: { type: Number, default: 7 }
})

const scroller = ref(null)
const canPrev = ref(false)
const canNext = ref(false)

function updateArrows() {
  const el = scroller.value
  if (!el) return
  canPrev.value = el.scrollLeft > 8
  canNext.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 8
}

function scrollBy(direction) {
  const el = scroller.value
  if (!el) return
  el.scrollBy({ left: direction * el.clientWidth * 0.86, behavior: 'smooth' })
}

let resizeObserver = null

onMounted(() => {
  updateArrows()
  if (typeof ResizeObserver !== 'undefined' && scroller.value) {
    resizeObserver = new ResizeObserver(updateArrows)
    resizeObserver.observe(scroller.value)
  }
  window.addEventListener('resize', updateArrows)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', updateArrows)
})

watch(
  () => props.movies,
  () => setTimeout(updateArrows, 60)
)
</script>

<template>
  <section class="row" :aria-label="title">
    <header class="row__head">
      <h2 class="row__title">{{ title }}</h2>
      <span class="row__count">{{ movies.length }} títulos</span>
    </header>

    <div class="row__wrap">
      <button
        v-show="canPrev"
        class="row__arrow row__arrow--prev"
        type="button"
        :aria-label="`Ver anteriores em ${title}`"
        @click="scrollBy(-1)"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor">
          <path d="m15 5-7 7 7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div ref="scroller" class="row__track" @scroll.passive="updateArrows">
        <template v-if="loading">
          <div v-for="n in skeletonCount" :key="`s-${n}`" class="row__skeleton">
            <div class="row__skeleton-poster"></div>
            <div class="row__skeleton-line"></div>
          </div>
        </template>

        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          class="row__item"
          :movie="movie"
        />
      </div>

      <button
        v-show="canNext"
        class="row__arrow row__arrow--next"
        type="button"
        :aria-label="`Ver seguintes em ${title}`"
        @click="scrollBy(1)"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor">
          <path d="m9 5 7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </section>
</template>

<style scoped>
.row {
  margin-bottom: 32px;
  animation: fade-in 0.5s var(--ease) both;
}

.row__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.row__title {
  font-size: clamp(0.98rem, 1.35vw, 1.22rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-soft);
}

.row__count {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--dim);
  white-space: nowrap;
}

.row__wrap {
  position: relative;
}

.row__track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(140px, 16.5vw, 205px);
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x proximity;
  scrollbar-width: none;
  padding-block: 4px 10px;
}

.row__track::-webkit-scrollbar {
  display: none;
}

.row__item {
  scroll-snap-align: start;
}

.row__arrow {
  position: absolute;
  top: 0;
  bottom: 10px;
  z-index: 5;
  width: 52px;
  display: grid;
  place-items: center;
  color: #fff;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0));
  opacity: 0;
  transition: opacity 0.25s var(--ease), background 0.25s var(--ease);
}

.row__arrow--prev {
  left: -4%;
  border-radius: 0 var(--radius) var(--radius) 0;
}

.row__arrow--next {
  right: -4%;
  border-radius: var(--radius) 0 0 var(--radius);
  background: linear-gradient(270deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0));
}

.row__arrow:hover {
  background: rgba(0, 0, 0, 0.75);
}

.row:hover .row__arrow {
  opacity: 1;
}

.row__arrow:focus-visible {
  opacity: 1;
}

.row__skeleton {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.row__skeleton-poster {
  aspect-ratio: 2 / 3;
  border-radius: var(--radius);
}

.row__skeleton-line {
  height: 9px;
  width: 60%;
  border-radius: 3px;
}

.row__skeleton-poster,
.row__skeleton-line {
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

@media (hover: none) {
  .row__arrow {
    display: none !important;
  }
}
</style>
