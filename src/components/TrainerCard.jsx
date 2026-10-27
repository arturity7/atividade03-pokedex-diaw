import PokemonImage from './PokemonImage'
import '../css/Trainers.css'

function TrainerCard({ trainer, onSelectPokemon }) {
  return (
    <article className="trainer-card">
      <h2>{trainer.name}</h2>
      <p className="trainer-card__info">
        Insígnias: <strong>{trainer.badges}</strong> | Pokémon: <strong>{trainer.pokemon.length}</strong>
      </p>

      <ul className="trainer-card__team">
        {/* Um treinador pode ter Pokémon repetidos (ex.: Koga), por isso o índice entra na key */}
        {trainer.pokemon.map((pokemon, index) => (
          <li key={`${pokemon.id}-${index}`}>
            <button type="button" onClick={() => onSelectPokemon(pokemon.id)} title={`Ver ${pokemon.name}`}>
              <PokemonImage id={pokemon.id} name={pokemon.name} />
              <span>{pokemon.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default TrainerCard
