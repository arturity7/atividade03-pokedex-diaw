import { useEffect } from 'react'
import Modal from './Modal'
import PokemonImage from './PokemonImage'
import StatBar from './StatBar'
import TypeBadge from './TypeBadge'
import { usePokemonExtra } from '../hooks/usePokemonExtra'
import { STATS, formatId, trainers } from '../utils/pokemon'
import '../css/PokemonDetails.css'

function PokemonDetails({ pokemon, isFavorite, onToggleFavorite, onPrev, onNext, onClose }) {
  const extra = usePokemonExtra(pokemon.id)
  const owners = trainers.filter((trainer) => trainer.pokemonIds.includes(pokemon.id))

  // Setas do teclado navegam entre os Pokémon da lista
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onPrev, onNext])

  return (
    <Modal onClose={onClose} labelledBy="details-title" className="details">
      <div className="details__top">
        <h2 id="details-title">
          {pokemon.name} <span>{formatId(pokemon.id)}</span>
        </h2>
      </div>

      <div className="details__body">
        <div className="details__left">
          <div className="details__image">
            <PokemonImage key={pokemon.id} id={pokemon.id} name={pokemon.name} />
          </div>

          <h3>Tipo</h3>
          <div className="details__types">
            {pokemon.types.map((type) => (
              <TypeBadge key={type.id} name={type.name} />
            ))}
          </div>

          <button type="button" className="details__favorite" onClick={() => onToggleFavorite(pokemon.id)}>
            {isFavorite ? '★ Remover dos favoritos' : '☆ Adicionar aos favoritos'}
          </button>
        </div>

        <div className="details__right">
          <h3>Atributos</h3>
          <div className="details__stats">
            {STATS.map((stat) => (
              <StatBar key={stat.key} label={stat.label} value={pokemon.stats[stat.key]} color="#30a7d7" />
            ))}
          </div>
          <p className="details__total">Total: {pokemon.total}</p>

          <h3>Informações extras (PokéAPI)</h3>
          {extra.status === 'loading' && <p className="details__muted">Carregando...</p>}
          {extra.status === 'error' && (
            <p className="details__muted">Não foi possível carregar as informações da PokéAPI.</p>
          )}
          {extra.status === 'success' && (
            <>
              {extra.data.description && <p>{extra.data.description}</p>}
              <table className="details__info">
                <tbody>
                  <tr>
                    <th>Categoria</th>
                    <td>{extra.data.genus ?? '-'}</td>
                  </tr>
                  <tr>
                    <th>Altura</th>
                    <td>{extra.data.height} m</td>
                  </tr>
                  <tr>
                    <th>Peso</th>
                    <td>{extra.data.weight} kg</td>
                  </tr>
                  <tr>
                    <th>Habilidades</th>
                    <td className="details__abilities">{extra.data.abilities.join(', ')}</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}

          {owners.length > 0 && (
            <>
              <h3>Treinadores</h3>
              <p>{owners.map((trainer) => trainer.name).join(', ')}</p>
            </>
          )}
        </div>
      </div>

      <div className="details__nav">
        <button type="button" onClick={onPrev}>
          ‹ Anterior
        </button>
        <button type="button" onClick={onNext}>
          Próximo ›
        </button>
      </div>
    </Modal>
  )
}

export default PokemonDetails
