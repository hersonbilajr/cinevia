<script setup>
/**
 * Cartaz do filme. Mostra a imagem do TMDB quando existe e, caso contrário
 * (modo demo ou filme sem cartaz), um cartaz gráfico gerado a partir do
 * título — mantendo o aspecto cuidado sem depender de imagens externas.
 */
import { computed, ref, watch } from 'vue'
import { posterUrl } from '../services/movieService'
import { posterTint } from '../utils/format'

const props = defineProps({
  movie: { type: Object, required: true },
  size: { type: String, default: 'w500' }
})

const broken = ref(false)

watch(
  () => props.movie?.poster,
  () => {
    broken.value = false
  }
)

const src = computed(() => posterUrl(props.movie?.poster, props.size))
const showImage = computed(() => Boolean(src.value) && !broken.value)

const tint = computed(() => posterTint(props.movie?.title || ''))
const style = computed(() => ({
  '--tint': tint.value,
  '--tint-2': (tint.value + 48) % 360
}))
const letter = computed(() => (props.movie?.title || '?').trim().charAt(0).toUpperCase())
</script>

<template>
  <div class="poster" :style="style">
    <img
      v-if="showImage"
      :src="src"
      :alt="`Cartaz do filme ${movie.title}`"
      loading="lazy"
      decoding="async"
      @error="broken = true"
    />
    <div v-else class="poster__fallback" aria-hidden="true">
      <span class="poster__mark">CINEVIA</span>
      <span class="poster__letter">{{ letter }}</span>
      <span class="poster__title">{{ movie.title }}</span>
      <span v-if="movie.year" class="poster__year">{{ movie.year }}</span>
    </div>
    <span class="visually-hidden" v-if="!showImage">Cartaz indisponível para {{ movie.title }}</span>
  </div>
</template>

<style scoped>
.poster {
  position: relative;
  aspect-ratio: 2 / 3;
  width: 100%;
  overflow: hidden;
  border-radius: inherit;
  background: var(--surface-2);
}

.poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.poster__fallback {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px;
  text-align: center;
  background:
    radial-gradient(120% 90% at 20% 0%, hsl(var(--tint) 55% 26% / 0.95), transparent 62%),
    linear-gradient(155deg, hsl(var(--tint-2) 48% 18%), hsl(var(--tint) 42% 9%) 72%);
  color: #fff;
}

.poster__fallback::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.045) 0 1px,
    transparent 1px 9px
  );
  pointer-events: none;
}

.poster__mark {
  position: absolute;
  top: 12px;
  font-family: var(--font-display);
  font-size: 0.5rem;
  letter-spacing: 0.32em;
  opacity: 0.6;
}

.poster__letter {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 4vw, 3.4rem);
  font-weight: 700;
  line-height: 1;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
}

.poster__title {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.3;
  opacity: 0.92;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.poster__year {
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  opacity: 0.6;
}
</style>
