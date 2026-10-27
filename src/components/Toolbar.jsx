import { STATS } from '../utils/pokemon'
import '../css/Filters.css'

const SORT_OPTIONS = [
  { key: 'id', label: 'Número' },
  { key: 'name', label: 'Nome' },
  { key: 'total', label: 'Total' },
  ...STATS.map((stat) => ({ key: stat.key, label: stat.label })),
]

function Toolbar({
  sortBy,
  sortDirection,
  onSortChange,
  onDirectionChange,
  onlyFavorites,
  favoritesCount,
  onToggleFavorites,
}) {
  return (
    <>
      <label className="filter-field">
        Ordenar por
        <select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-field">
        Ordem
        <select value={sortDirection} onChange={(event) => onDirectionChange(event.target.value)}>
          <option value="asc">Crescente</option>
          <option value="desc">Decrescente</option>
        </select>
      </label>

      <label className="filter-check">
        <input type="checkbox" checked={onlyFavorites} onChange={onToggleFavorites} />
        Só favoritos ({favoritesCount})
      </label>
    </>
  )
}

export default Toolbar
