import data from '../data/pokedex-data.json'

// Atributos exibidos nas barras, na ordenação e na comparação
export const STATS = [
  { key: 'hp', label: 'HP', short: 'HP' },
  { key: 'attack', label: 'Ataque', short: 'Atq' },
  { key: 'defense', label: 'Defesa', short: 'Def' },
  { key: 'specialAttack', label: 'Ataque Especial', short: 'Atq. Esp' },
  { key: 'specialDefense', label: 'Defesa Especial', short: 'Def. Esp' },
  { key: 'speed', label: 'Velocidade', short: 'Vel' },
]

// Maior valor possível de um atributo base (usado para calcular a largura das barras)
export const MAX_STAT = 255

const TYPELESS = data.types.find((type) => type.name === 'Typeless')

// Pokémon sem tipo no JSON (ex.: Mew) recebem o tipo "Typeless" para manter a interface consistente
export const pokemonList = data.pokemon.map((pokemon) => ({
  ...pokemon,
  types: pokemon.types.length > 0 ? pokemon.types : [TYPELESS],
  total: Object.values(pokemon.stats).reduce((sum, value) => sum + value, 0),
}))

export const pokemonById = new Map(pokemonList.map((pokemon) => [pokemon.id, pokemon]))

// Apenas os tipos que realmente aparecem em algum Pokémon, na ordem do arquivo de dados
export const availableTypes = data.types.filter((type) =>
  pokemonList.some((pokemon) => pokemon.types.some((t) => t.id === type.id)),
)

export const trainers = data.trainers.map((trainer) => ({
  ...trainer,
  pokemon: trainer.pokemonIds.map((id) => pokemonById.get(id)).filter(Boolean),
}))

export function formatId(id) {
  return `Nº ${String(id).padStart(4, '0')}`
}

// Artwork oficial hospedado no repositório público da PokéAPI
export function getArtworkUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function getSpriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}
