import Modal from './Modal'
import PokemonImage from './PokemonImage'
import TypeBadge from './TypeBadge'
import { STATS, formatId } from '../utils/pokemon'
import '../css/Compare.css'

function ComparePanel({ left, right, onClose }) {
  const rows = [...STATS, { key: 'total', label: 'Total' }]
  const valueOf = (pokemon, key) => (key === 'total' ? pokemon.total : pokemon.stats[key])

  return (
    <Modal onClose={onClose} labelledBy="compare-title" className="compare">
      <h2 id="compare-title">Comparação</h2>

      <div className="compare__pokemon">
        {[left, right].map((pokemon) => (
          <div key={pokemon.id}>
            <div className="compare__image">
              <PokemonImage id={pokemon.id} name={pokemon.name} />
            </div>
            <small>{formatId(pokemon.id)}</small>
            <strong>{pokemon.name}</strong>
            <div className="compare__types">
              {pokemon.types.map((type) => (
                <TypeBadge key={type.id} name={type.name} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <table className="compare__table">
        <thead>
          <tr>
            <th>Atributo</th>
            <th>{left.name}</th>
            <th>{right.name}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const a = valueOf(left, row.key)
            const b = valueOf(right, row.key)
            return (
              <tr key={row.key}>
                <td>{row.label}</td>
                <td className={a > b ? 'winner' : ''}>{a}</td>
                <td className={b > a ? 'winner' : ''}>{b}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Modal>
  )
}

export default ComparePanel
