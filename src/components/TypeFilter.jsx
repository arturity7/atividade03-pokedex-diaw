import { getTypeInfo } from '../utils/types'
import '../css/Filters.css'

function TypeFilter({ types, selected, onSelect, counts }) {
  return (
    <label className="filter-field">
      Tipo
      <select value={selected} onChange={(event) => onSelect(event.target.value)}>
        <option value="all">Todos os tipos</option>
        {types.map((type) => (
          <option key={type.id} value={type.name}>
            {getTypeInfo(type.name).label} ({counts[type.name] ?? 0})
          </option>
        ))}
      </select>
    </label>
  )
}

export default TypeFilter
