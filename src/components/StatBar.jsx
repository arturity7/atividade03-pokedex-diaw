import { MAX_STAT } from '../utils/pokemon'
import '../css/StatBar.css'

function StatBar({ label, value, color }) {
  const percent = Math.min((value / MAX_STAT) * 100, 100)

  return (
    <div className="stat-bar">
      <span className="stat-bar__label">{label}</span>
      <span className="stat-bar__value">{value}</span>
      <div className="stat-bar__track" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={MAX_STAT}>
        <div className="stat-bar__fill" style={{ width: `${percent}%`, background: color }} />
      </div>
    </div>
  )
}

export default StatBar
