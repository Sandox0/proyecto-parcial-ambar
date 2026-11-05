import React, { useEffect } from 'react'
import { Calendar as CalendarIcon, Clock, Sun, Moon, AlertCircle, Check, Lock } from 'lucide-react'
import { RESTAURANT_CONFIG, PROTOTYPE_DATE, addDays } from '../../data/mockReservations'

// paso 1: elegir fecha y turno
export default function DateSelector({
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange,
  getAvailability,
}) {
  const MESES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
  const DIAS = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB']

  // los próximos 10 días
  const upcomingDays = []
  for (let i = 0; i < 10; i++) {
    const isoDate = addDays(PROTOTYPE_DATE, i)
    const [year, month, day] = isoDate.split('-').map(Number)
    const dayOfWeek = new Date(year, month - 1, day).getDay()

    upcomingDays.push({
      isoDate,
      dayName: DIAS[dayOfWeek],
      dayNumber: day,
      monthName: MESES[month - 1],
    })
  }

  // si el turno está lleno, se quita
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const slot = getAvailability(selectedDate, selectedTime)
      if (slot.isFull || !slot.isAvailable) {
        onTimeChange('')
      }
    }
  }, [selectedDate, selectedTime, getAvailability])

  // almuerzo y cena
  const allSlots = RESTAURANT_CONFIG.availableTimeSlots
  const lunchSlots = allSlots.filter((slot) => parseInt(slot.split(':')[0], 10) < 17)
  const dinnerSlots = allSlots.filter((slot) => parseInt(slot.split(':')[0], 10) >= 17)

  // busca el siguiente horario libre
  const getNextAvailableSlot = (currentSlot) => {
    const currentIndex = allSlots.indexOf(currentSlot)
    for (let i = currentIndex + 1; i < allSlots.length; i++) {
      const next = allSlots[i]
      const avail = getAvailability(selectedDate, next)
      if (!avail.isFull && avail.isAvailable) {
        return next
      }
    }
    return null
  }

  const renderSlotButton = (slot) => {
    const availability = getAvailability(selectedDate, slot)

    const isSelected = selectedTime === slot
    const isSoldOut = availability.isFull || !availability.isAvailable
    const nextSlot = isSoldOut ? getNextAvailableSlot(slot) : null

    return (
      <button
        key={slot}
        type="button"
        disabled={isSoldOut}
        onClick={() => !isSoldOut && onTimeChange(slot)}
        aria-pressed={isSelected}
        aria-label={`Turno ${slot} hrs, ${
          isSoldOut
            ? `Agotado (4 de 4 mesas ocupadas). Próximo libre: ${nextSlot || 'consultar otra fecha'}`
            : `${availability.availableTables} mesas disponibles`
        }`}
        className={`group relative p-4 border text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 ${
          isSoldOut
            ? 'bg-[#EAEAEA] text-[#767676] border-[#D0D0D0] cursor-not-allowed select-none opacity-80'
            : isSelected
            ? 'bg-[#6F1D1B] text-[#F3F3F3] border-[#6F1D1B] shadow-md cursor-pointer'
            : 'bg-white hover:bg-[#F3F3F3] text-[#101010] border-[#101010]/20 hover:border-[#6F1D1B] cursor-pointer'
        }`}
      >
        <div className="flex items-center justify-between font-mono">
          <span
            className={`text-lg font-bold tracking-tight ${
              isSoldOut ? 'line-through text-[#767676]' : ''
            }`}
          >
            {slot} hrs
          </span>
          {isSelected && <Check className="w-4 h-4 text-[#F3F3F3]" aria-hidden="true" />}
          {isSoldOut && (
            <span
              className="text-[10px] font-mono uppercase tracking-widest text-[#6F1D1B] flex items-center gap-1"
              title="Aforo completo en este turno"
            >
              <Lock className="w-3 h-3 text-[#6F1D1B]" aria-hidden="true" />
              <span>Lleno</span>
            </span>
          )}
        </div>

        <div className="mt-2 text-xs font-golos">
          {isSoldOut ? (
            <div className="space-y-0.5">
              <span className="text-[#6F1D1B] font-semibold block text-[11px] font-mono">
                Agotado (4/4 mesas)
              </span>
              {nextSlot ? (
                <span className="text-[#101010] text-[10px] font-mono block">
                  Próximo libre: <strong>{nextSlot} hrs</strong>
                </span>
              ) : (
                <span className="text-[#767676] text-[10px] font-mono block">
                  Sin cupos posteriores hoy
                </span>
              )}
            </div>
          ) : isSelected ? (
            <span className="text-[#F3F3F3] font-medium block text-[11px] font-mono">
              Turno Seleccionado
            </span>
          ) : availability.availableTables === 1 ? (
            <span className="text-[#6F1D1B] font-bold block text-[11px] font-mono">
              ¡Última mesa disponible!
            </span>
          ) : (
            <span className="text-[#101010]/70 font-mono text-[11px] block">
              {availability.availableTables} mesas libres
            </span>
          )}
        </div>
      </button>
    )
  }

  return (
    <div className="space-y-12 font-golos text-[#101010]">
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#101010]/15">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#6F1D1B] font-bold block mb-1">
              Paso 1A • Calendario de Servicio
            </span>
            <h2 className="font-serif-classic text-3xl sm:text-4xl uppercase tracking-tight text-[#101010]">
              Selecciona la Fecha
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#101010]/80">
            <label htmlFor="custom-date" className="font-medium">
              Fecha específica:
            </label>
            <input
              id="custom-date"
              type="date"
              value={selectedDate}
              min={upcomingDays[0]?.isoDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="px-3 py-1.5 border border-[#101010]/25 bg-white text-xs text-[#101010] focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {upcomingDays.map((item) => {
            const isSelected = selectedDate === item.isoDate
            return (
              <button
                key={item.isoDate}
                type="button"
                onClick={() => onDateChange(item.isoDate)}
                aria-pressed={isSelected}
                aria-label={`${item.dayName} ${item.dayNumber} de ${item.monthName}`}
                className={`py-4 px-2 border text-center transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 ${
                  isSelected
                    ? 'bg-[#101010] text-[#F3F3F3] border-[#101010] shadow-md ring-1 ring-[#6F1D1B]'
                    : 'bg-white hover:bg-[#F3F3F3] text-[#101010] border-[#101010]/15 hover:border-[#101010]'
                }`}
              >
                <span
                  className={`block text-[10px] font-mono tracking-widest font-semibold ${
                    isSelected ? 'text-[#F3F3F3]/80' : 'text-[#101010]/60'
                  }`}
                >
                  {item.dayName}
                </span>
                <span className="block font-serif-classic text-2xl sm:text-3xl font-normal my-1">
                  {item.dayNumber}
                </span>
                <span
                  className={`block text-[9px] tracking-widest font-mono uppercase ${
                    isSelected ? 'text-[#6F1D1B] font-bold' : 'text-[#101010]/50'
                  }`}
                >
                  {item.monthName}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="space-y-8">
        <div className="pb-4 border-b border-[#101010]/15">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#6F1D1B] font-bold block mb-1">
            Paso 1B • Asignación de Turno
          </span>
          <h2 className="font-serif-classic text-3xl sm:text-4xl uppercase tracking-tight text-[#101010]">
            Horarios Disponibles
          </h2>
          <p className="text-xs sm:text-sm text-[#101010]/70 mt-1 font-golos">
            Aforo estricto de 4 mesas por turno. Los bloques completos muestran el siguiente horario disponible para facilitar tu elección.
          </p>
        </div>

        {/* almuerzo */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#101010] pb-2 border-b border-[#101010]/10">
            <Sun className="w-4 h-4 text-[#6F1D1B]" aria-hidden="true" />
            <span>Turno Almuerzo (13:00 — 15:30 hrs)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {lunchSlots.map(renderSlotButton)}
          </div>
        </div>

        {/* cena */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#101010] pb-2 border-b border-[#101010]/10">
            <Moon className="w-4 h-4 text-[#6F1D1B]" aria-hidden="true" />
            <span>Turno Cena (19:30 — 23:00 hrs)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {dinnerSlots.map(renderSlotButton)}
          </div>
        </div>
      </section>

      {selectedDate && selectedTime ? (
        <div className="p-5 bg-[#101010] text-[#F3F3F3] border border-[#F3F3F3]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 border border-[#6F1D1B] bg-[#6F1D1B]/30 flex items-center justify-center text-[#F3F3F3]">
              <Check className="w-4 h-4 text-[#F3F3F3]" aria-hidden="true" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#919191] block">
                Turno Elegido
              </span>
              <p className="font-serif-classic text-lg text-[#F3F3F3]">
                {selectedDate} • <strong className="text-[#F3F3F3]">{selectedTime} hrs</strong>
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-[#919191] uppercase tracking-wider">
            Mesa disponible verificada en tiempo real
          </span>
        </div>
      ) : (
        <div className="p-4 bg-[#F3F3F3] border border-[#101010]/20 text-[#101010] flex items-center gap-3 text-xs font-mono">
          <AlertCircle className="w-4 h-4 text-[#6F1D1B] shrink-0" aria-hidden="true" />
          <span>
            Selecciona un día y un horario con cupo disponible para avanzar a la ficha de reserva.
          </span>
        </div>
      )}
    </div>
  )
}
