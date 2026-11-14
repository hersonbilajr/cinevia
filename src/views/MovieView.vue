<script setup>
/**
 * Página de detalhes de um filme (/filme/:id), com sugestões relacionadas.
 */
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MovieDetails from '../components/MovieDetails.vue'
import MovieRow from '../components/MovieRow.vue'
import StateMessage from '../components/StateMessage.vue'
import { getMovieDetails, getRelated } from '../services/movieService'

const route = useRoute()

const movie = ref(null)
const loading = ref(true)
const error = ref('')
const related = ref([])
const relatedLoading = ref(false)

async function load(id) {
  loading.value = true
  error.value = ''
  movie.value = null
  related.value = []

  try {
    const details = await getMovieDetails(id)
    movie.value = details
    relatedLoading.value = true
    try {
      related.value = await getRelated(details, 8)
    } catch {
      related.value = []
    } finally {
      relatedLoading.value = false
    }
  } catch (err) {
    error.value = err?.message || 'Não foi possível obter os detalhes deste filme.'
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.id,
  (id) => {
    if (id) load(id)
  },
  { immediate: true }
)
</script>

<template>
  <div class="movie-view">
    <template v-if="loading">
      <div class="detail-skeleton" aria-busy="true">
        <span class="visually-hidden">A carregar detalhes do filme…</span>
        <div class="detail-skeleton__hero">
          <span class="line line--lg"></span>
          <span class="line"></span>
          <span class="line line--sm"></span>
        </div>
        <div class="container detail-skeleton__body">
          <div class="detail-skeleton__poster"></div>
          <div class="detail-skeleton__lines">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line line--md"></span>
          </div>
        </div>
      </div>
    </template>

    <div v-else-if="error" class="error-box container">
      <StateMessage
        variant="error"
        title="Filme indisponível"
        :text="error"
        action-label="Voltar ao início"
        @action="$router.push('/')"
      />
    </div>

    <template v-else-if="movie">
      <MovieDetails :movie="movie" />

      <div v-if="related.length || relatedLoading" class="related container">
        <MovieRow title="Títulos semelhantes" :movies="related" :loading="relatedLoading" :skeleton-count="8" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.movie-view {
  padding-bottom: 20px;
}

.related {
  padding-top: 26px;
  border-top: 1px solid var(--line-soft);
  margin-top: 20px;
}

.error-box {
  padding-top: calc(var(--nav-height) + 60px);
  padding-bottom: 80px;
}

.detail-skeleton__hero {
  height: min(58vh, 480px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 14px;
  padding: 0 4% 40px;
  background: linear-gradient(150deg, #17171b, #050506 70%);
}

.detail-skeleton__body {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 34px;
  padding-top: 34px;
}

.detail-skeleton__poster {
  aspect-ratio: 2 / 3;
  border-radius: var(--radius);
}

.detail-skeleton__lines {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 8px;
}

.line {
  height: 12px;
  width: 100%;
  border-radius: 3px;
}

.line--sm {
  width: 30%;
}

.line--md {
  width: 45%;
}

.line--lg {
  width: 52%;
  height: 46px;
}

.detail-skeleton__poster,
.line {
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

@media (max-width: 860px) {
  .detail-skeleton__body {
    grid-template-columns: 140px minmax(0, 1fr);
    gap: 20px;
  }
}
</style>
