import '../css/EmptyState.css'

function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{message}</p>
      {onAction && (
        <button type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
