import { createContext, useContext } from 'react'
import { useReservations } from '../hooks/useReservations'

// para compartir las reservas entre cliente y admin
const ReservationContext = createContext(null)

export function ReservationProvider({ children }) {
  const reservationState = useReservations()

  return (
    <ReservationContext.Provider value={reservationState}>
      {children}
    </ReservationContext.Provider>
  )
}

export function useReservationContext() {
  return useContext(ReservationContext)
}
