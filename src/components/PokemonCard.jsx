import PokemonImage from './PokemonImage'
import TypeBadge from './TypeBadge'
import { STATS, formatId } from '../utils/pokemon'
import '../css/PokemonCard.css'

function PokemonCard({ pokemon, isFavorite, isComparing, onSelect, onToggleFavorite, onToggleCompare }) {
  return (
    <article className={`pokemon-card ${isComparing ? 'is-comparing' : ''}`}>
      <button type="button" className="pokemon-card__main" onClick={() => onSelect(pokemon.id)}>
        <div className="pokemon-card__image">
          <PokemonImage id={pokemon.id} name={pokemon.name} />
        </div>
        <span className="pokemon-card__number">{formatId(pokemon.id)}</span>
        <h2 className="pokemon-card__name">{pokemon.name}</h2>
        <div className="pokemon-card__types">
          {pokemon.types.map((type) => (
            <TypeBadge key={type.id} name={type.name} />
          ))}
        </div>
        <dl className="pokemon-card__stats">
          {STATS.map((stat) => (
            <div key={stat.key}>
              <dt>{stat.short}</dt>
              <dd>{pokemon.stats[stat.key]}</dd>
            </div>
          ))}
        </dl>
      </button>

      <div className="pokemon-card__actions">
        <button
          type="button"
          className={isFavorite ? 'is-favorite' : ''}
          onClick={() => onToggleFavorite(pokemon.id)}
          aria-pressed={isFavorite}
        >
          {isFavorite ? '★ Favorito' : '☆ Favoritar'}
        </button>
        <label>
          <input type="checkbox" checked={isComparing} onChange={() => onToggleCompare(pokemon.id)} />
          Comparar
        </label>
      </div>
    </article>
  )
}

export default PokemonCard
