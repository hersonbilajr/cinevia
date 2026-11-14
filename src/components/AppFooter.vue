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
        <p>{{ count }} {{ count === 1 ? 'filme guardado' : 'filmes guardados' }} nos favoritos</p>
        <p class="footer__copy">© {{ year }} · Projecto académico, sem fins comerciais.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 60px;
  border-top: 1px solid var(--line-soft);
  background: linear-gradient(180deg, rgba(11, 13, 19, 0.4), rgba(7, 8, 12, 0.9));
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 26px;
  padding-block: 38px 44px;
}

.footer__brand {
  max-width: 380px;
}

.footer__name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--gold);
}

.footer__text {
  margin-top: 8px;
  font-size: 0.83rem;
  color: var(--muted);
  line-height: 1.6;
}

.footer__meta {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.8rem;
  color: var(--muted);
  text-align: right;
}

.footer__meta strong {
  color: var(--text-soft);
  font-weight: 500;
}

.footer__copy {
  margin-top: 6px;
  opacity: 0.7;
}

@media (max-width: 640px) {
  .footer__meta {
    text-align: left;
  }
}
</style>
