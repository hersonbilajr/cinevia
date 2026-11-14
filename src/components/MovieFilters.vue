<script setup>
/**
 * Filtros compactos: género, ano, classificação mínima e ordenação.
 * Os critérios podem ser combinados livremente.
 */
import { computed } from 'vue'
import { SORT_OPTIONS } from '../services/movieService'

const props = defineProps({
  modelValue: { type: Object, required: true },
  genres: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'reset'])

const RATING_OPTIONS = [
  { value: 0, label: 'Qualquer nota' },
  { value: 6, label: '6,0+' },
  { value: 7, label: '7,0+' },
  { value: 8, label: '8,0+' },
  { value: 9, label: '9,0+' }
]

const years = computed(() => {
  const current = new Date().getFullYear() + 1
  const list = []
  for (let year = current; year >= 1950; year -= 1) list.push(year)
  return list
})

const isActive = computed(
  () =>
    Boolean(props.modelValue.genre) ||
    Boolean(props.modelValue.year) ||
    Number(props.modelValue.rating) > 0 ||
    props.modelValue.sort !== 'popularity.desc'
)

function update(patch) {
  emit('update:modelValue', { ...props.modelValue, ...patch })
}

const chevron = 'm7 10 5 5 5-5'
</script>

<template>
  <section class="filters" aria-label="Filtros de filmes">
    <div class="field">
      <label class="field__label" for="filter-genre">Género</label>
      <div class="field__control">
        <select
          id="filter-genre"
          class="field__input"
          :value="modelValue.genre"
          :disabled="disabled"
          @change="update({ genre: $event.target.value })"
        >
          <option value="">Todos</option>
          <option v-for="genre in genres" :key="genre.id" :value="String(genre.id)">
            {{ genre.name }}
          </option>
        </select>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor">
          <path :d="chevron" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>

    <div class="field">
      <label class="field__label" for="filter-year">Ano</label>
      <div class="field__control">
        <select
          id="filter-year"
          class="field__input"
          :value="modelValue.year"
          :disabled="disabled"
          @change="update({ year: $event.target.value })"
        >
          <option value="">Todos</option>
          <option v-for="year in years" :key="year" :value="String(year)">{{ year }}</option>
        </select>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor">
          <path :d="chevron" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>

    <div class="field">
      <label class="field__label" for="filter-rating">Classificação</label>
      <div class="field__control">
        <select
          id="filter-rating"
          class="field__input"
          :value="String(modelValue.rating)"
          :disabled="disabled"
          @change="update({ rating: Number($event.target.value) })"
        >
          <option v-for="option in RATING_OPTIONS" :key="option.value" :value="String(option.value)">
            {{ option.label }}
          </option>
        </select>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor">
          <path :d="chevron" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>

    <div class="field">
      <label class="field__label" for="filter-sort">Ordenar</label>
      <div class="field__control">
        <select
          id="filter-sort"
          class="field__input"
          :value="modelValue.sort"
          :disabled="disabled"
          @change="update({ sort: $event.target.value })"
        >
          <option v-for="option in SORT_OPTIONS" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor">
          <path :d="chevron" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>

    <button v-if="isActive" class="filters__reset" type="button" @click="$emit('reset')">
      Limpar
    </button>
  </section>
</template>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr)) auto;
  align-items: end;
  gap: 12px;
  width: 100%;
}

.filters__reset {
  align-self: end;
  padding: 8px 14px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: var(--radius-sm);
  color: var(--text-soft);
  font-size: 0.8rem;
  font-weight: 600;
  transition: background 0.2s var(--ease), border-color 0.2s var(--ease);
}

.filters__reset:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 900px) {
  .filters {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .filters {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
}
</style>
