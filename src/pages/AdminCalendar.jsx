import React, { useState } from 'react'
import { PROTOTYPE_DATE } from '../data/mockReservations'
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Sparkles,
  CalendarCheck,
  MapPin,
  UtensilsCrossed,
} from 'lucide-react'
import { useReservationContext } from '../context/ReservationContext'
import CalendarGrid from '../components/admin/CalendarGrid'
import StatusBadge from '../components/common/StatusBadge'

// Calendario del admin: al elegir un día se ven sus reservas y se pueden reactivar las canceladas.
export default function AdminCalendar() {
  const { reservations, updateReservationStatus, isLoading } = useReservationContext()

  // Mes y año que se están viendo (empieza en el mes actual)
  const [currentYear, setCurrentYear] = useState(Number(PROTOTYPE_DATE.slice(0, 4)))
  const [currentMonth, setCurrentMonth] = useState(Number(PROTOTYPE_DATE.slice(5, 7)) - 1) // mes actual (0-indexed)

  // Día seleccionado (por defecto, hoy)
  const [selectedDate, setSelectedDate] = useState(PROTOTYPE_DATE)

  // Mensajes de error al reactivar una reserva (uno por reserva)
  const [reactivationErrors, setReactivationErrors] = useState({})

  // Reservas del día seleccionado
  const selectedDayReservations = reservations.filter((r) => r.date === selectedDate)
  // Las canceladas se muestran aparte porque no ocupan mesa
  const activeDayReservations = selectedDayReservations.filter((r) => r.status !== 'cancelled')
  const cancelledDayReservations = selectedDayReservations.filter((r) => r.status === 'cancelled')

  const handleReactivate = (id) => {
    setReactivationErrors((prev) => {
      const copy = { ...prev }
      delete copy[id]
      return copy
    })

    const result = updateReservationStatus(id, 'confirmed')
    if (!result.success) {
      setReactivationErrors((prev) => ({
        ...prev,
        [id]: result.message || 'Sin aforo disponible en ese turno',
      }))
    }
  }

  // Navegación de mes
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((prev) => prev - 1)
    } else {
      setCurrentMonth((prev) => prev - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((prev) => prev + 1)
    } else {
      setCurrentMonth((prev) => prev + 1)
    }
  }

  const handleSelectDate = (dateStr) => {
    setSelectedDate(dateStr)
  }

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ]

  return (
    <div className="space-y-8">
      {/* Encabezado del Calendario */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#101010]/15">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-[#101010]/20 bg-white text-[#6F1D1B] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Mapa de Calor & Densidad
          </div>
          <h1 className="font-serif-classic text-3xl sm:text-5xl font-normal uppercase tracking-tight text-[#101010]">
            Calendario de Reservas
          </h1>
          <p className="text-xs text-[#101010]/70 font-golos mt-1">
            Visualización de densidad de ocupación por jornada (color acento burdeos <strong className="text-[#6F1D1B] font-mono font-bold">#6F1D1B</strong>).
          </p>
        </div>

        {/* Controles de Navegación de Mes */}
        <div className="flex items-center border border-[#101010]/20 bg-white">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-2.5 hover:bg-[#F3F3F3] text-[#101010] transition-colors cursor-pointer border-r border-[#101010]/15 focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
            title="Mes Anterior"
            aria-label="Mes anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-serif-classic text-base font-bold text-[#101010] px-5 min-w-[170px] text-center tracking-wide uppercase">
            {monthNames[currentMonth]} {currentYear}
          </span>

          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2.5 hover:bg-[#F3F3F3] text-[#101010] transition-colors cursor-pointer border-l border-[#101010]/15 focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
            title="Mes Siguiente"
            aria-label="Mes siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Disposición Principal: Grilla de Calendario a la izquierda, Detalle del Día a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Grilla del Mes */}
        <div className="lg:col-span-2 space-y-4">
          <CalendarGrid
            currentYear={currentYear}
            currentMonth={currentMonth}
            reservations={reservations}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
          />
        </div>

        {/* Columna Derecha: Detalle de Reservas del Día Seleccionado */}
        <div className="bg-white border border-[#101010]/20 p-6 sm:p-7 flex flex-col h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-[#101010]/15 mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#101010]/60 block font-semibold">
                Detalle del Día
              </span>
              <h2 className="font-serif-classic text-2xl font-normal text-[#101010]">
                {selectedDate || 'Selecciona un día'}
              </h2>
            </div>
            <span className="px-3 py-1 text-xs font-mono font-bold bg-[#101010] text-[#F3F3F3] border border-[#101010]">
              {activeDayReservations.length} {activeDayReservations.length === 1 ? 'mesa activa' : 'mesas activas'}
            </span>
          </div>

          {/* Lista de Reservas del Día */}
          <div className="space-y-4 overflow-y-auto max-h-[600px] pr-1">
            {selectedDayReservations.length === 0 ? (
              <div className="text-center py-12 text-[#101010]/40 space-y-2 border border-dashed border-[#101010]/15 p-6">
                <CalendarCheck className="w-8 h-8 mx-auto opacity-40 text-[#101010]" />
                <p className="text-xs font-golos text-[#101010]/70">No hay reservas programadas para este día.</p>
                <p className="text-[11px] font-mono text-[#101010]/50">
                  Haz clic en cualquier día de la cuadrícula para ver su actividad.
                </p>
              </div>
            ) : (
              <>
                {/* Reservas Activas (Ocupan mesa) */}
                {activeDayReservations.length === 0 && cancelledDayReservations.length > 0 && (
                  <p className="text-xs font-mono text-[#101010]/60 py-2 border-b border-[#101010]/10">
                    No hay mesas activas ocupadas para este día.
                  </p>
                )}

                {activeDayReservations.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#F3F3F3] p-4 border border-[#101010]/15 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#6F1D1B]">
                        #{item.id}
                      </span>
                      <StatusBadge status={item.status} />
                    </div>

                    <div>
                      <h3 className="font-serif-classic text-lg font-bold text-[#101010]">
                        {item.customerName}
                      </h3>
                      <p className="text-[11px] text-[#101010]/60 font-golos">
                        {item.email} • {item.phone}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-white p-2.5 border border-[#101010]/15">
                      <div className="flex items-center gap-1.5 text-[#101010]">
                        <Clock className="w-3.5 h-3.5 text-[#6F1D1B]" />
                        <span>{item.time} hrs</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#101010]">
                        <Users className="w-3.5 h-3.5 text-[#6F1D1B]" />
                        <span>{item.guests} comensales</span>
                      </div>
                    </div>

                    <div className="text-xs text-[#101010]/80 font-golos space-y-1">
                      <p className="flex items-center gap-1.5">
                        <UtensilsCrossed className="w-3.5 h-3.5 text-[#6F1D1B] shrink-0" />
                        <span className="truncate">{item.experience || 'Menú Degustación'}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#6F1D1B] shrink-0" />
                        <span>{item.tableLocation || 'Salón Principal'}</span>
                      </p>
                      {item.notes && (
                        <p className="italic text-[11px] text-[#101010] bg-white p-2.5 border-l-2 border-[#6F1D1B] mt-1 font-golos">
                          "{item.notes}"
                        </p>
                      )}
                    </div>

                    {/* Acciones de estado del día */}
                    <div className="pt-2 border-t border-[#101010]/15 flex items-center justify-end gap-2">
                      {item.status !== 'confirmed' && (
                        <button
                          type="button"
                          onClick={() => updateReservationStatus(item.id, 'confirmed')}
                          className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer border border-emerald-900 focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
                        >
                          Confirmar
                        </button>
                      )}
                      {item.status !== 'cancelled' && (
                        <button
                          type="button"
                          onClick={() => updateReservationStatus(item.id, 'cancelled')}
                          className="px-3 py-1 bg-rose-700 hover:bg-rose-800 text-white text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer border border-rose-900 focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Reservas Canceladas: se muestran aparte con su StatusBadge y el texto 'Cancelada (no ocupa mesa)' */}
                {cancelledDayReservations.length > 0 && (
                  <div className="pt-4 border-t border-[#101010]/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-rose-900 font-bold">
                        Canceladas ({cancelledDayReservations.length})
                      </span>
                      <span className="text-[11px] font-mono text-rose-800 font-medium italic">
                        No ocupa mesa
                      </span>
                    </div>

                    {cancelledDayReservations.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-4 border border-dashed border-[#101010]/25 space-y-3 opacity-85"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#101010]/50">
                            #{item.id}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-rose-800 font-medium">
                              Cancelada (no ocupa mesa)
                            </span>
                            <StatusBadge status={item.status} />
                          </div>
                        </div>

                        <div>
                          <h3 className="font-serif-classic text-base font-bold text-[#101010]/60 line-through">
                            {item.customerName}
                          </h3>
                          <p className="text-[11px] text-[#101010]/50 font-golos">
                            {item.email} • {item.phone}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono text-[#101010]/60">
                          <span>{item.time} hrs</span>
                          <span>•</span>
                          <span>{item.guests} comensales liberados</span>
                        </div>

                        {/* Reactivación de reserva */}
                        <div className="pt-2 border-t border-[#101010]/15 flex flex-wrap items-center justify-end gap-2">
                          {reactivationErrors[item.id] && (
                            <span
                              role="alert"
                              className="text-[11px] font-mono text-[#6F1D1B] font-bold bg-[#6F1D1B]/10 px-2 py-1 border border-[#6F1D1B]/30"
                            >
                              {reactivationErrors[item.id]}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleReactivate(item.id)}
                            className="px-3 py-1 bg-[#101010] hover:bg-[#6F1D1B] text-[#F3F3F3] text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer border border-[#101010] focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
                          >
                            Reactivar reserva
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
