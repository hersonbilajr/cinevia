# CINEVIA — Explorador de Filmes em Vue.js

Aplicação Web de página única (SPA) desenvolvida em **Vue.js 3 + Vite** que permite explorar,
pesquisar, filtrar e consultar informação detalhada sobre filmes, com dados da API pública
[TMDB — The Movie Database](https://www.themoviedb.org/). Preparada para publicação no **GitHub Pages**.

> Trabalho individual de reposição · **Programação Web II — LECC31** · 2.º semestre de 2026
> Instituto Superior de Transportes e Comunicações (ISUTC) · Docente: Ivan Ruby

**Repositório:** <https://github.com/hersonbilajr/cinevia> ·
**Aplicação publicada:** <https://hersonbilajr.github.io/cinevia/> ·
**Texto de uma página:** [docs/CINEVIA-Relatorio-PWEBII-LECC31.pdf](docs/CINEVIA-Relatorio-PWEBII-LECC31.pdf)

---

## 1. Funcionalidades

### Requisitos mínimos
| Requisito | Como está implementado |
|---|---|
| Listagem de filmes | Grelha de cartões com cartaz, título, ano, género e classificação (`MovieGrid`, `MovieCard`) |
| Navegação pela lista | Paginação numérica com janela deslizante (`PaginationBar`) |
| Pesquisa por título | Barra de pesquisa com *debounce* de 420 ms (`SearchBar`) |
| Filtros | Género, ano de lançamento e classificação mínima, combináveis entre si e com a pesquisa (`MovieFilters`) |
| Detalhes do filme | Página própria em `/filme/:id` com sinopse, géneros, data, classificação, duração, realização, elenco e mais (`MovieView`, `MovieDetails`) |

### Funcionalidades adicionais
- **Filas horizontais por categoria** (populares, melhores classificações, em estreia, em exibição), com setas de navegação e pré-visualização ao passar o rato — quando há pesquisa ou filtros activos a página passa a mostrar uma grelha de resultados.
- **Secção de destaque** (*hero*) com o filme mais popular do momento.
- **Favoritos** persistidos em `localStorage`, com contador na barra de navegação e página dedicada
  (`/favoritos`), incluindo pesquisa dentro da lista e remoção individual ou total.
- **Ordenação** dos resultados (populares, melhor classificados, mais recentes).
- **Filtros em etiquetas removíveis** e botão «Limpar filtros».
- **Filmes relacionados** na página de detalhes.
- **Estados de interface**: esqueletos de carregamento, mensagens de erro da API com «Tentar
  novamente» e avisos de ausência de resultados.
- **Modo demonstração** com catálogo local — a aplicação funciona mesmo sem chave de API.
- **Acessibilidade básica**: navegação por teclado, atalho `/` para a pesquisa, `aria-label`/`aria-live`
  nos estados, ligação «saltar para o conteúdo» e respeito por `prefers-reduced-motion`.
- **Design responsivo** para computador, tablet e telemóvel, com tema escuro e identidade própria
  (ouro sobre tinta, tipografia Sora/Inter).

---

## 2. Tecnologias

- **Vue.js 3** — Composition API com `<script setup>`
- **Vue Router 4** — rotas em modo *hash* (compatível com GitHub Pages)
- **JavaScript (ES2022+)**, **HTML5**, **CSS3** (variáveis, Grid, Flexbox, animações)
- **Vite 5** — servidor de desenvolvimento e *build*
- **API REST do TMDB** (versão 3) via `fetch`
- **localStorage** — persistência dos favoritos
- **Git / GitHub / GitHub Actions / GitHub Pages**

---

## 3. Estrutura do projecto

```
cinevia/
├── .github/workflows/deploy.yml     # CI/CD: build + publicação no GitHub Pages
├── docs/
│   ├── CINEVIA-Relatorio-PWEBII-LECC31.pdf   # texto de 1 página (entrega)
│   └── gerar-relatorio.py                    # script que gera esse PDF
├── public/                          # (opcional) ficheiros estáticos
├── src/
│   ├── assets/main.css              # sistema de design global
│   ├── components/
│   │   ├── AppFooter.vue
│   │   ├── FavoriteButton.vue
│   │   ├── HeroBanner.vue
│   │   ├── MovieCard.vue
│   │   ├── MovieDetails.vue
│   │   ├── MovieFilters.vue
│   │   ├── MovieGrid.vue
│   │   ├── MoviePoster.vue
│   │   ├── MovieRow.vue
│   │   ├── Navbar.vue
│   │   ├── PaginationBar.vue
│   │   ├── SearchBar.vue
│   │   └── StateMessage.vue
│   ├── composables/useFavorites.js  # estado dos favoritos + localStorage
│   ├── data/demoMovies.js           # catálogo local (modo demonstração)
│   ├── router/index.js              # rotas da aplicação
│   ├── services/movieService.js     # única camada de acesso à API
│   ├── utils/format.js              # formatação de notas, datas, durações
│   ├── views/
│   │   ├── FavoritesView.vue
│   │   ├── HomeView.vue
│   │   ├── MovieView.vue
│   │   └── NotFoundView.vue
│   ├── App.vue
│   └── main.js
├── .env.example                     # modelo das variáveis de ambiente
├── index.html
├── package.json
└── vite.config.js
```

---

## 4. Executar localmente (Windows + VS Code)

**Pré-requisitos:** [Node.js 20 ou superior](https://nodejs.org/) (inclui o `npm`) e o
[VS Code](https://code.visualstudio.com/).

1. Abrir o **VS Code** → `Ficheiro → Abrir Pasta…` → escolher a pasta do projecto.
2. Abrir o terminal integrado: `Terminal → Novo Terminal` (ou `Ctrl` + `'`). No Windows, garantir que
   o terminal é **PowerShell** ou **Command Prompt**.
3. Instalar as dependências:

   ```powershell
   npm install
   ```

4. Arrancar o servidor de desenvolvimento:

   ```powershell
   npm run dev
   ```

5. Abrir no navegador o endereço apresentado no terminal (normalmente
   <http://localhost:5173>). A página recarrega automaticamente a cada alteração.
6. Para parar o servidor: `Ctrl` + `C` no terminal.

> Sem qualquer configuração adicional a aplicação arranca em **modo demonstração** (ver secção 5).

Outros comandos úteis:

```powershell
npm run build      # gera a versão de produção na pasta dist/
npm run preview    # serve localmente a versão de produção
```

---

## 5. Modos de dados (TMDB ao vivo vs. demonstração)

A aplicação tem **duas origens de dados com a mesma interface**, decididas pela presença (ou não) de
uma credencial do TMDB:

| Situação | Modo | O que acontece |
|---|---|---|
| Existe `VITE_TMDB_TOKEN` (ou `VITE_TMDB_API_KEY`) no `.env` | **TMDB (ao vivo)** | Todos os dados vêm da API oficial; o indicador da barra superior fica verde com «TMDB» |
| Não existe chave | **Demonstração** | É usado o catálogo local `src/data/demoMovies.js` (37 filmes com metadados reais); o indicador fica dourado com «Demo» e a página inicial mostra um aviso |

O modo demonstração existe para que o projecto possa ser **aberto e avaliado de imediato**, sem
depender de uma chave privada ou de ligação à Internet. Todos os ecrãs, filtros, paginação e
favoritos funcionam igualmente nos dois modos.

---

## 6. Obter e configurar a chave do TMDB

1. Criar conta gratuita em <https://www.themoviedb.org/signup>.
2. Aceder a **Settings → API** (<https://www.themoviedb.org/settings/api>) e pedir acesso de
   programador (*Request an API key* → tipo *Developer*), indicando a utilização «projecto académico».
3. Na página da chave existem dois valores; a aplicação aceita qualquer um deles:
   - **API Read Access Token (v4)** — recomendado, é uma cadeia longa que começa por `eyJ…`;
   - **API Key (v3)** — 32 caracteres alfanuméricos.
4. Na raiz do projecto, duplicar o ficheiro de exemplo e preencher o valor:

   ```powershell
   Copy-Item .env.example .env        # PowerShell
   ```

   ```bat
   copy .env.example .env             :: Command Prompt
   ```

   Conteúdo do `.env`:

   ```env
   VITE_TMDB_TOKEN=eyJhbGciOi...o-teu-token-completo
   VITE_TMDB_LANGUAGE=pt-PT
   ```

5. Reiniciar `npm run dev` (as variáveis `VITE_*` só são lidas ao arrancar). A barra superior passa a
   mostrar «TMDB» a verde.

### Limitações de segurança de uma aplicação *frontend*

O Vite **incorpora** todas as variáveis `VITE_*` no *bundle* JavaScript publicado. Por isso:

- a chave **fica visível** para qualquer pessoa que inspeccione a aplicação publicada;
- `.env` **nunca** deve ir para o repositório (já está no `.gitignore`) e chaves reais **não** devem
  ser escritas no código-fonte;
- como a chave do TMDB é apenas de **leitura** e não dá acesso a dados pessoais, o risco é baixo para
  um projecto académico — mas um sistema em produção deveria usar um servidor intermediário
  (*proxy*/*backend*) que guardasse o segredo e assinasse os pedidos;
- em ambiente publicado, a chave deve ser guardada em **GitHub → Settings → Secrets and variables →
  Actions** (nunca em ficheiros versionados).

---

## 7. Publicar no GitHub Pages

O repositório já inclui o *workflow* `.github/workflows/deploy.yml`, que compila a aplicação e a
publica automaticamente a cada `push` para `main`.

### 7.1 Criar o repositório e as duas branches

```powershell
# na pasta do projecto
git init -b main
git add .
git commit -m "feat: aplicação CINEVIA em Vue.js 3 com pesquisa, filtros e detalhes"
git remote add origin https://github.com/<o-teu-utilizador>/cinevia.git
git push -u origin main

# segunda branch, exigida pelo enunciado
git checkout -b development
git push -u origin development

# voltar ao ramo principal para continuar a trabalhar
git checkout main
```

No GitHub, confirmar em **Code → branches** que aparecem `main` e `development`.

### 7.2 Configuração do `vite.config.js`

O projecto usa `base: './'`, o que gera **caminhos relativos** para todos os recursos (`./assets/...`).
Assim o mesmo `dist/` funciona em qualquer endereço, incluindo subpastas do tipo
`https://<utilizador>.github.io/<repositorio>/`, sem alterações. Se preferires caminhos absolutos:

```powershell
$env:VITE_BASE="/cinevia/"; npm run build
```

O *router* usa `createWebHashHistory()`, ou seja, os endereços têm a forma
`https://<utilizador>.github.io/cinevia/#/filme/693134`. Isto é intencional: o GitHub Pages não
permite reescrever caminhos no servidor, pelo que com *history mode* um simples `F5` em `/filme/1`
devolveria **404**.

### 7.3 Activar o GitHub Pages

1. No repositório: **Settings → Pages**.
2. Em *Build and deployment → Source*, escolher **GitHub Actions**.
3. (Opcional, para dados reais) **Settings → Secrets and variables → Actions → New repository secret**:
   nome `VITE_TMDB_TOKEN`, valor = token do TMDB. Sem este segredo a publicação fica em modo
   demonstração.
4. Fazer `git push origin main` (ou correr o *workflow* manualmente em **Actions → Deploy CINEVIA no
   GitHub Pages → Run workflow**).
5. Acompanhar a execução em **Actions**; no final, o endereço público aparece no resumo do *job* e em
   **Settings → Pages**:

   ```
   https://<utilizador>.github.io/cinevia/
   ```

6. Abrir o endereço, confirmar que a página inicial carrega, que a pesquisa e os filtros funcionam e
   que `/filme/<id>` abre corretamente.

> A publicação só deve ser considerada concluída depois de a aplicação estar acessível nesse
> endereço. Se o *workflow* falhar, consultar os *logs* do passo que falhou (ver secção 10).

---

## 8. Git, branches e commits

O enunciado pede pelo menos duas branches e mensagens de commit descritivas. Sugestão de organização:

| Branch | Utilização |
|---|---|
| `main` | Versão estável — é a que o GitHub Pages publica |
| `development` | Desenvolvimento de novas funcionalidades antes de passarem para `main` |

Fluxo recomendado:

```powershell
git checkout development
git add .
git commit -m "feat: adicionar ordenação dos resultados"
git push origin development

git checkout main
git merge development
git push origin main      # dispara a publicação automática
```

Exemplos de mensagens descritivas: `feat: página de favoritos com localStorage`,
`fix: corrigir filtro por ano no modo demonstração`, `docs: instruções de publicação no GitHub Pages`.

---

## 9. Documento PDF de uma página (entrega)

O texto de uma página encontra-se em
[`docs/CINEVIA-Relatorio-PWEBII-LECC31.pdf`](docs/CINEVIA-Relatorio-PWEBII-LECC31.pdf) e contém:

1. Nome do projecto;
2. Breve descrição da aplicação;
3. Público-alvo;
4. Vantagens da abordagem utilizada;
5. Desvantagens da abordagem utilizada;
6. Tecnologias utilizadas.

Para o regenerar depois de alterar o texto:

```powershell
pip install reportlab
python docs/gerar-relatorio.py     # verifica automaticamente que o resultado tem 1 página
```

---

## 10. Resolução de problemas

| Sintoma | Causa provável / solução |
|---|---|
| Página em branco após publicar | `base` incorrecta no `vite.config.js`. Manter `'./'` ou definir `VITE_BASE` com o nome do repositório (`/cinevia/`). |
| 404 ao recarregar uma rota | O GitHub Pages não reescreve caminhos; usar o `createWebHashHistory()` já configurado (endereços com `#/`). |
| Ícones/estilos sem carregar | Confirmar que o *workflow* publicou a pasta `dist` e que o `Actions` terminou com sucesso. Limpar a cache do navegador (`Ctrl` + `F5`). |
| `npm ci` falha no GitHub Actions | O `package-lock.json` tem de estar versionado no repositório (não remover do Git). |
| *Workflow* falha em *upload-pages-artifact* | Confirmar que **Settings → Pages → Source** está em **GitHub Actions**. |
| Barra superior mostra «Demo» | Não existe `VITE_TMDB_TOKEN` no `.env` local ou nos *Secrets* do repositório. |
| Erro «A chave da API do TMDB foi recusada» | Token inválido/incompleto (tem de ser copiado por inteiro) ou variável criada depois de arrancar o `npm run dev` — reiniciar o servidor. |
| Nenhum resultado com filtros + pesquisa | Comportamento esperado no modo TMDB: a pesquisa não aceita filtros, que são aplicados aos resultados da página. Simplificar os filtros. |
| Cartazes não aparecem | Alguns filmes não têm imagem no TMDB; é mostrado um cartaz gráfico gerado automaticamente. |

---

## 11. Verificação efectuada

- `npm install` e `npm run build` concluídos sem erros (Vite 5).
- Servidor de desenvolvimento arranca e serve a aplicação em `http://localhost:5173`.
- Pesquisa, filtros combinados, paginação, navegação entre páginas, favoritos e estados de erro
  implementados e exercitados no modo demonstração (que usa a mesma lógica de filtros e paginação do
  modo TMDB).
- O modo TMDB ao vivo requer uma chave pessoal; sem ela a aplicação arranca em demonstração, por
  opção de desenho.

---

## 12. Direitos e créditos

Projecto académico sem fins comerciais. Os dados e as imagens de filmes pertencem ao
**TMDB** e aos respectivos titulares; esta aplicação não é afiliada nem endossada pelo TMDB.
