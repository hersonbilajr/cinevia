#!/usr/bin/env python3
"""
Gera o texto de uma página (PDF) exigido pelo enunciado da reposição de
Programação Web II — LECC31 (ISUTC).

Uso:
    python docs/gerar-relatorio.py

Requer: pip install reportlab
Saída:  docs/CINEVIA-Relatorio-PWEBII-LECC31.pdf  (exactamente 1 página A4)
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)

GOLD = colors.HexColor("#A8791A")
INK = colors.HexColor("#14161C")
MUTED = colors.HexColor("#5B6070")
RULE = colors.HexColor("#D8D2C4")

OUT = Path(__file__).resolve().parent / "CINEVIA-Relatorio-PWEBII-LECC31.pdf"

styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    "Titulo",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=19,
    leading=22,
    textColor=INK,
    spaceAfter=2,
)

subtitle_style = ParagraphStyle(
    "Subtitulo",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.4,
    leading=11,
    textColor=MUTED,
    spaceBefore=3,
)

h2_style = ParagraphStyle(
    "Seccao",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9.2,
    leading=11,
    textColor=GOLD,
    spaceBefore=8,
    spaceAfter=2.5,
)

body_style = ParagraphStyle(
    "Corpo",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.5,
    leading=11.1,
    textColor=INK,
    alignment=TA_JUSTIFY,
)

bullet_style = ParagraphStyle(
    "Bullet",
    parent=body_style,
    fontSize=8.4,
    leading=10.9,
    spaceAfter=1.4,
)


def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(item, bullet_style), leftIndent=10) for item in items],
        bulletType="bullet",
        bulletFontSize=6.5,
        bulletColor=GOLD,
        bulletOffsetY=-1,
        leftIndent=11,
        start="square",
    )


story = [
    Paragraph("CINEVIA — Explorador de Filmes em Vue.js", title_style),
    Paragraph(
        "Projecto de reposição · Programação Web II (LECC31) · 2.º semestre de 2026 · "
        "Instituto Superior de Transportes e Comunicações · Trabalho individual",
        subtitle_style,
    ),
    Spacer(1, 6),
    HRFlowable(width="100%", thickness=1.1, color=RULE, spaceAfter=2),
    Paragraph("1. Descrição da aplicação", h2_style),
    Paragraph(
        "CINEVIA é uma aplicação Web de página única (<i>single-page application</i>) desenvolvida em "
        "Vue.js 3 que permite explorar um catálogo de filmes obtido a partir da API pública "
        "<i>The Movie Database</i> (TMDB), com recurso a autenticação por token de leitura. A página "
        "inicial apresenta um filme em destaque e filas horizontais por categoria, com navegação por setas "
        "— populares, melhores classificações, estreias e filmes em exibição — e paginação nos resultados. O "
        "utilizador pode pesquisar por título e combinar filtros de género, ano de lançamento e "
        "classificação mínima, com ordenação configurável, obtendo resultados actualizados de imediato. "
        "Cada filme dispõe de uma página de detalhes com cartaz, sinopse, géneros, data de lançamento, "
        "classificação, duração, realização, elenco e sugestões relacionadas. Uma lista de favoritos é "
        "persistida em <i>localStorage</i>. A interface adopta tons escuros com um acento vermelho, é "
        "totalmente responsiva e inclui indicadores de carregamento, mensagens de erro e avisos de "
        "ausência de resultados. A aplicação funciona igualmente sem chave de API, através de um "
        "catálogo local de demonstração, e é publicada no GitHub Pages por intermédio de GitHub Actions.",
        body_style,
    ),
    Paragraph("2. Público-alvo", h2_style),
    Paragraph(
        "Estudantes universitários que procuram um filme para o fim de semana, membros de cineclubes "
        "e cinéfilos em geral que pretendem descobrir títulos por género, época ou qualidade de "
        "classificação. O público secundário inclui docentes e avaliadores, que necessitam de percorrer "
        "rapidamente um catálogo heterogéneo e de confirmar, num único ecrã, os dados essenciais de "
        "cada obra.",
        body_style,
    ),
    Paragraph("3. Vantagens da abordagem utilizada", h2_style),
    bullets(
        [
            "<b>Arquitectura por componentes reutilizáveis</b> (cartão, cartaz, filtros, paginação, "
            "estados de interface), o que reduz duplicação e facilita a manutenção e a evolução.",
            "<b>Separação de responsabilidades</b>: todo o acesso à API está isolado numa camada de "
            "serviço (<i>movieService</i>), ficando os componentes alheios à origem dos dados.",
            "<b>Interface reactiva com a Composition API</b> do Vue 3, com estado explícito e "
            "previsível, pesquisa com <i>debounce</i> e filtros que podem ser combinados livremente.",
            "<b>Dupla origem de dados</b>: ligação ao TMDB quando existe chave configurada e catálogo "
            "local de demonstração caso contrário, garantindo que a aplicação é sempre executável.",
            "<b>Experiência de utilização cuidada</b>: esqueletos de carregamento, tratamento de erros "
            "da API com repetição do pedido, favoritos persistentes e desenho responsivo.",
            "<b>Publicação simples e gratuita</b> no GitHub Pages, com <i>build</i> estático automático "
            "a cada <i>push</i> e caminhos relativos que evitam erros de recursos em subpastas.",
        ]
    ),
    Paragraph("4. Desvantagens da abordagem utilizada", h2_style),
    bullets(
        [
            "<b>Exposição da chave de acesso</b>: numa aplicação exclusivamente <i>frontend</i>, as "
            "variáveis <i>VITE_*</i> são incorporadas no <i>bundle</i> e ficam visíveis no navegador. "
            "Para um projecto académico com API de leitura é aceitável, mas uma solução de produção "
            "exigiria um servidor intermediário que guardasse o segredo.",
            "<b>Dependência de um serviço externo</b>: limites de pedidos, indisponibilidade pontual e "
            "traduções incompletas das sinopses para português estão fora do controlo da aplicação.",
            "<b>Filtros de pesquisa aplicados no cliente</b>: o serviço de pesquisa do TMDB não aceita "
            "filtros, pelo que, ao pesquisar com filtros activos, cada página pode apresentar menos "
            "resultados do que o total anunciado.",
            "<b>Paginação limitada</b> a 500 páginas pela própria API e inexistência de <i>cache</i> "
            "persistente para consulta offline; apenas os favoritos sobrevivem ao fecho do navegador.",
            "<b>Modo de demonstração reduzido</b>: sem chave, o catálogo local ilustra as "
            "funcionalidades mas não representa a dimensão nem a actualidade da base do TMDB.",
        ]
    ),
    Paragraph("5. Tecnologias utilizadas", h2_style),
    Paragraph(
        "Vue.js 3 (Composition API e <i>&lt;script setup&gt;</i>), Vue Router 4, JavaScript "
        "(ES2022+), HTML5, CSS3 (variáveis, <i>grid</i>, <i>flexbox</i> e animações), Vite 5, API REST "
        "do TMDB (versão 3), <i>fetch</i>/AJAX, <i>localStorage</i>, Git e GitHub (ramo principal "
        "<i>main</i> e ramo de trabalho <i>development</i>), GitHub Actions e GitHub Pages.",
        body_style,
    ),
]


def build():
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=17 * mm,
        rightMargin=17 * mm,
        topMargin=14 * mm,
        bottomMargin=12 * mm,
        title="CINEVIA — Explorador de Filmes em Vue.js",
        author="Projecto de reposição — Programação Web II (LECC31), ISUTC",
        subject="Texto de uma página: descrição, público-alvo, vantagens e desvantagens",
    )
    doc.build(story)
    return doc.page


if __name__ == "__main__":
    pages = build()
    print(f"PDF gerado: {OUT}")
    print(f"Número de páginas: {pages}")
    if pages != 1:
        raise SystemExit("ERRO: o documento deve ter exactamente uma página.")
