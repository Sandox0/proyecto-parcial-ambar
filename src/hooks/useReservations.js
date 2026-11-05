import { useState, useEffect } from 'react'
import { INITIAL_RESERVATIONS, RESTAURANT_CONFIG } from '../data/mockReservations'

// Clave con la que guardamos las reservas en el localStorage del navegador
const STORAGE_KEY = 'ambar_reservations_data_v3'

// Hook personalizado: aquí vive TODA la lógica de las reservas.
// Lo usan tanto el cliente (reservar) como el admin (dashboard, calendario, lista).
export function useReservations() {
  const [reservations, setReservations] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // useEffect 1: al abrir la página, cargamos las reservas guardadas.
  // Si no hay nada guardado, usamos las reservas de ejemplo.
  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem(STORAGE_KEY)
      setReservations(saved ? JSON.parse(saved) : INITIAL_RESERVATIONS)
      setIsLoading(false)
    }, 600) // pequeña espera para simular que carga desde un servidor

    return () => clearTimeout(timer)
  }, [])

  // useEffect 2: cada vez que cambian las reservas, las guardamos en localStorage.
  // (Esperamos a que termine de cargar para no borrar lo guardado con una lista vacía.)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations))
    }
  }, [reservations, isLoading])

  // Calcula cuántas mesas y cupos quedan en una fecha y hora.
  // Las reservas canceladas no cuentan, porque liberan la mesa.
  const getAvailability = (date, time) => {
    const delTurno = reservations.filter(
      (r) => r.date === date && r.time === time && r.status !== 'cancelled'
    )

    const mesasUsadas = delTurno.length
    const comensales = delTurno.reduce((total, r) => total + Number(r.guests), 0)

    const availableTables = RESTAURANT_CONFIG.maxTablesPerSlot - mesasUsadas
    const remainingSeats = RESTAURANT_CONFIG.maxGuestsPerSlot - comensales

    return {
      totalReservations: mesasUsadas,
      currentGuests: comensales,
      availableTables: Math.max(0, availableTables),
      remainingSeats: Math.max(0, remainingSeats),
      isFull: availableTables <= 0,
      isAvailable: availableTables > 0 && remainingSeats > 0,
    }
  }

  // Crea una reserva nueva, pero primero revisa que no se duplique ni se pase del aforo.
  const addReservation = (data) => {
    const guests = Number(data.guests || 2)
    const slot = getAvailability(data.date, data.time)

    if (slot.isFull) {
      return {
        success: false,
        message: `El turno de las ${data.time} hrs para el ${data.date} se encuentra totalmente agotado (límite de 4 mesas alcanzado).`,
      }
    }

    if (slot.remainingSeats < guests) {
      return {
        success: false,
        message: `Capacidad insuficiente: solo quedan ${slot.remainingSeats} cubiertos disponibles en este bloque.`,
      }
    }

    const newReservation = {
      id: `res-${Date.now().toString().slice(-5)}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      ...data,
      guests,
    }

    // La reserva nueva va primero en la lista
    setReservations([newReservation, ...reservations])

    return {
      success: true,
      reservation: newReservation,
      message: 'Reserva registrada exitosamente en Ámbar.',
    }
  }

  // Cambia el estado de una reserva: confirmed, pending o cancelled.
  const updateReservationStatus = (id, newStatus) => {
    const reserva = reservations.find((r) => r.id === id)
    if (!reserva) {
      return { success: false, message: 'Reserva no encontrada.' }
    }

    // Si estaba cancelada y la reactivamos, hay que revisar que todavía haya mesa
    if (reserva.status === 'cancelled' && newStatus !== 'cancelled') {
      const slot = getAvailability(reserva.date, reserva.time)
      if (slot.availableTables < 1 || slot.remainingSeats < Number(reserva.guests)) {
        return { success: false, message: 'Sin aforo disponible en ese turno' }
      }
    }

    const updated = reservations.map((r) =>
      r.id === id ? { ...r, status: newStatus } : r
    )
    setReservations(updated)

    return { success: true, message: `La reserva #${id} ahora está "${newStatus}".` }
  }

  // Estadísticas para el dashboard (se recalculan solas en cada render)
  const stats = {
    total: reservations.length,
    confirmed: reservations.filter((r) => r.status === 'confirmed').length,
    pending: reservations.filter((r) => r.status === 'pending').length,
    cancelled: reservations.filter((r) => r.status === 'cancelled').length,
  }
  stats.totalGuests = reservations
    .filter((r) => r.status !== 'cancelled')
    .reduce((total, r) => total + Number(r.guests), 0)
  stats.occupancyRate =
    stats.total > 0 ? Math.round((stats.confirmed / stats.total) * 100) : 0

  return {
    reservations,
    isLoading,
    addReservation,
    updateReservationStatus,
    getAvailability,
    stats,
  }
}
