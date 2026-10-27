import { useState } from 'react'
import { getArtworkUrl, getSpriteUrl } from '../utils/pokemon'

// Tenta o artwork oficial, depois o sprite simples e, se nada carregar (ex.: offline), mostra uma Pokébola
function PokemonImage({ id, name, className = '' }) {
  const sources = [getArtworkUrl(id), getSpriteUrl(id), '/pokeball.svg']
  const [attempt, setAttempt] = useState(0)

  return (
    <img
      className={`pokemon-image ${className}`}
      src={sources[attempt]}
      alt={name}
      loading="lazy"
      onError={() => setAttempt((current) => Math.min(current + 1, sources.length - 1))}
    />
  )
}

export default PokemonImage
