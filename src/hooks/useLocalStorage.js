import { useEffect, useState } from 'react'

// Igual ao useState, mas persiste o valor no localStorage do navegador
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Navegação privada ou armazenamento bloqueado: o app continua funcionando sem persistir
    }
  }, [key, value])

  return [value, setValue]
}
