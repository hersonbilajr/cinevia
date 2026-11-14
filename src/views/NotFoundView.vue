<script setup>
/**
 * Rota de recurso inexistente (404).
 */
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="notfound container">
    <span class="notfound__code">404</span>
    <h1 class="notfound__title">Não encontrámos esta página</h1>
    <p class="notfound__text">
      O endereço que tentaste abrir não existe. Volta ao catálogo para continuares a explorar filmes.
    </p>
    <button class="btn btn--primary" type="button" @click="router.push('/')">Voltar ao início</button>
  </div>
</template>

<style scoped>
.notfound {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding-top: calc(var(--nav-height) + 90px);
  padding-bottom: 110px;
  min-height: 70vh;
}

.notfound__code {
  font-family: var(--font-display);
  font-size: clamp(3rem, 9vw, 5.5rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--red);
}

.notfound__title {
  font-size: clamp(1.3rem, 2.6vw, 1.9rem);
  font-weight: 700;
}

.notfound__text {
  max-width: 46ch;
  color: var(--muted);
  font-size: 0.92rem;
}

.notfound .btn {
  margin-top: 10px;
}
</style>
