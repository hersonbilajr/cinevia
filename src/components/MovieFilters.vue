<script setup>
/**
 * Painel de filtros: género, ano de lançamento, classificação mínima e
 * ordenação. Os quatro critérios podem ser combinados livremente.
 * O estado é sincronizado com a página através de v-model.
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
  { value: 0, label: 'Qualquer classificação' },
  { value: 6, label: '6,0 ou mais' },
  { value: 7, label: '7,0 ou mais' },
  { value: 8, label: '8,0 ou mais' },
  { value: 9, label: '9,0 ou mais' }
]

/** Anos do mais recente para trás (até 1950), mais a opção "todos". */
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
</script>

<template>
  <section class="filters" aria-label="Filtros de filmes">
    <div class="filters__grid">
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
            <option value="">Todos os géneros</option>
            <option v-for="genre in genres" :key="genre.id" :value="String(genre.id)">
              {{ genre.name }}
            </option>
          </select>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="m7 10 5 5 5-5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>

      <div class="field">
        <label class="field__label" for="filter-year">Ano de lançamento</label>
        <div class="field__control">
          <select
            id="filter-year"
            class="field__input"
            :value="modelValue.year"
            :disabled="disabled"
            @change="update({ year: $event.target.value })"
          >
            <option value="">Todos os anos</option>
            <option v-for="year in years" :key="year" :value="String(year)">{{ year }}</option>
          </select>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="m7 10 5 5 5-5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
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
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="m7 10 5 5 5-5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>

      <div class="field">
        <label class="field__label" for="filter-sort">Ordenar por</label>
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
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="m7 10 5 5 5-5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    </div>

    <button v-if="isActive" class="filters__reset" type="button" @click="$emit('reset')">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor">
        <path d="m7 7 10 10M17 7 7 17" stroke-width="1.9" stroke-linecap="round" />
      </svg>
      Limpar filtros
    </button>
  </section>
</template>

<style scoped>
.filters {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  padding: 18px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--line-soft);
  background: linear-gradient(180deg, rgba(22, 25, 35, 0.9), rgba(16, 18, 25, 0.72));
  box-shadow: var(--shadow-sm);
}

.filters__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  flex: 1;
  min-width: 0;
}

.filters__reset {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 11px 16px;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(240, 180, 41, 0.35);
  background: var(--gold-soft);
  color: var(--gold-bright);
  font-size: 0.82rem;
  font-weight: 600;
  white-space: nowrap;
  transition: background 0.2s var(--ease), transform 0.2s var(--ease);
}

.filters__reset:hover {
  background: rgba(240, 180, 41, 0.2);
  transform: translateY(-1px);
}

@media (max-width: 900px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }

  .filters__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .filters__reset {
    justify-content: center;
  }
}

@media (max-width: 520px) {
  .filters {
    padding: 14px;
  }

  .filters__grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>
