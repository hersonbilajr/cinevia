<script setup>
import { isLiveMode } from '../services/movieService'
import { useFavorites } from '../composables/useFavorites'

const { count } = useFavorites()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <span class="footer__name">CINEVIA</span>
        <p class="footer__text">
          Explorador de filmes desenvolvido em Vue.js 3 para a cadeira de Programação Web II —
          LECC31, ISUTC.
        </p>
      </div>

      <div class="footer__meta">
        <p>
          Fonte de dados:
          <strong>{{ isLiveMode ? 'TMDB (The Movie Database)' : 'catálogo local de demonstração' }}</strong>
        </p>
        <p>{{ count }} {{ count === 1 ? 'filme na lista' : 'filmes na lista' }}</p>
        <p class="footer__copy">© {{ year }} · Projecto académico, sem fins comerciais.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 50px;
  padding-block: 40px 48px;
  background: #0b0b0d;
  border-top: 1px solid var(--line-soft);
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 26px;
}

.footer__brand {
  max-width: 400px;
}

.footer__name {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: var(--red);
}

.footer__text {
  margin-top: 8px;
  font-size: 0.82rem;
  color: var(--dim);
  line-height: 1.6;
}

.footer__meta {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.78rem;
  color: var(--dim);
  text-align: right;
}

.footer__meta strong {
  color: var(--muted);
  font-weight: 500;
}

.footer__copy {
  margin-top: 6px;
  opacity: 0.75;
}

@media (max-width: 640px) {
  .footer__meta {
    text-align: left;
  }
}
</style>
