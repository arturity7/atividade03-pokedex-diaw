import '../css/Header.css'

function Header({ view, onViewChange, theme, onToggleTheme }) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <img src="/pokeball.svg" alt="" width="26" height="26" />
          <span>Pokédex</span>
        </div>

        <nav className="header__nav">
          <button
            type="button"
            className={view === 'pokedex' ? 'active' : ''}
            onClick={() => onViewChange('pokedex')}
          >
            Pokédex
          </button>
          <button
            type="button"
            className={view === 'trainers' ? 'active' : ''}
            onClick={() => onViewChange('trainers')}
          >
            Treinadores
          </button>
        </nav>

        <button type="button" className="header__theme" onClick={onToggleTheme}>
          {theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
        </button>
      </div>
    </header>
  )
}

export default Header
