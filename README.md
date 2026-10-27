# Pokédex - React + Vite

Atividade 03 da disciplina de Desenvolvimento e Integração de Aplicações Web.

Pokédex feita com React + Vite que mostra os 151 Pokémon do arquivo `pokedex-data.json`, com pesquisa, filtro por tipo, detalhes de cada Pokémon e uma área de treinadores.

**Dupla:**
- Arthur Gabriel de Oliveira
- Pedro Felipe Bastos

## Funcionalidades

- Lista de Pokémon com número, nome, tipos e atributos (HP, Ataque, Defesa, Ataque Especial, Defesa Especial e Velocidade)
- Pesquisa por nome ou número (ex.: `Bulba`, `25` ou `#025`), atualizando enquanto digita
- Filtro por tipo (usa os tipos do JSON)
- Detalhes do Pokémon em um modal, com barras de atributos e navegação anterior/próximo (também pelas setas do teclado)
- Tela de treinadores com insígnias e Pokémon de cada um (clicando no Pokémon abre os detalhes)
- Mensagem quando nenhum Pokémon é encontrado
- Extras: favoritos (salvos no localStorage), comparação entre dois Pokémon, ordenação por atributo/nome/número, Pokémon aleatório, tema escuro e layout responsivo

## Como executar

Precisa ter o [Node.js](https://nodejs.org/) instalado.

```bash
npm install
npm run dev
```

Depois é só abrir no navegador o endereço que aparece no terminal, normalmente:

```
http://localhost:5173
```

Para gerar a versão de produção: `npm run build` (os arquivos ficam em `dist/`).

## Dados

Os dados ficam em `src/data/pokedex-data.json` (tipos, Pokémon e treinadores). Eles são importados em `src/utils/pokemon.js`, que também ajusta algumas coisas:

- o Mew vem sem tipo no JSON, então recebe o tipo "Typeless" (Sem tipo)
- cada treinador recebe a lista de objetos dos seus Pokémon a partir de `pokemonIds`

## API externa

Usamos a [PokéAPI](https://pokeapi.co/) só como complemento:

- **Imagens:** `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png` (se não carregar, tenta o sprite simples e depois mostra uma Pokébola)
- **Detalhes extras:** altura, peso, habilidades e descrição vêm de `https://pokeapi.co/api/v2/pokemon/{id}` e `https://pokeapi.co/api/v2/pokemon-species/{id}`

Se a API estiver fora do ar, a Pokédex continua funcionando só com o JSON.

## Organização do projeto

```text
atividade03/
├── public/
│   └── pokeball.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # topo com as abas Pokédex / Treinadores
│   │   ├── SearchBar.jsx       # campo de pesquisa
│   │   ├── TypeFilter.jsx      # select de tipos
│   │   ├── Toolbar.jsx         # ordenação e filtro de favoritos
│   │   ├── PokemonList.jsx     # grid de cards
│   │   ├── PokemonCard.jsx     # card de um Pokémon
│   │   ├── PokemonImage.jsx    # imagem com fallback
│   │   ├── TypeBadge.jsx       # etiqueta do tipo
│   │   ├── StatBar.jsx         # barra de atributo
│   │   ├── PokemonDetails.jsx  # modal de detalhes
│   │   ├── Modal.jsx           # modal reutilizável
│   │   ├── CompareBar.jsx      # barra inferior da comparação
│   │   ├── ComparePanel.jsx    # tabela comparando dois Pokémon
│   │   ├── TrainerList.jsx     # tela de treinadores
│   │   ├── TrainerCard.jsx     # card de um treinador
│   │   └── EmptyState.jsx      # mensagem de "nada encontrado"
│   ├── css/                    # um arquivo de estilo por componente
│   ├── data/
│   │   └── pokedex-data.json
│   ├── hooks/
│   │   ├── useLocalStorage.js  # useState salvo no localStorage
│   │   └── usePokemonExtra.js  # busca na PokéAPI com useEffect
│   ├── utils/
│   │   ├── pokemon.js          # leitura e preparação dos dados
│   │   └── types.js            # cores e nomes dos tipos
│   ├── App.jsx                 # estados principais, filtros e telas
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Conceitos de React usados

- Componentes funcionais e props
- `useState` para pesquisa, filtros, ordenação, Pokémon selecionado, comparação, favoritos e tema
- `useMemo` para calcular a lista filtrada (estado derivado)
- `useEffect` para buscar dados na PokéAPI, salvar no localStorage e tratar teclas no modal
- `useCallback` nos handlers passados para o modal
- Hooks próprios (`useLocalStorage` e `usePokemonExtra`)
- Renderização de listas com `map()` e eventos (`onClick`, `onChange`)
