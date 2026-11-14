<script setup>
/**
 * Cartaz do filme. Usa a imagem do TMDB quando existe e, caso contrário
 * (modo demonstração ou filme sem cartaz), uma composição gráfica escura.
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
const style = computed(() => ({ '--tint': tint.value }))
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
    <div v-else class="poster__fallback">
      <span class="poster__letter">{{ letter }}</span>
      <span class="poster__title">{{ movie.title }}</span>
      <span v-if="movie.year" class="poster__year">{{ movie.year }}</span>
    </div>
    <span v-if="!showImage" class="visually-hidden">Cartaz indisponível para {{ movie.title }}</span>
  </div>
</template>

<style scoped>
.poster {
  position: relative;
  aspect-ratio: 2 / 3;
  width: 100%;
  overflow: hidden;
  background: #101013;
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
  justify-content: flex-end;
  gap: 8px;
  padding: 14px;
  background:
    radial-gradient(120% 80% at 78% 0%, rgba(229, 9, 20, 0.28), transparent 60%),
    linear-gradient(160deg, #1a1a1e, #0a0a0c 78%);
  color: #fff;
}

.poster__fallback::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.025) 0 1px,
    transparent 1px 26px
  );
  pointer-events: none;
}

.poster__letter {
  position: absolute;
  top: 10px;
  left: 14px;
  font-family: var(--font-display);
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1;
  color: rgba(255, 255, 255, 0.16);
  letter-spacing: -0.04em;
}

.poster__title {
  position: relative;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.01em;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.poster__year {
  position: relative;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  color: var(--dim);
}
</style>
