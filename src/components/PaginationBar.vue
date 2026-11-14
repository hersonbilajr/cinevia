<script setup>
/**
 * Paginação numérica com janela deslizante e elipses.
 */
import { computed } from 'vue'

const props = defineProps({
  page: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:page'])

const pages = computed(() => {
  const total = Math.min(props.totalPages, 500)
  const current = props.page
  const window = []
  const push = (value) => window.push(value)

  if (total <= 7) {
    for (let i = 1; i <= total; i += 1) push(i)
    return window
  }

  push(1)
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  if (start > 2) push('…')
  for (let i = start; i <= end; i += 1) push(i)
  if (end < total - 1) push('…')
  push(total)
  return window
})

function go(page) {
  if (props.disabled) return
  const target = Math.min(Math.max(1, page), Math.min(props.totalPages, 500))
  if (target !== props.page) emit('update:page', target)
}
</script>

<template>
  <nav v-if="totalPages > 1" class="pager" aria-label="Paginação de resultados">
    <button
      class="pager__btn pager__btn--arrow"
      type="button"
      :disabled="disabled || page <= 1"
      aria-label="Página anterior"
      @click="go(page - 1)"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
        <path d="m14 6-6 6 6 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <template v-for="(item, index) in pages" :key="`${item}-${index}`">
      <span v-if="item === '…'" class="pager__gap" aria-hidden="true">…</span>
      <button
        v-else
        class="pager__btn"
        :class="{ 'pager__btn--active': item === page }"
        type="button"
        :disabled="disabled"
        :aria-current="item === page ? 'page' : undefined"
        :aria-label="`Ir para a página ${item}`"
        @click="go(item)"
      >
        {{ item }}
      </button>
    </template>

    <button
      class="pager__btn pager__btn--arrow"
      type="button"
      :disabled="disabled || page >= Math.min(totalPages, 500)"
      aria-label="Página seguinte"
      @click="go(page + 1)"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
        <path d="m10 6 6 6-6 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <span class="pager__status">Página {{ page }} de {{ Math.min(totalPages, 500) }}</span>
  </nav>
</template>

<style scoped>
.pager {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 44px;
}

.pager__btn {
  display: grid;
  place-items: center;
  min-width: 34px;
  height: 34px;
  padding-inline: 8px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-soft);
  font-size: 0.84rem;
  font-weight: 600;
  transition: background 0.2s var(--ease), border-color 0.2s var(--ease), color 0.2s var(--ease);
}

.pager__btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
}

.pager__btn--active {
  background: var(--red);
  border-color: var(--red);
  color: #fff;
}

.pager__btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.pager__gap {
  color: var(--dim);
}

.pager__status {
  width: 100%;
  text-align: center;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dim);
  margin-top: 8px;
}
</style>
