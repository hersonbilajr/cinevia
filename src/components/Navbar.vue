<script setup>
/**
 * Barra superior: identidade, navegação, contador de favoritos e indicação
 * do modo de dados. Fica transparente sobre o destaque e ganha fundo sólido
 * ao rolar a página.
 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useFavorites } from '../composables/useFavorites'
import { isLiveMode } from '../services/movieService'

const route = useRoute()
const { count } = useFavorites()
const scrolled = ref(false)

const links = [
  { name: 'home', label: 'Início' },
  { name: 'favorites', label: 'A minha lista' }
]

const isActive = (name) => route.name === name || (name === 'home' && route.name === 'movie')
const showBadge = computed(() => count.value > 0)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ 'nav--solid': scrolled }">
    <div class="nav__inner">
      <router-link to="/" class="brand" aria-label="CINEVIA — página inicial">
        <span class="brand__mark" aria-hidden="true">C</span>
        <span class="brand__name">CINEVIA</span>
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
        {{ isLiveMode ? 'TMDB' : 'Demo' }}
      </span>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 60;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.86) 10%, rgba(0, 0, 0, 0));
  transition: background 0.35s var(--ease);
}

.nav--solid {
  background: #0b0b0d;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.06);
}

.nav__inner {
  display: flex;
  align-items: center;
  gap: 22px;
  height: var(--nav-height);
  max-width: var(--container);
  margin: 0 auto;
  padding-inline: 4%;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  flex-shrink: 0;
}

.brand__mark {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 2px;
  background: var(--red);
  color: #fff;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
}

.brand__name {
  font-family: var(--font-display);
  font-size: 1.32rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  color: var(--red);
  text-transform: uppercase;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 12px;
}

.nav__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-soft);
  transition: color 0.2s var(--ease), opacity 0.2s var(--ease);
}

.nav__link:hover {
  color: #fff;
}

.nav__link--active {
  color: #fff;
  font-weight: 700;
}

.nav__count {
  display: inline-grid;
  place-items: center;
  min-width: 18px;
  height: 18px;
  padding-inline: 5px;
  border-radius: 3px;
  background: var(--red);
  color: #fff;
  font-size: 0.66rem;
  font-weight: 700;
}

.nav__mode {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-left: auto;
  padding: 4px 10px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 2px;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}

.nav__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.nav__mode--live {
  color: #4ade80;
  border-color: rgba(74, 222, 128, 0.4);
}

.nav__mode--demo {
  color: #ffb4b8;
  border-color: rgba(229, 9, 20, 0.45);
}

@media (max-width: 620px) {
  .brand__name {
    font-size: 1.1rem;
    letter-spacing: 0.1em;
  }

  .nav__inner {
    gap: 14px;
    padding-inline: 16px;
  }

  .nav__links {
    gap: 14px;
    margin-left: 0;
  }

  .nav__link {
    font-size: 0.82rem;
  }

  .nav__mode {
    padding: 3px 7px;
    font-size: 0.58rem;
  }
}
</style>
