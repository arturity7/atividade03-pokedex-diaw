// Cor e nome em português de cada tipo presente no pokedex-data.json
export const TYPE_INFO = {
  Typeless: { color: '#a4acaf', label: 'Sem tipo' },
  Normal: { color: '#a4acaf', label: 'Normal' },
  Fire: { color: '#fd7d24', label: 'Fogo' },
  Water: { color: '#4592c4', label: 'Água' },
  Grass: { color: '#9bcc50', label: 'Planta' },
  Electric: { color: '#eed535', label: 'Elétrico' },
  Ice: { color: '#51c4e7', label: 'Gelo' },
  Fighting: { color: '#d56723', label: 'Lutador' },
  Poison: { color: '#b97fc9', label: 'Veneno' },
  Ground: { color: '#ab9842', label: 'Terra' },
  Flying: { color: '#3dc7ef', label: 'Voador' },
  Psychic: { color: '#f366b9', label: 'Psíquico' },
  Bug: { color: '#729f3f', label: 'Inseto' },
  Rock: { color: '#a38c21', label: 'Pedra' },
  Ghost: { color: '#7b62a3', label: 'Fantasma' },
  Dark: { color: '#707070', label: 'Sombrio' },
  Dragon: { color: '#7038f8', label: 'Dragão' },
  Steel: { color: '#9eb7b8', label: 'Aço' },
}

// Tipos com fundo claro precisam de texto escuro para ficar legível
const DARK_TEXT = ['Electric', 'Grass', 'Ice', 'Flying', 'Normal', 'Typeless', 'Steel']

export function getTypeInfo(name) {
  const info = TYPE_INFO[name] ?? TYPE_INFO.Typeless
  return { ...info, textColor: DARK_TEXT.includes(name) ? '#212121' : '#fff' }
}
