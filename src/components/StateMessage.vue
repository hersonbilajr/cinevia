<script setup>
/**
 * Mensagem de estado (erro ou lista vazia) com ação opcional.
 */
defineProps({
  variant: { type: String, default: 'empty' },
  title: { type: String, required: true },
  text: { type: String, default: '' },
  actionLabel: { type: String, default: '' }
})

defineEmits(['action'])
</script>

<template>
  <div class="state" :class="`state--${variant}`" role="status">
    <span class="state__badge" aria-hidden="true">
      <svg v-if="variant === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          d="M12 8.5v4.2m0 3.1h.01M10.6 4.3 3.4 17a1.6 1.6 0 0 0 1.4 2.4h14.4a1.6 1.6 0 0 0 1.4-2.4L13.4 4.3a1.6 1.6 0 0 0-2.8 0Z"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="6.4" stroke-width="1.7" />
        <path d="m16 16 4.2 4.2" stroke-width="1.7" stroke-linecap="round" />
      </svg>
    </span>
    <h3 class="state__title">{{ title }}</h3>
    <p v-if="text" class="state__text">{{ text }}</p>
    <button v-if="actionLabel" class="btn btn--ghost btn--small" type="button" @click="$emit('action')">
      {{ actionLabel }}
    </button>
  </div>
</template>

<style scoped>
.state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 64px 24px;
  text-align: center;
  border-radius: var(--radius-lg);
  background: #101013;
  border: 1px solid var(--line-soft);
  animation: fade-in 0.4s var(--ease) both;
}

.state__badge {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-bottom: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-soft);
}

.state__badge svg {
  width: 22px;
  height: 22px;
}

.state--error .state__badge {
  background: var(--red-soft);
  color: #ff6b73;
}

.state__title {
  font-size: 1.05rem;
  font-weight: 700;
}

.state__text {
  max-width: 48ch;
  font-size: 0.9rem;
  color: var(--muted);
}

.state .btn {
  margin-top: 10px;
}
</style>
