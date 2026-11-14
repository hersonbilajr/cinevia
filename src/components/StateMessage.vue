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
    <div class="state__icon" aria-hidden="true">
      <svg v-if="variant === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          d="M12 8.5v4.2m0 3.1h.01M10.6 4.3 3.4 17a1.6 1.6 0 0 0 1.4 2.4h14.4a1.6 1.6 0 0 0 1.4-2.4L13.4 4.3a1.6 1.6 0 0 0-2.8 0Z"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="6.4" stroke-width="1.6" />
        <path d="m16 16 4.2 4.2" stroke-width="1.6" stroke-linecap="round" />
      </svg>
    </div>
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
  border: 1px dashed var(--line);
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, rgba(22, 25, 35, 0.55), rgba(16, 18, 25, 0.25));
  animation: fade-up 0.45s var(--ease) both;
}

.state__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  margin-bottom: 4px;
  background: var(--surface-2);
  border: 1px solid var(--line);
  color: var(--gold);
}

.state__icon svg {
  width: 24px;
  height: 24px;
}

.state--error .state__icon {
  color: var(--coral);
  background: rgba(255, 92, 116, 0.1);
  border-color: rgba(255, 92, 116, 0.35);
}

.state__title {
  font-size: 1.05rem;
}

.state__text {
  max-width: 46ch;
  font-size: 0.9rem;
  color: var(--muted);
}

.state .btn {
  margin-top: 8px;
}
</style>
