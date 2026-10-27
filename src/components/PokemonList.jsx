import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

function PokemonList({ pokemon, favorites, compareIds, onSelect, onToggleFavorite, onToggleCompare }) {
  return (
    <section className="pokemon-list" aria-label="Lista de Pokémon">
      {pokemon.map((item) => (
        <PokemonCard
          key={item.id}
          pokemon={item}
          isFavorite={favorites.includes(item.id)}
          isComparing={compareIds.includes(item.id)}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
          onToggleCompare={onToggleCompare}
        />
      ))}
    </section>
  )
}

export default PokemonList
