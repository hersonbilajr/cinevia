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
    <h1 class="notfound__title">Esta sessão não existe</h1>
    <p class="notfound__text">
      A página que procuras não foi encontrada. Volta ao catálogo para continuar a explorar filmes.
    </p>
    <button class="btn btn--primary" type="button" @click="router.push('/')">
      Voltar ao início
    </button>
  </div>
</template>

<style scoped>
.notfound {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding-block: 100px;
  min-height: 60vh;
}

.notfound__code {
  font-family: var(--font-display);
  font-size: clamp(3.4rem, 10vw, 6rem);
  font-weight: 700;
  line-height: 1;
  color: transparent;
  background: linear-gradient(135deg, var(--gold-bright), rgba(240, 180, 41, 0.25));
  -webkit-background-clip: text;
  background-clip: text;
}

.notfound__title {
  font-size: clamp(1.4rem, 3vw, 2rem);
}

.notfound__text {
  max-width: 48ch;
  color: var(--muted);
  font-size: 0.95rem;
}

.notfound .btn {
  margin-top: 12px;
}
</style>
