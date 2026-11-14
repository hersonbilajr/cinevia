/**
 * Catálogo local de demonstração.
 *
 * A aplicação funciona a 100% com a API do TMDB quando existe uma chave
 * configurada (.env). Para que o projecto possa ser aberto, avaliado e
 * testado sem qualquer configuração, este ficheiro fornece um conjunto de
 * filmes com a mesma estrutura de dados usada pela API, permitindo exercitar
 * listagem, pesquisa, filtros combinados, paginação e detalhes.
 */
export const demoMovies = [
  {
    id: 693134,
    title: 'Dune: Parte Dois',
    originalTitle: 'Dune: Part Two',
    releaseDate: '2024-02-27',
    rating: 8.2,
    votes: 12600,
    popularity: 980,
    runtime: 166,
    genres: ['Ficção Científica', 'Aventura'],
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Austin Butler'],
    tagline: 'Longa vida aos lutadores.',
    synopsis:
      'Paul Atreides une forças com Chani e com os Fremen para se vingar dos conspiradores que destruíram a sua família, ao mesmo tempo que tenta evitar um futuro terrível que só ele consegue prever.'
  },
  {
    id: 872585,
    title: 'Oppenheimer',
    originalTitle: 'Oppenheimer',
    releaseDate: '2023-07-19',
    rating: 8.1,
    votes: 9800,
    popularity: 870,
    runtime: 181,
    genres: ['Drama', 'História'],
    director: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Robert Downey Jr.', 'Matt Damon'],
    tagline: 'O mundo para sempre mudou.',
    synopsis:
      'A história do físico J. Robert Oppenheimer e do seu papel central no desenvolvimento da bomba atómica, bem como das consequências políticas e morais que o perseguiram durante décadas.'
  },
  {
    id: 346698,
    title: 'Barbie',
    originalTitle: 'Barbie',
    releaseDate: '2023-07-19',
    rating: 7.0,
    votes: 8900,
    popularity: 760,
    runtime: 114,
    genres: ['Comédia', 'Fantasia', 'Aventura'],
    director: 'Greta Gerwig',
    cast: ['Margot Robbie', 'Ryan Gosling', 'America Ferrera', 'Kate McKinnon'],
    tagline: 'Ela pode ser tudo. Ele só pode ser Ken.',
    synopsis:
      'Depois de uma crise existencial, a Barbie estereotípica deixa a Barbielândia e parte para o mundo real, onde descobre que a perfeição cor-de-rosa esconde questões bem mais complexas.'
  },
  {
    id: 496243,
    title: 'Parasita',
    originalTitle: '기생충',
    releaseDate: '2019-05-30',
    rating: 8.5,
    votes: 17400,
    popularity: 720,
    runtime: 132,
    genres: ['Thriller', 'Drama', 'Comédia'],
    director: 'Bong Joon-ho',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong', 'Choi Woo-shik'],
    tagline: 'Age como se fosses da família.',
    synopsis:
      'A família Kim, pobre mas cheia de recursos, infiltra-se aos poucos na casa dos ricos Park. O que começa como uma comédia de costumes transforma-se num retrato implacável da desigualdade social.'
  },
  {
    id: 157336,
    title: 'Interstellar',
    originalTitle: 'Interstellar',
    releaseDate: '2014-11-05',
    rating: 8.4,
    votes: 34200,
    popularity: 690,
    runtime: 169,
    genres: ['Ficção Científica', 'Aventura', 'Drama'],
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    tagline: 'A humanidade nasceu na Terra. Não foi feita para morrer aqui.',
    synopsis:
      'Com a Terra a tornar-se inabitável, um ex-piloto junta-se a uma equipa de exploradores que atravessa um buraco de minhoca em busca de um novo lar para a espécie humana.'
  },
  {
    id: 598,
    title: 'Cidade de Deus',
    originalTitle: 'Cidade de Deus',
    releaseDate: '2002-08-30',
    rating: 8.4,
    votes: 7600,
    popularity: 540,
    runtime: 130,
    genres: ['Crime', 'Drama'],
    director: 'Fernando Meirelles',
    cast: ['Alexandre Rodrigues', 'Leandro Firmino', 'Matheus Nachtergaele', 'Seu Jorge'],
    tagline: 'Se corres, o bicho apanha-te. Se ficas, o bicho come-te.',
    synopsis:
      'Nas décadas de 1960 a 1980, o crescimento do crime organizado numa favela do Rio de Janeiro é observado pelos olhos de Buscapé, um jovem que sonha ser fotógrafo.'
  },
  {
    id: 238,
    title: 'O Padrinho',
    originalTitle: 'The Godfather',
    releaseDate: '1972-03-14',
    rating: 8.7,
    votes: 20100,
    popularity: 610,
    runtime: 175,
    genres: ['Crime', 'Drama'],
    director: 'Francis Ford Coppola',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Robert Duvall'],
    tagline: 'Uma oferta que não podes recusar.',
    synopsis:
      'O patriarca de uma das mais poderosas famílias da máfia americana tenta transferir o controlo do império para o filho mais novo, que nunca quis fazer parte dos negócios da família.'
  },
  {
    id: 680,
    title: 'Pulp Fiction',
    originalTitle: 'Pulp Fiction',
    releaseDate: '1994-10-14',
    rating: 8.5,
    votes: 26400,
    popularity: 580,
    runtime: 154,
    genres: ['Crime', 'Thriller'],
    director: 'Quentin Tarantino',
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson', 'Bruce Willis'],
    tagline: 'Não julgues um livro pela capa.',
    synopsis:
      'Histórias de gangsters, um boxeur, uma mulher de um chefe da máfia e dois ladrões cruzam-se numa narrativa fragmentada sobre violência, humor e redenção em Los Angeles.'
  },
  {
    id: 129,
    title: 'A Viagem de Chihiro',
    originalTitle: '千と千尋の神隠し',
    releaseDate: '2001-07-20',
    rating: 8.6,
    votes: 15600,
    popularity: 660,
    runtime: 125,
    genres: ['Animação', 'Fantasia', 'Aventura'],
    director: 'Hayao Miyazaki',
    cast: ['Rumi Hiiragi', 'Miyu Irino', 'Mari Natsuki'],
    tagline: 'Um mundo onde nada é o que parece.',
    synopsis:
      'Chihiro, de dez anos, entra acidentalmente num mundo de espíritos e vê os pais transformados em porcos. Para os salvar, tem de trabalhar numa casa de banhos governada pela feiticeira Yubaba.'
  },
  {
    id: 244786,
    title: 'Whiplash',
    originalTitle: 'Whiplash',
    releaseDate: '2014-10-10',
    rating: 8.4,
    votes: 13900,
    popularity: 470,
    runtime: 106,
    genres: ['Drama', 'Música'],
    director: 'Damien Chazelle',
    cast: ['Miles Teller', 'J.K. Simmons', 'Paul Reiser', 'Melissa Benoist'],
    tagline: 'A estrada para a grandeza não tem limites.',
    synopsis:
      'Um jovem baterista de jazz entra no conservatório mais exigente do país, onde um professor tirânico o empurra até ao limite físico e emocional da obsessão pela perfeição.'
  },
  {
    id: 76341,
    title: 'Mad Max: Estrada da Fúria',
    originalTitle: 'Mad Max: Fury Road',
    releaseDate: '2015-05-15',
    rating: 7.6,
    votes: 22100,
    popularity: 505,
    runtime: 120,
    genres: ['Ação', 'Aventura', 'Ficção Científica'],
    director: 'George Miller',
    cast: ['Tom Hardy', 'Charlize Theron', 'Nicholas Hoult', 'Hugh Keays-Byrne'],
    tagline: 'O que um dia foi loucura tornou-se a única esperança.',
    synopsis:
      'Num deserto pós-apocalíptico, Max junta-se à imperatriz Furiosa numa fuga desesperada através de território hostil, perseguidos por um exército de fanáticos.'
  },
  {
    id: 376867,
    title: 'Moonlight',
    originalTitle: 'Moonlight',
    releaseDate: '2016-10-21',
    rating: 7.4,
    votes: 6100,
    popularity: 390,
    runtime: 111,
    genres: ['Drama'],
    director: 'Barry Jenkins',
    cast: ['Trevante Rhodes', 'Mahershala Ali', 'Naomie Harris', 'André Holland'],
    tagline: 'Três momentos. Uma vida.',
    synopsis:
      'Em três capítulos, acompanhamos a infância, adolescência e vida adulta de Chiron, um jovem negro de Miami que tenta encontrar o seu lugar num mundo que não o compreende.'
  },
  {
    id: 545611,
    title: 'Tudo em Todo o Lado ao Mesmo Tempo',
    originalTitle: 'Everything Everywhere All at Once',
    releaseDate: '2022-03-24',
    rating: 7.8,
    votes: 8300,
    popularity: 640,
    runtime: 139,
    genres: ['Ficção Científica', 'Comédia', 'Ação'],
    director: 'Daniel Kwan e Daniel Scheinert',
    cast: ['Michelle Yeoh', 'Ke Huy Quan', 'Stephanie Hsu', 'Jamie Lee Curtis'],
    tagline: 'O multiverso está nas tuas mãos.',
    synopsis:
      'Uma mulher sobrecarregada com a declaração de impostos da lavandaria da família descobre que precisa de explorar versões paralelas de si mesma para impedir uma ameaça que atravessa o multiverso.'
  },
  {
    id: 98,
    title: 'Gladiador',
    originalTitle: 'Gladiator',
    releaseDate: '2000-05-04',
    rating: 8.2,
    votes: 18700,
    popularity: 560,
    runtime: 155,
    genres: ['Ação', 'Drama', 'História'],
    director: 'Ridley Scott',
    cast: ['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen', 'Oliver Reed'],
    tagline: 'O que fazemos na vida ecoa na eternidade.',
    synopsis:
      'Traído por um imperador invejoso, o general romano Maximus é vendido como escravo e transformado em gladiador, procurando vingança através da arena.'
  },
  {
    id: 274,
    title: 'O Silêncio dos Inocentes',
    originalTitle: 'The Silence of the Lambs',
    releaseDate: '1991-02-14',
    rating: 8.3,
    votes: 14200,
    popularity: 430,
    runtime: 118,
    genres: ['Thriller', 'Crime', 'Terror'],
    director: 'Jonathan Demme',
    cast: ['Jodie Foster', 'Anthony Hopkins', 'Scott Glenn', 'Ted Levine'],
    tagline: 'Para apanhar um monstro, pensa como um.',
    synopsis:
      'Uma agente em formação do FBI procura a ajuda de Hannibal Lecter, um psiquiatra brilhante e assassino em série, para capturar outro criminoso que continua em liberdade.'
  },
  {
    id: 335984,
    title: 'Blade Runner 2049',
    originalTitle: 'Blade Runner 2049',
    releaseDate: '2017-10-06',
    rating: 7.6,
    votes: 15800,
    popularity: 445,
    runtime: 164,
    genres: ['Ficção Científica', 'Drama', 'Thriller'],
    director: 'Denis Villeneuve',
    cast: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas', 'Jared Leto'],
    tagline: 'Há um segredo que vale mais do que a própria humanidade.',
    synopsis:
      'Agente dos blade runners, K descobre um segredo capaz de desestabilizar o que resta da sociedade e parte à procura de Rick Deckard, desaparecido há trinta anos.'
  },
  {
    id: 419430,
    title: 'Get Out',
    originalTitle: 'Get Out',
    releaseDate: '2017-02-24',
    rating: 7.6,
    votes: 12100,
    popularity: 400,
    runtime: 104,
    genres: ['Terror', 'Thriller', 'Mistério'],
    director: 'Jordan Peele',
    cast: ['Daniel Kaluuya', 'Allison Williams', 'Bradley Whitford', 'Catherine Keener'],
    tagline: 'Só porque estás convidado, não significa que sejas bem-vindo.',
    synopsis:
      'Um jovem negro passa um fim-de-semana na casa dos pais da namorada branca e começa a suspeitar que a hospitalidade da família esconde algo profundamente perturbador.'
  },
  {
    id: 324857,
    title: 'Homem-Aranha: Um Novo Universo',
    originalTitle: 'Spider-Man: Into the Spider-Verse',
    releaseDate: '2018-12-06',
    rating: 8.4,
    votes: 13400,
    popularity: 615,
    runtime: 117,
    genres: ['Animação', 'Ação', 'Aventura'],
    director: 'Bob Persichetti, Peter Ramsey e Rodney Rothman',
    cast: ['Shameik Moore', 'Jake Johnson', 'Hailee Steinfeld', 'Mahershala Ali'],
    tagline: 'Mais do que um, há um universo inteiro deles.',
    synopsis:
      'Miles Morales descobre os poderes de Homem-Aranha e conhece heróis vindos de outras dimensões, que o ajudam a perceber o que significa realmente vestir a máscara.'
  },
  {
    id: 313369,
    title: 'La La Land',
    originalTitle: 'La La Land',
    releaseDate: '2016-12-08',
    rating: 7.9,
    votes: 14700,
    popularity: 520,
    runtime: 128,
    genres: ['Romance', 'Música', 'Drama'],
    director: 'Damien Chazelle',
    cast: ['Ryan Gosling', 'Emma Stone', 'John Legend', 'Rosemarie DeWitt'],
    tagline: 'Aqui está a loucura de amar.',
    synopsis:
      'Em Los Angeles, um pianista de jazz e uma aspirante a atriz apaixonam-se enquanto tentam conciliar os seus sonhos artísticos com as exigências da vida real.'
  },
  {
    id: 122,
    title: 'O Senhor dos Anéis: O Regresso do Rei',
    originalTitle: 'The Lord of the Rings: The Return of the King',
    releaseDate: '2003-12-01',
    rating: 8.5,
    votes: 23800,
    popularity: 590,
    runtime: 201,
    genres: ['Fantasia', 'Aventura', 'Ação'],
    director: 'Peter Jackson',
    cast: ['Elijah Wood', 'Viggo Mortensen', 'Ian McKellen', 'Sean Astin'],
    tagline: 'A grande jornada chega ao fim.',
    synopsis:
      'Enquanto Frodo e Sam se aproximam da Montanha da Perdição, as forças reunidas do Ocidente enfrentam o exército de Sauron numa batalha decisiva pela Terra-média.'
  },
  {
    id: 21228,
    title: 'O Auto da Compadecida',
    originalTitle: 'O Auto da Compadecida',
    releaseDate: '2000-09-15',
    rating: 8.3,
    votes: 1900,
    popularity: 300,
    runtime: 104,
    genres: ['Comédia', 'Aventura', 'Fantasia'],
    director: 'Guel Arraes',
    cast: ['Matheus Nachtergaele', 'Selton Mello', 'Marco Nanini', 'Fernanda Montenegro'],
    tagline: 'Uma história de esperteza, fé e pouca vergonha.',
    synopsis:
      'No sertão nordestino, João Grilo e Chicó sobrevivem à custa de artimanhas, até que a morte os obriga a prestar contas num julgamento celestial inesperado.'
  },
  {
    id: 4518,
    title: 'Central do Brasil',
    originalTitle: 'Central do Brasil',
    releaseDate: '1998-04-03',
    rating: 8.0,
    votes: 1500,
    popularity: 265,
    runtime: 113,
    genres: ['Drama', 'Aventura'],
    director: 'Walter Salles',
    cast: ['Fernanda Montenegro', 'Vinícius de Oliveira', 'Marília Pêra', 'Othon Bastos'],
    tagline: 'Uma viagem pelo país e por duas solidões.',
    synopsis:
      'Dora, uma ex-professora que escreve cartas para analfabetos na estação Central do Brasil, acaba por viajar pelo interior com Josué, um rapaz à procura do pai que nunca conheceu.'
  },
  {
    id: 497582,
    title: 'Bacurau',
    originalTitle: 'Bacurau',
    releaseDate: '2019-05-15',
    rating: 7.5,
    votes: 2100,
    popularity: 285,
    runtime: 131,
    genres: ['Western', 'Thriller', 'Mistério'],
    director: 'Kleber Mendonça Filho e Juliano Dornelles',
    cast: ['Sônia Braga', 'Udo Kier', 'Barbara Colen', 'Thomas Aquino'],
    tagline: 'Se vierem, não vão sair.',
    synopsis:
      'Quando a aldeia de Bacurau desaparece dos mapas e visitantes estranhos chegam ao sertão, os habitantes descobrem que estão a ser alvo de um jogo macabro — e respondem à altura.'
  },
  {
    id: 426426,
    title: 'Roma',
    originalTitle: 'Roma',
    releaseDate: '2018-08-30',
    rating: 7.7,
    votes: 4800,
    popularity: 335,
    runtime: 135,
    genres: ['Drama'],
    director: 'Alfonso Cuarón',
    cast: ['Yalitza Aparicio', 'Marina de Tavira', 'Diego Cortina Autrey', 'Carlos Peralta'],
    tagline: 'Os anos passam, a memória fica.',
    synopsis:
      'No México dos anos 70, Cleo, empregada doméstica de uma família de classe média em Colonia Roma, atravessa um ano de mudanças pessoais e convulsão social.'
  },
  {
    id: 475557,
    title: 'Joker',
    originalTitle: 'Joker',
    releaseDate: '2019-10-02',
    rating: 8.1,
    votes: 24900,
    popularity: 700,
    runtime: 122,
    genres: ['Crime', 'Drama', 'Thriller'],
    director: 'Todd Phillips',
    cast: ['Joaquin Phoenix', 'Robert De Niro', 'Zazie Beetz', 'Frances Conroy'],
    tagline: 'Põe um sorriso na cara.',
    synopsis:
      'Arthur Fleck, um comediante falhado e isolado em Gotham, vê a sua vida desmoronar-se até se transformar no símbolo de uma revolta violenta contra a cidade.'
  },
  {
    id: 438631,
    title: 'Dune',
    originalTitle: 'Dune',
    releaseDate: '2021-09-15',
    rating: 7.8,
    votes: 19300,
    popularity: 750,
    runtime: 155,
    genres: ['Ficção Científica', 'Aventura', 'Drama'],
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Rebecca Ferguson', 'Oscar Isaac', 'Josh Brolin'],
    tagline: 'O medo é o assassino da mente.',
    synopsis:
      'O herdeiro de uma família nobre é enviado para o planeta desértico Arrakis, onde se trava uma disputa brutal pelo controlo da substância mais valiosa do universo.'
  },
  {
    id: 361743,
    title: 'Top Gun: Maverick',
    originalTitle: 'Top Gun: Maverick',
    releaseDate: '2022-05-24',
    rating: 8.2,
    votes: 10400,
    popularity: 655,
    runtime: 130,
    genres: ['Ação', 'Drama'],
    director: 'Joseph Kosinski',
    cast: ['Tom Cruise', 'Miles Teller', 'Jennifer Connelly', 'Jon Hamm'],
    tagline: 'Sentir a necessidade. A necessidade de velocidade.',
    synopsis:
      'Trinta anos depois, Maverick regressa como instrutor para preparar um grupo de pilotos de elite para uma missão praticamente impossível.'
  },
  {
    id: 76600,
    title: 'Avatar: O Caminho da Água',
    originalTitle: 'Avatar: The Way of Water',
    releaseDate: '2022-12-14',
    rating: 7.6,
    votes: 12900,
    popularity: 830,
    runtime: 192,
    genres: ['Ficção Científica', 'Aventura', 'Ação'],
    director: 'James Cameron',
    cast: ['Sam Worthington', 'Zoe Saldaña', 'Sigourney Weaver', 'Stephen Lang'],
    tagline: 'Volta a Pandora.',
    synopsis:
      'Jake Sully e Neytiri formaram uma família e refugiaram-se junto dos clãs do mar, mas uma antiga ameaça regressa e obriga-os a lutar por tudo o que construíram.'
  },
  {
    id: 399055,
    title: 'A Forma da Água',
    originalTitle: 'The Shape of Water',
    releaseDate: '2017-12-01',
    rating: 7.3,
    votes: 11200,
    popularity: 360,
    runtime: 123,
    genres: ['Fantasia', 'Drama', 'Romance'],
    director: 'Guillermo del Toro',
    cast: ['Sally Hawkins', 'Doug Jones', 'Michael Shannon', 'Octavia Spencer'],
    tagline: 'Um conto de fadas para tempos difíceis.',
    synopsis:
      'Num laboratório secreto dos anos 60, uma funcionária muda cria um laço com uma criatura anfíbia mantida em cativeiro e planeia ajudá-la a escapar.'
  },
  {
    id: 120467,
    title: 'O Grande Hotel Budapeste',
    originalTitle: 'The Grand Budapest Hotel',
    releaseDate: '2014-03-07',
    rating: 8.1,
    votes: 13100,
    popularity: 375,
    runtime: 100,
    genres: ['Comédia', 'Drama', 'Aventura'],
    director: 'Wes Anderson',
    cast: ['Ralph Fiennes', 'Tony Revolori', 'Saoirse Ronan', 'Adrien Brody'],
    tagline: 'Uma história de simetria, porteiro e pastelaria.',
    synopsis:
      'O lendário concierge M. Gustave e o seu fiel lobby boy vêem-se envolvidos no roubo de uma pintura renascentista e numa disputa de herança na Europa dos anos 30.'
  },
  {
    id: 348,
    title: 'Alien',
    originalTitle: 'Alien',
    releaseDate: '1979-05-25',
    rating: 8.1,
    votes: 14500,
    popularity: 415,
    runtime: 117,
    genres: ['Terror', 'Ficção Científica'],
    director: 'Ridley Scott',
    cast: ['Sigourney Weaver', 'Tom Skerritt', 'John Hurt', 'Ian Holm'],
    tagline: 'No espaço ninguém te ouve gritar.',
    synopsis:
      'A tripulação de uma nave de carga responde a um sinal de socorro e traz a bordo um organismo desconhecido que começa a eliminá-los um a um.'
  },
  {
    id: 1891,
    title: 'O Império Contra-Ataca',
    originalTitle: 'The Empire Strikes Back',
    releaseDate: '1980-05-20',
    rating: 8.4,
    votes: 16800,
    popularity: 600,
    runtime: 124,
    genres: ['Ficção Científica', 'Aventura', 'Ação'],
    director: 'Irvin Kershner',
    cast: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher', 'Billy Dee Williams'],
    tagline: 'A aventura continua.',
    synopsis:
      'Depois de uma derrota humilhante, a Aliança Rebelde dispersa-se e Luke Skywalker procura treino com Yoda, enquanto Darth Vader persegue os seus amigos pela galáxia.'
  },
  {
    id: 155,
    title: 'O Cavaleiro das Trevas',
    originalTitle: 'The Dark Knight',
    releaseDate: '2008-07-16',
    rating: 8.5,
    votes: 32600,
    popularity: 705,
    runtime: 152,
    genres: ['Ação', 'Crime', 'Drama'],
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
    tagline: 'Porque tão sério?',
    synopsis:
      'Batman enfrenta o Joker, um criminoso anárquico decidido a mergulhar Gotham no caos e a provar que qualquer pessoa pode ser corrompida.'
  },
  {
    id: 14160,
    title: 'Up — Altamente!',
    originalTitle: 'Up',
    releaseDate: '2009-05-28',
    rating: 8.0,
    votes: 19600,
    popularity: 480,
    runtime: 96,
    genres: ['Animação', 'Aventura', 'Comédia'],
    director: 'Pete Docter',
    cast: ['Edward Asner', 'Jordan Nagai', 'Christopher Plummer'],
    tagline: 'A aventura está lá fora.',
    synopsis:
      'Um viúvo de 78 anos amarra milhares de balões à sua casa e parte rumo à América do Sul, levando consigo, sem querer, um escuteiro de oito anos.'
  },
  {
    id: 68718,
    title: 'Django Libertado',
    originalTitle: 'Django Unchained',
    releaseDate: '2012-12-25',
    rating: 8.2,
    votes: 16200,
    popularity: 460,
    runtime: 165,
    genres: ['Western', 'Drama', 'Ação'],
    director: 'Quentin Tarantino',
    cast: ['Jamie Foxx', 'Christoph Waltz', 'Leonardo DiCaprio', 'Kerry Washington'],
    tagline: 'A justiça tem um novo nome.',
    synopsis:
      'Um escravo liberto torna-se caçador de recompensas e atravessa o Sul dos Estados Unidos para resgatar a esposa das mãos de um fazendeiro cruel.'
  },
  {
    id: 1295894,
    title: 'O Horizonte Partido',
    originalTitle: 'The Broken Horizon',
    releaseDate: '2027-02-11',
    rating: 0,
    votes: 0,
    popularity: 900,
    runtime: 138,
    genres: ['Ficção Científica', 'Drama'],
    director: 'Ana Ferreira',
    cast: ['Elenco por anunciar'],
    tagline: 'Estreia prevista para 2027.',
    synopsis:
      'Entrada de demonstração da categoria "em estreia": uma estação orbital isolada recebe um sinal que não deveria existir. Este registo existe apenas no modo de demonstração, para ilustrar filmes ainda sem classificação.'
  },
  {
    id: 1295895,
    title: 'Maré de Agosto',
    originalTitle: 'Maré de Agosto',
    releaseDate: '2027-07-08',
    rating: 0,
    votes: 0,
    popularity: 820,
    runtime: 112,
    genres: ['Drama', 'Romance'],
    director: 'Nuno Cardoso',
    cast: ['Elenco por anunciar'],
    tagline: 'Estreia prevista para Julho de 2027.',
    synopsis:
      'Segunda entrada de demonstração para a categoria "em estreia": dois desconhecidos partilham uma casa de praia durante uma semana de tempestade. Existe apenas no catálogo local de demonstração.'
  }
]
