import { useId } from 'react'
import '../css/SearchBar.css'

function SearchBar({ value, onChange, label = 'Nome ou número', placeholder = 'Pesquisar Pokémon...' }) {
  const id = useId()

  return (
    <div className="search-bar">
      <label htmlFor={id}>{label}</label>
      <div className="search-bar__row">
        <input
          id={id}
          type="text"
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(event) => onChange(event.target.value)}
        />
        {value && (
          <button type="button" onClick={() => onChange('')}>
            Limpar
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
