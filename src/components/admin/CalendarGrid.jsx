import React from 'react'

// Calendario mensual del admin. Cada día muestra cuántas reservas activas tiene
// y se pinta más oscuro mientras más reservas haya.
export default function CalendarGrid({
  currentYear,
  currentMonth, // 0 = Enero, 11 = Diciembre
  reservations = [],
  selectedDate,
  onSelectDate,
}) {
  const weekDays = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM']

  // Datos del mes: cuántos días tiene y en qué día de la semana empieza
  const firstDay = new Date(currentYear, currentMonth, 1)
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // getDay() devuelve 0 = domingo, pero nuestro calendario empieza en lunes
  let startDayOffset = firstDay.getDay() - 1
  if (startDayOffset === -1) startDayOffset = 6

  // Armamos la lista de celdas: primero los espacios vacíos y luego los días
  const calendarCells = []

  for (let i = 0; i < startDayOffset; i++) {
    calendarCells.push({ isEmpty: true, key: `empty-${i}` })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const month = String(currentMonth + 1).padStart(2, '0')
    const dayText = String(day).padStart(2, '0')
    const dateString = `${currentYear}-${month}-${dayText}`

    // Reservas de este día (con y sin canceladas)
    const dayReservations = reservations.filter((r) => r.date === dateString)
    const active = dayReservations.filter((r) => r.status !== 'cancelled')

    calendarCells.push({
      isEmpty: false,
      key: dateString,
      dayNumber: day,
      dateString,
      reservations: dayReservations,
      count: active.length,
      confirmedCount: dayReservations.filter((r) => r.status === 'confirmed').length,
      pendingCount: dayReservations.filter((r) => r.status === 'pending').length,
      // Densidad de 0 a 1: con 5 reservas activas el día queda al máximo
      density: Math.min(1, active.length / 5),
    })
  }

  // Color de cada celda según la densidad (burdeos #6F1D1B, más fuerte = más reservas)
  const getDensityStyle = (density, isSelected) => {
    if (isSelected) {
      return {
        backgroundColor: '#101010',
        color: '#F3F3F3',
        borderColor: '#6F1D1B',
      }
    }

    if (density === 0) {
      return {
        backgroundColor: '#FFFFFF',
        color: '#101010',
        borderColor: 'rgba(16, 16, 16, 0.15)',
      }
    }

    const opacity = 0.12 + density * 0.78
    const isDark = opacity > 0.55

    return {
      backgroundColor: `rgba(111, 29, 27, ${opacity.toFixed(2)})`,
      color: isDark ? '#FFFFFF' : '#101010',
      borderColor: isDark ? '#6F1D1B' : 'rgba(111, 29, 27, 0.35)',
    }
  }

  return (
    <div className="bg-white border border-[#101010]/20 p-6 sm:p-7">
      {/* Cabecera de Días de la Semana */}
      <div className="grid grid-cols-7 gap-2 mb-3 text-center border-b border-[#101010]/15 pb-2">
        {weekDays.map((wd) => (
          <div
            key={wd}
            className="text-[11px] font-mono font-bold tracking-wider text-[#101010]/70 py-1"
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Grilla de Celdas de Días */}
      <div className="grid grid-cols-7 gap-2">
        {calendarCells.map((cell) => {
          if (cell.isEmpty) {
            return (
              <div
                key={cell.key}
                className="h-20 sm:h-24 bg-[#F3F3F3]/50 border border-[#101010]/10 opacity-30"
              />
            )
          }

          const isSelected = selectedDate === cell.dateString
          const style = getDensityStyle(cell.density, isSelected)

          return (
            <button
              key={cell.key}
              type="button"
              onClick={() => onSelectDate(cell.dateString, cell.reservations)}
              style={style}
              className={`h-20 sm:h-24 p-2 sm:p-2.5 flex flex-col justify-between text-left transition-all duration-150 cursor-pointer border relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 ${
                isSelected
                  ? 'ring-2 ring-[#6F1D1B] ring-offset-2 z-10 shadow-sm'
                  : 'hover:border-[#101010]/40 hover:brightness-95'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`font-serif-classic text-lg sm:text-xl font-bold leading-none ${
                    isSelected ? 'text-[#F3F3F3]' : ''
                  }`}
                >
                  {cell.dayNumber}
                </span>

                {cell.count > 0 && (
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 border ${
                      isSelected
                        ? 'bg-[#6F1D1B] text-[#F3F3F3] border-[#F3F3F3]/30'
                        : cell.density > 0.5
                        ? 'bg-[#101010]/60 text-white border-white/20'
                        : 'bg-[#101010]/10 text-[#101010] border-[#101010]/20'
                    }`}
                  >
                    {cell.count}
                  </span>
                )}
              </div>

              {/* Indicadores de ocupación por estado */}
              {cell.count > 0 ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    {cell.confirmedCount > 0 && (
                      <span
                        className="w-2 h-2 bg-emerald-600 inline-block"
                        title={`${cell.confirmedCount} confirmadas`}
                      />
                    )}
                    {cell.pendingCount > 0 && (
                      <span
                        className="w-2 h-2 bg-amber-500 inline-block"
                        title={`${cell.pendingCount} pendientes`}
                      />
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-mono block truncate ${
                      isSelected || cell.density > 0.5 ? 'text-white/90' : 'text-[#101010]/80'
                    }`}
                  >
                    {cell.count} {cell.count === 1 ? 'activa' : 'activas'}
                  </span>
                </div>
              ) : (
                <span className="text-[10px] font-mono text-[#101010]/40 block">
                  Sin reservas
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Leyenda de Densidad con Opacidades */}
      <div className="mt-6 pt-4 border-t border-[#101010]/15 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#101010]/80">
        <div className="flex items-center gap-2">
          <span className="uppercase text-[11px] font-bold">Densidad:</span>
          <div className="flex items-center gap-1.5">
            <span
              className="w-3.5 h-3.5 border border-[#101010]/20 inline-block"
              style={{ backgroundColor: 'rgba(111, 29, 27, 0.15)' }}
            />
            <span className="text-[10px]">Baja</span>
            <span
              className="w-3.5 h-3.5 border border-[#101010]/20 inline-block ml-1"
              style={{ backgroundColor: 'rgba(111, 29, 27, 0.50)' }}
            />
            <span className="text-[10px]">Media</span>
            <span
              className="w-3.5 h-3.5 border border-[#101010]/20 inline-block ml-1"
              style={{ backgroundColor: 'rgba(111, 29, 27, 0.90)' }}
            />
            <span className="text-[10px] font-bold">Alta (#6F1D1B)</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-emerald-600 inline-block"></span> Confirmadas
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-amber-500 inline-block"></span> Pendientes
          </span>
        </div>
      </div>
    </div>
  )
}
