import { useMemo, useState } from 'react'
import EmptyState from './EmptyState'
import SearchBar from './SearchBar'
import TrainerCard from './TrainerCard'
import '../css/Trainers.css'

function TrainerList({ trainers, onSelectPokemon }) {
  const [search, setSearch] = useState('')
  const [sortByBadges, setSortByBadges] = useState(false)

  const visibleTrainers = useMemo(() => {
    const term = search.trim().toLowerCase()
    const filtered = trainers.filter(
      (trainer) =>
        trainer.name.toLowerCase().includes(term) ||
        trainer.pokemon.some((pokemon) => pokemon.name.toLowerCase().includes(term)),
    )
    return sortByBadges ? [...filtered].sort((a, b) => b.badges - a.badges) : filtered
  }, [trainers, search, sortByBadges])

  return (
    <>
      <section className="search-area">
        <div className="search-area__inner">
          <SearchBar
            value={search}
            onChange={setSearch}
            label="Treinador ou Pokémon"
            placeholder="Ex.: Ash, Misty, Pikachu..."
          />
        </div>
      </section>

      <main className="content">
        <div className="filters">
          <label className="filter-check">
            <input type="checkbox" checked={sortByBadges} onChange={() => setSortByBadges((current) => !current)} />
            Ordenar por número de insígnias
          </label>
        </div>

        {visibleTrainers.length > 0 ? (
          <div className="trainers">
            {visibleTrainers.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} onSelectPokemon={onSelectPokemon} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nenhum treinador encontrado"
            message={`Nenhum treinador ou Pokémon de treinador corresponde a "${search}".`}
            actionLabel="Limpar pesquisa"
            onAction={() => setSearch('')}
          />
        )}
      </main>
    </>
  )
}

export default TrainerList
