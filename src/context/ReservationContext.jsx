import { createContext, useContext } from 'react'
import { useReservations } from '../hooks/useReservations'

// El contexto sirve para que cliente y admin compartan las mismas reservas
// sin tener que pasarlas de componente en componente (props).
const ReservationContext = createContext(null)

export function ReservationProvider({ children }) {
  const reservationState = useReservations()

  return (
    <ReservationContext.Provider value={reservationState}>
      {children}
    </ReservationContext.Provider>
  )
}

// Atajo para usar el contexto en cualquier componente
export function useReservationContext() {
  return useContext(ReservationContext)
}
