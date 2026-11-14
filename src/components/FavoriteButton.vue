<script setup>
/**
 * Botão de favorito (coração). Lê e escreve no estado partilhado
 * useFavorites (localStorage), pelo que funciona em qualquer ecrã.
 */
import { computed } from 'vue'
import { useFavorites } from '../composables/useFavorites'

const props = defineProps({
  movie: { type: Object, required: true },
  label: { type: Boolean, default: false }
})

const { isFavorite, toggle } = useFavorites()
const active = computed(() => isFavorite(props.movie.id))

function onClick() {
  toggle(props.movie)
}
</script>

<template>
  <button
    class="fav"
    :class="{ 'fav--active': active, 'fav--labelled': label }"
    type="button"
    :aria-pressed="active"
    :aria-label="active ? `Remover ${movie.title} dos favoritos` : `Adicionar ${movie.title} aos favoritos`"
    :title="active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
    @click.stop.prevent="onClick"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true" :fill="active ? 'currentColor' : 'none'">
      <path
        d="M12 20.2s-7.4-4.5-7.4-9.4A4.3 4.3 0 0 1 12 7.9a4.3 4.3 0 0 1 7.4 2.9c0 4.9-7.4 9.4-7.4 9.4Z"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linejoin="round"
      />
    </svg>
    <span v-if="label">{{ active ? 'Nos favoritos' : 'Favoritos' }}</span>
  </button>
</template>

<style scoped>
.fav {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: #fff;
  background: rgba(8, 9, 13, 0.62);
  border: 1px solid rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(8px);
  transition:
    background 0.22s var(--ease),
    color 0.22s var(--ease),
    border-color 0.22s var(--ease),
    transform 0.22s var(--ease);
}

.fav svg {
  width: 18px;
  height: 18px;
}

.fav:hover {
  transform: scale(1.08);
  border-color: rgba(255, 92, 116, 0.6);
  color: var(--coral);
}

.fav--active {
  color: var(--coral);
  border-color: rgba(255, 92, 116, 0.55);
  background: rgba(255, 92, 116, 0.16);
}

.fav--labelled {
  width: auto;
  height: auto;
  padding: 11px 20px;
  border-radius: var(--radius-pill);
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  background: rgba(244, 242, 237, 0.06);
  border-color: rgba(255, 255, 255, 0.18);
}

.fav--labelled:hover {
  transform: translateY(-2px);
  background: rgba(255, 92, 116, 0.14);
}

.fav--labelled.fav--active {
  background: rgba(255, 92, 116, 0.16);
}
</style>
