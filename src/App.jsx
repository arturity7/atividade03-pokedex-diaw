import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import Toolbar from './components/Toolbar'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import CompareBar from './components/CompareBar'
import ComparePanel from './components/ComparePanel'
import TrainerList from './components/TrainerList'
import EmptyState from './components/EmptyState'
import { useLocalStorage } from './hooks/useLocalStorage'
import { availableTypes, pokemonById, pokemonList, trainers } from './utils/pokemon'
import './css/App.css'

// Quantidade de Pokémon de cada tipo (aparece no filtro)
const typeCounts = pokemonList.reduce((counts, pokemon) => {
  pokemon.types.forEach((type) => {
    counts[type.name] = (counts[type.name] ?? 0) + 1
  })
  return counts
}, {})

// Se o termo for número (ex.: 25 ou #025) busca pelo ID, senão pelo nome
function matchesSearch(pokemon, term) {
  if (!term) return true
  const digits = term.replace(/^#/, '')
  if (/^\d+$/.test(digits)) {
    return String(pokemon.id).startsWith(String(Number(digits)))
  }
  return pokemon.name.toLowerCase().includes(term)
}

function App() {
  const [view, setView] = useState('pokedex')
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('id')
  const [sortDirection, setSortDirection] = useState('asc')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [compareIds, setCompareIds] = useState([])
  const [isComparing, setIsComparing] = useState(false)
  const [favorites, setFavorites] = useLocalStorage('pokedex-favorites', [])
  const [theme, setTheme] = useLocalStorage('pokedex-theme', 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Lista exibida calculada a partir da pesquisa, filtro e ordenação
  const filteredPokemon = useMemo(() => {
    const term = search.trim().toLowerCase()
    const direction = sortDirection === 'asc' ? 1 : -1

    return pokemonList
      .filter((pokemon) => matchesSearch(pokemon, term))
      .filter((pokemon) => selectedType === 'all' || pokemon.types.some((type) => type.name === selectedType))
      .filter((pokemon) => !onlyFavorites || favorites.includes(pokemon.id))
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name) * direction
        const valueA = sortBy === 'id' || sortBy === 'total' ? a[sortBy] : a.stats[sortBy]
        const valueB = sortBy === 'id' || sortBy === 'total' ? b[sortBy] : b.stats[sortBy]
        return (valueA - valueB || a.id - b.id) * direction
      })
  }, [search, selectedType, onlyFavorites, favorites, sortBy, sortDirection])

  const selectedPokemon = selectedId ? pokemonById.get(selectedId) : null
  const comparePokemon = compareIds.map((id) => pokemonById.get(id))

  // Anterior/próximo andam pela lista filtrada; se o Pokémon não estiver nela (ex.: aberto pelos treinadores), usa a lista toda
  const navigationList = filteredPokemon.some((pokemon) => pokemon.id === selectedId) ? filteredPokemon : pokemonList

  const navigate = useCallback(
    (step) => {
      const index = navigationList.findIndex((pokemon) => pokemon.id === selectedId)
      const next = navigationList[(index + step + navigationList.length) % navigationList.length]
      setSelectedId(next.id)
    },
    [navigationList, selectedId],
  )
  const showPrevious = useCallback(() => navigate(-1), [navigate])
  const showNext = useCallback(() => navigate(1), [navigate])
  const closeDetails = useCallback(() => setSelectedId(null), [])
  const closeCompare = useCallback(() => setIsComparing(false), [])

  function toggleFavorite(id) {
    setFavorites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  function toggleCompare(id) {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id)
      // no máximo 2: se escolher um terceiro, o mais antigo sai
      return [...current, id].slice(-2)
    })
  }

  function showRandom() {
    const source = filteredPokemon.length > 0 ? filteredPokemon : pokemonList
    setSelectedId(source[Math.floor(Math.random() * source.length)].id)
  }

  function resetFilters() {
    setSearch('')
    setSelectedType('all')
    setOnlyFavorites(false)
  }

  return (
    <div className="app">
      <Header
        view={view}
        onViewChange={setView}
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
      />

      {view === 'pokedex' ? (
        <>
          <section className="search-area">
            <div className="search-area__inner">
              <SearchBar value={search} onChange={setSearch} />
              <p className="search-area__tip">Pesquise pelo nome do Pokémon ou pelo número da Pokédex.</p>
            </div>
          </section>

          <main className="content">
            <div className="filters">
              <button type="button" className="random-button" onClick={showRandom}>
                Pokémon aleatório
              </button>
              <TypeFilter types={availableTypes} selected={selectedType} onSelect={setSelectedType} counts={typeCounts} />
              <Toolbar
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSortChange={setSortBy}
                onDirectionChange={setSortDirection}
                onlyFavorites={onlyFavorites}
                favoritesCount={favorites.length}
                onToggleFavorites={() => setOnlyFavorites((current) => !current)}
              />
            </div>

            <p className="results">
              {filteredPokemon.length} Pokémon encontrado(s)
              {(search || selectedType !== 'all' || onlyFavorites) && (
                <button type="button" onClick={resetFilters}>
                  limpar filtros
                </button>
              )}
            </p>

            {filteredPokemon.length > 0 ? (
              <PokemonList
                pokemon={filteredPokemon}
                favorites={favorites}
                compareIds={compareIds}
                onSelect={setSelectedId}
                onToggleFavorite={toggleFavorite}
                onToggleCompare={toggleCompare}
              />
            ) : (
              <EmptyState
                title="Nenhum Pokémon encontrado"
                message={
                  onlyFavorites && favorites.length === 0
                    ? 'Você ainda não tem favoritos.'
                    : 'Tente pesquisar outro nome, número ou tipo.'
                }
                actionLabel="Limpar filtros"
                onAction={resetFilters}
              />
            )}
          </main>
        </>
      ) : (
        <TrainerList trainers={trainers} onSelectPokemon={setSelectedId} />
      )}

      <footer className="footer">
        Atividade 03 - DIAW | Dados: pokedex-data.json | Imagens: <a href="https://pokeapi.co">PokéAPI</a>
      </footer>

      {view === 'pokedex' && (
        <CompareBar pokemon={comparePokemon} onClear={() => setCompareIds([])} onCompare={() => setIsComparing(true)} />
      )}

      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          isFavorite={favorites.includes(selectedPokemon.id)}
          onToggleFavorite={toggleFavorite}
          onPrev={showPrevious}
          onNext={showNext}
          onClose={closeDetails}
        />
      )}

      {isComparing && comparePokemon.length === 2 && (
        <ComparePanel left={comparePokemon[0]} right={comparePokemon[1]} onClose={closeCompare} />
      )}
    </div>
  )
}

export default App
