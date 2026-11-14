<script setup>
/**
 * Barra de navegação fixa: identidade, ligações principais, contador de
 * favoritos e indicação do modo de dados (TMDB ao vivo ou demonstração).
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useFavorites } from '../composables/useFavorites'
import { isLiveMode } from '../services/movieService'

const route = useRoute()
const { count } = useFavorites()

const links = [
  { name: 'home', label: 'Explorar' },
  { name: 'favorites', label: 'Favoritos' }
]

const isActive = (name) => route.name === name || (name === 'home' && route.name === 'movie')
const showBadge = computed(() => count.value > 0)
</script>

<template>
  <header class="nav">
    <div class="nav__inner container">
      <router-link to="/" class="brand" aria-label="CINEVIA — página inicial">
        <span class="brand__mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <rect x="4" y="7" width="24" height="18" rx="4" stroke="currentColor" stroke-width="1.8" />
            <path d="M4 12.5h24M10.5 7v18m11-18v18" stroke="currentColor" stroke-width="1.4" opacity=".55" />
            <circle cx="16" cy="16.4" r="2.6" fill="currentColor" />
          </svg>
        </span>
        <span class="brand__text">
          <span class="brand__name">CINEVIA</span>
          <span class="brand__tag">explorador de filmes</span>
        </span>
      </router-link>

      <nav class="nav__links" aria-label="Navegação principal">
        <router-link
          v-for="link in links"
          :key="link.name"
          :to="{ name: link.name }"
          class="nav__link"
          :class="{ 'nav__link--active': isActive(link.name) }"
        >
          {{ link.label }}
          <span v-if="link.name === 'favorites' && showBadge" class="nav__count">{{ count }}</span>
        </router-link>
      </nav>

      <span class="nav__mode" :class="isLiveMode ? 'nav__mode--live' : 'nav__mode--demo'">
        <span class="nav__dot" aria-hidden="true"></span>
        <span>{{ isLiveMode ? 'TMDB' : 'Demo' }}</span>
      </span>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid transparent;
  background: rgba(7, 8, 12, 0.72);
  backdrop-filter: blur(18px) saturate(140%);
  transition: border-color 0.3s var(--ease), background 0.3s var(--ease);
}

.nav::after {
  content: '';
  position: absolute;
  inset: auto 0 -1px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(240, 180, 41, 0.28), transparent);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: var(--nav-height);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
}

.brand__mark {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 11px;
  color: #1a1405;
  background: linear-gradient(140deg, var(--gold-bright), var(--gold));
  box-shadow: 0 8px 22px -12px rgba(240, 180, 41, 0.9);
}

.brand__mark svg {
  width: 22px;
  height: 22px;
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}

.brand__name {
  font-family: var(--font-display);
  font-size: 1.02rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.brand__tag {
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}

.nav__link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 15px;
  border-radius: var(--radius-pill);
  font-family: var(--font-display);
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-soft);
  transition: background 0.22s var(--ease), color 0.22s var(--ease);
}

.nav__link:hover {
  background: rgba(244, 242, 237, 0.07);
  color: var(--text);
}

.nav__link--active {
  color: #17120a;
  background: linear-gradient(135deg, var(--gold-bright), var(--gold));
}

.nav__count {
  display: inline-grid;
  place-items: center;
  min-width: 19px;
  height: 19px;
  padding-inline: 5px;
  border-radius: var(--radius-pill);
  background: var(--coral);
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
}

.nav__link--active .nav__count {
  background: rgba(23, 18, 10, 0.82);
  color: var(--gold-bright);
}

.nav__mode {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--line);
  background: var(--surface);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

.nav__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--muted);
}

.nav__mode--live {
  color: var(--mint);
  border-color: rgba(87, 214, 174, 0.4);
  background: rgba(87, 214, 174, 0.08);
}

.nav__mode--live .nav__dot {
  background: var(--mint);
  box-shadow: 0 0 0 3px rgba(87, 214, 174, 0.18);
  animation: pulse 2.4s infinite;
}

.nav__mode--demo {
  color: var(--gold);
  border-color: rgba(240, 180, 41, 0.32);
  background: var(--gold-soft);
}

.nav__mode--demo .nav__dot {
  background: var(--gold);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

@media (max-width: 620px) {
  .brand__tag {
    display: none;
  }

  .nav__mode span:last-child {
    display: none;
  }

  .nav__mode {
    padding: 8px;
  }

  .nav__link {
    padding: 8px 12px;
    font-size: 0.82rem;
  }
}
</style>
