import { useEffect, useState } from 'react'

// Busca informações complementares (altura, peso, habilidades e descrição) na PokéAPI.
// É opcional: se a requisição falhar, os detalhes continuam usando apenas o pokedex-data.json.
export function usePokemonExtra(id) {
  const [state, setState] = useState({ status: 'idle', data: null })

  useEffect(() => {
    if (!id) return

    const controller = new AbortController()
    setState({ status: 'loading', data: null })

    Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { signal: controller.signal }).then(toJson),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`, { signal: controller.signal }).then(toJson),
    ])
      .then(([pokemon, species]) => {
        setState({
          status: 'success',
          data: {
            height: pokemon.height / 10,
            weight: pokemon.weight / 10,
            abilities: pokemon.abilities.map((a) => a.ability.name.replaceAll('-', ' ')),
            genus: species.genera.find((g) => g.language.name === 'en')?.genus,
            description: pickDescription(species.flavor_text_entries),
          },
        })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ status: 'error', data: null })
      })

    // Cancela a requisição se o usuário trocar de Pokémon antes da resposta chegar
    return () => controller.abort()
  }, [id])

  return state
}

function toJson(response) {
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json()
}

function pickDescription(entries) {
  const entry =
    entries.find((e) => e.language.name === 'pt-br') ?? entries.find((e) => e.language.name === 'en')
  return entry?.flavor_text.replace(/[\f\n\r]/g, ' ')
}
