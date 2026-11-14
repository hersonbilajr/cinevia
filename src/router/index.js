import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

/**
 * É utilizada a "hash history" (#/rota) de propósito: no GitHub Pages não é
 * possível configurar reescritas de servidor, pelo que um caminho como
 * /filme/693134 devolveria 404 ao recarregar a página. Com o modo hash todos
 * os pedidos chegam sempre a index.html e as rotas funcionam em qualquer
 * subpasta do domínio.
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Explorar filmes' }
    },
    {
      path: '/filme/:id',
      name: 'movie',
      component: () => import('../views/MovieView.vue'),
      meta: { title: 'Detalhes do filme' }
    },
    {
      path: '/favoritos',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue'),
      meta: { title: 'Os meus favoritos' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: 'Página não encontrada' }
    }
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  const base = 'CINEVIA · Explorador de Filmes'
  document.title = to.meta.title ? `${to.meta.title} · CINEVIA` : base
})

export default router
