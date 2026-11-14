<script setup>
/**
 * Estrutura base: navegação fixa, conteúdo com transição e rodapé.
 */
import Navbar from './components/Navbar.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <a class="skip-link" href="#conteudo">Saltar para o conteúdo</a>
  <Navbar />
  <main id="conteudo" class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <AppFooter />
</template>

<style scoped>
.app-main {
  min-height: 60vh;
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 100;
  padding: 10px 18px;
  background: var(--red);
  color: #fff;
  font-weight: 600;
}

.skip-link:focus {
  left: 0;
}
</style>
