import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * Configuração do Vite para o GitHub Pages.
 *
 * `base: './'` gera caminhos relativos em todos os recursos (JS, CSS, imagens),
 * pelo que o mesmo `dist/` funciona em qualquer URL, por exemplo:
 *   https://<utilizador>.github.io/<repositorio>/
 * Também se pode fixar o caminho absoluto do repositório com a variável
 * de ambiente VITE_BASE (ex.: VITE_BASE=/cinevia/ npm run build).
 */
/**
 * Hosts adicionais aceites pelo servidor de desenvolvimento. É útil quando a
 * aplicação é servida através de um túnel ou de um preview remoto (ex.:
 * VITE_ALLOWED_HOSTS=exemplo.dev npm run dev). Não afecta o build.
 */
const allowedHosts = (process.env.VITE_ALLOWED_HOSTS || '')
  .split(',')
  .map((host) => host.trim())
  .filter(Boolean)

export default defineConfig({
  plugins: [vue()],
  base: process.env.VITE_BASE || './',
  server: {
    host: '0.0.0.0',
    port: 5173,
    ...(allowedHosts.length ? { allowedHosts } : {})
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
