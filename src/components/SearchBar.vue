<script setup>
/**
 * Barra de pesquisa por título.
 * O componente apenas emite o texto; a página faz o "debounce" da pesquisa.
 */
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Pesquisar por título…' }
})

const emit = defineEmits(['update:modelValue'])

const input = ref(null)

function onInput(event) {
  emit('update:modelValue', event.target.value)
}

function clear() {
  emit('update:modelValue', '')
  input.value?.focus()
}

defineExpose({ focus: () => input.value?.focus() })
</script>

<template>
  <form class="search" role="search" @submit.prevent>
    <span class="search__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="6.6" stroke-width="1.7" />
        <path d="m16.2 16.2 4 4" stroke-width="1.7" stroke-linecap="round" />
      </svg>
    </span>
    <label class="visually-hidden" for="search-input">Pesquisar filmes por título</label>
    <input
      id="search-input"
      ref="input"
      class="search__input"
      type="search"
      :value="modelValue"
      :placeholder="placeholder"
      autocomplete="off"
      @input="onInput"
    />
    <button
      v-if="modelValue"
      class="search__clear"
      type="button"
      aria-label="Limpar pesquisa"
      @click="clear"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="m7 7 10 10M17 7 7 17" stroke-width="1.8" stroke-linecap="round" />
      </svg>
    </button>
    <kbd v-else class="search__hint" aria-hidden="true">/</kbd>
  </form>
</template>

<style scoped>
.search {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search__icon {
  position: absolute;
  left: 16px;
  display: grid;
  place-items: center;
  color: var(--muted);
  pointer-events: none;
  transition: color 0.22s var(--ease);
}

.search__icon svg {
  width: 19px;
  height: 19px;
}

.search__input {
  width: 100%;
  padding: 14px 48px 14px 46px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  color: var(--text);
  font-size: 0.95rem;
  transition:
    border-color 0.25s var(--ease),
    background 0.25s var(--ease),
    box-shadow 0.25s var(--ease);
}

.search__input::placeholder {
  color: #767d8c;
}

.search__input::-webkit-search-cancel-button {
  display: none;
}

.search__input:focus {
  outline: none;
  border-color: rgba(240, 180, 41, 0.6);
  background: var(--surface-2);
  box-shadow: 0 0 0 4px rgba(240, 180, 41, 0.1);
}

.search:focus-within .search__icon {
  color: var(--gold);
}

.search__clear {
  position: absolute;
  right: 12px;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: var(--muted);
  transition: background 0.2s var(--ease), color 0.2s var(--ease);
}

.search__clear svg {
  width: 16px;
  height: 16px;
}

.search__clear:hover {
  background: var(--surface-3);
  color: var(--text);
}

.search__hint {
  position: absolute;
  right: 16px;
  display: grid;
  place-items: center;
  min-width: 22px;
  height: 22px;
  padding-inline: 5px;
  border-radius: 6px;
  border: 1px solid var(--line);
  background: var(--surface-2);
  color: var(--muted);
  font-family: var(--font-body);
  font-size: 0.72rem;
}

@media (max-width: 520px) {
  .search__input {
    padding: 12px 44px 12px 42px;
    font-size: 0.9rem;
  }

  .search__hint {
    display: none;
  }
}
</style>
