import { getTypeInfo } from '../utils/types'
import '../css/TypeBadge.css'

function TypeBadge({ name }) {
  const info = getTypeInfo(name)

  return (
    <span className="type-badge" style={{ background: info.color, color: info.textColor }}>
      {info.label}
    </span>
  )
}

export default TypeBadge
