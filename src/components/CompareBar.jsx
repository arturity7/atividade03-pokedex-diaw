import '../css/Compare.css'

// Barra fixa no rodapé com os Pokémon escolhidos para comparação (máximo 2)
function CompareBar({ pokemon, onClear, onCompare }) {
  if (pokemon.length === 0) return null

  return (
    <div className="compare-bar">
      <span>
        Comparar: <strong>{pokemon.map((item) => item.name).join(' x ')}</strong>
        {pokemon.length < 2 && ' (selecione mais um)'}
      </span>
      <div>
        <button type="button" onClick={onClear}>
          Limpar
        </button>
        <button type="button" className="compare-bar__primary" onClick={onCompare} disabled={pokemon.length < 2}>
          Comparar
        </button>
      </div>
    </div>
  )
}

export default CompareBar
