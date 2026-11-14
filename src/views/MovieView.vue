<script setup>
/**
 * Página de detalhes de um filme (/filme/:id), com sugestões relacionadas.
 */
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MovieDetails from '../components/MovieDetails.vue'
import MovieGrid from '../components/MovieGrid.vue'
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
    relatedLoading.value = true;
    try {
      related.value = await getRelated(details, 6)
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
      <div class="detail-skeleton container" aria-busy="true">
        <span class="visually-hidden">A carregar detalhes do filme…</span>
        <div class="detail-skeleton__poster"></div>
        <div class="detail-skeleton__lines">
          <span class="line line--sm"></span>
          <span class="line line--lg"></span>
          <span class="line"></span>
          <span class="line"></span>
          <span class="line line--md"></span>
        </div>
      </div>
    </template>

    <StateMessage
      v-else-if="error"
      variant="error"
      class="error-box container"
      title="Filme indisponível"
      :text="error"
      action-label="Voltar à exploração"
      @action="$router.push('/')"
    />

    <template v-else-if="movie">
      <MovieDetails :movie="movie" />

      <section v-if="related.length || relatedLoading" class="related container">
        <div class="section__head">
          <div>
            <span class="section__eyebrow">Sugestões</span>
            <h2 class="section__title">Também poderás gostar</h2>
          </div>
        </div>
        <MovieGrid
          :movies="related"
          :loading="relatedLoading"
          :skeleton-count="6"
          empty-title="Sem sugestões para este título"
          empty-text="Não encontrámos filmes relacionados com os mesmos géneros."
        />
      </section>
    </template>
  </div>
</template>

<style scoped>
.movie-view {
  padding-bottom: 20px;
}

.related {
  padding-top: 60px;
  border-top: 1px solid var(--line-soft);
  margin-top: 50px;
}

.error-box {
  padding-top: 60px;
}

.detail-skeleton {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 44px;
  padding-top: 90px;
  padding-bottom: 60px;
}

.detail-skeleton__poster {
  aspect-ratio: 2 / 3;
  border-radius: var(--radius-lg);
}

.detail-skeleton__lines {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 10px;
}

.line {
  height: 14px;
  border-radius: 8px;
  width: 100%;
}

.line--sm {
  width: 90px;
  height: 12px;
}

.line--lg {
  width: 62%;
  height: 40px;
}

.line--md {
  width: 45%;
}

.detail-skeleton__poster,
.line {
  background-color: var(--surface-2);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.06) 45%,
    rgba(255, 255, 255, 0) 90%
  );
  background-size: 420px 100%;
  background-repeat: no-repeat;
  animation: shimmer 1.5s infinite linear;
}

@media (max-width: 880px) {
  .detail-skeleton {
    grid-template-columns: 140px minmax(0, 1fr);
    gap: 24px;
    padding-top: 70px;
  }
}
</style>
