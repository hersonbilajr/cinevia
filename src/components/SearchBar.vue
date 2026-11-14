<script setup>
/**
 * Barra de pesquisa por título. Emite o texto; a página faz o debounce.
 */
import { ref } from 'vue'

defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Pesquisar filmes…' }
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
        <circle cx="11" cy="11" r="6.4" stroke-width="1.8" />
        <path d="m16 16 4.2 4.2" stroke-width="1.8" stroke-linecap="round" />
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
        <path d="m7 7 10 10M17 7 7 17" stroke-width="2" stroke-linecap="round" />
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
  left: 13px;
  display: grid;
  place-items: center;
  color: var(--dim);
  pointer-events: none;
  transition: color 0.2s var(--ease);
}

.search__icon svg {
  width: 17px;
  height: 17px;
}

.search__input {
  width: 100%;
  padding: 10px 42px 10px 38px;
  background: rgba(0, 0, 0, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: var(--radius-sm);
  color: #fff;
  font-size: 0.88rem;
  transition: border-color 0.2s var(--ease), background 0.2s var(--ease);
}

.search__input::placeholder {
  color: var(--dim);
}

.search__input::-webkit-search-cancel-button {
  display: none;
}

.search__input:focus {
  outline: none;
  border-color: var(--red);
  background: rgba(0, 0, 0, 0.9);
}

.search:focus-within .search__icon {
  color: #fff;
}

.search__clear {
  position: absolute;
  right: 8px;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  color: var(--muted);
}

.search__clear svg {
  width: 14px;
  height: 14px;
}

.search__clear:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
}

.search__hint {
  position: absolute;
  right: 10px;
  display: grid;
  place-items: center;
  min-width: 18px;
  height: 18px;
  border: 1px solid var(--line);
  border-radius: 2px;
  color: var(--dim);
  font-family: var(--font-body);
  font-size: 0.66rem;
}

@media (max-width: 520px) {
  .search__hint {
    display: none;
  }
}
</style>
