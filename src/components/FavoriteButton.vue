<script setup>
/**
 * Botão de favorito. Escreve no estado partilhado useFavorites (localStorage),
 * pelo que funciona em qualquer ecrã.
 */
import { computed } from 'vue'
import { useFavorites } from '../composables/useFavorites'

const props = defineProps({
  movie: { type: Object, required: true },
  label: { type: Boolean, default: false }
})

const { isFavorite, toggle } = useFavorites()
const active = computed(() => isFavorite(props.movie.id))
</script>

<template>
  <button
    class="fav"
    :class="{ 'fav--active': active, 'fav--labelled': label }"
    type="button"
    :aria-pressed="active"
    :aria-label="active ? `Remover ${movie.title} da minha lista` : `Adicionar ${movie.title} à minha lista`"
    :title="active ? 'Remover da minha lista' : 'Adicionar à minha lista'"
    @click.stop.prevent="toggle(movie)"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path v-if="!active" d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path
        v-else
        d="m5 12.5 4.5 4.5L19 7"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span v-if="label">{{ active ? 'Na minha lista' : 'Minha lista' }}</span>
  </button>
</template>

<style scoped>
.fav {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.55);
  transition:
    background 0.2s var(--ease),
    border-color 0.2s var(--ease),
    transform 0.2s var(--ease);
}

.fav svg {
  width: 16px;
  height: 16px;
}

.fav:hover {
  background: rgba(0, 0, 0, 0.85);
  border-color: #fff;
  transform: scale(1.06);
}

.fav--active {
  border-color: #fff;
  background: rgba(255, 255, 255, 0.92);
  color: #000;
}

.fav--labelled {
  width: auto;
  height: auto;
  padding: 10px 22px;
  border-radius: var(--radius-sm);
  background: rgba(109, 109, 110, 0.6);
  border-color: transparent;
  font-family: var(--font-display);
  font-size: 0.94rem;
  font-weight: 700;
}

.fav--labelled svg {
  width: 18px;
  height: 18px;
}

.fav--labelled:hover {
  background: rgba(109, 109, 110, 0.42);
  transform: none;
}

.fav--labelled.fav--active {
  background: rgba(109, 109, 110, 0.6);
  border-color: transparent;
  color: #fff;
}
</style>
