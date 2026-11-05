import React from 'react'
import { PROTOTYPE_DATE } from '../data/mockReservations'
import { Link } from 'react-router-dom'
import {
  CalendarDays,
  Percent,
  Clock,
  Users,
  Calendar,
  ClipboardList,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { useReservationContext } from '../context/ReservationContext'
import StatCard from '../components/admin/StatCard'
import StatusBadge from '../components/common/StatusBadge'

// Panel principal del admin: resumen del día, estadísticas y reservas prioritarias.
export default function AdminDashboard() {
  const { reservations, stats, isLoading, updateReservationStatus } = useReservationContext()

  // Reservas de hoy (sin contar las canceladas, para que el número baje al cancelar)
  const prototypeDayReservations = reservations.filter(
    (r) => r.date === PROTOTYPE_DATE && r.status !== 'cancelled'
  )

  // Promedio de comensales por reserva activa
  const activeReservations = reservations.filter((r) => r.status !== 'cancelled')
  let averageGuests = '0'
  if (activeReservations.length > 0) {
    const totalGuests = activeReservations.reduce((total, r) => total + Number(r.guests), 0)
    averageGuests = (totalGuests / activeReservations.length).toFixed(1).replace('.', ',')
  }

  // Las 5 reservas más urgentes: primero pendientes, luego confirmadas, luego canceladas.
  // Si tienen el mismo estado, se ordenan por fecha y hora.
  const statusPriority = { pending: 1, confirmed: 2, cancelled: 3 }

  const priorityReservations = [...reservations]
    .sort((a, b) => {
      if (statusPriority[a.status] !== statusPriority[b.status]) {
        return statusPriority[a.status] - statusPriority[b.status]
      }
      return (a.date + a.time).localeCompare(b.date + b.time)
    })
    .slice(0, 5)

  return (
    <div className="space-y-10 font-golos text-[#101010]">
      {/* Encabezado Editorial del Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-6 border-b border-[#101010]/20">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#6F1D1B] font-bold block mb-2">
            Módulo Maitre • Control de Sala
          </span>
          <h1 className="font-serif-classic text-3xl sm:text-5xl uppercase tracking-tight text-[#101010]">
            Dashboard Operativo
          </h1>
          <p className="text-xs sm:text-sm text-[#101010]/70 font-golos mt-1">
            Supervisión analítica de aforo, tasa de confirmación y ritmo de servicio en Ámbar.
          </p>
        </div>

        {/* Acceso rápido a herramientas con esquinas refinadas */}
        <div className="flex items-center gap-3">
          <Link
            to="/admin/calendario"
            className="inline-flex items-center gap-2 px-5 py-3 border border-[#101010]/25 bg-white hover:bg-[#F3F3F3] text-[#101010] text-xs font-mono uppercase tracking-wider font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
          >
            <Calendar className="w-4 h-4 text-[#6F1D1B]" aria-hidden="true" />
            <span>Ver Calendario</span>
          </Link>
          <Link
            to="/admin/reservas"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#6F1D1B] hover:bg-[#8B2624] text-[#F3F3F3] text-xs font-mono uppercase tracking-wider font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
          >
            <ClipboardList className="w-4 h-4" aria-hidden="true" />
            <span>Gestor de Reservas</span>
          </Link>
        </div>
      </div>

      {/* Grid de 4 StatCards Analíticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Reservas de hoy"
          value={prototypeDayReservations.length}
          subtitle="Turnos de almuerzo y cena activos"
          icon={CalendarDays}
          trend="Servicio activo"
          isLoading={isLoading}
        />

        <StatCard
          title="Tasa de confirmación"
          value={`${stats.occupancyRate}%`}
          subtitle={`${stats.confirmed} de ${stats.total} reservas confirmadas`}
          icon={Percent}
          trend="Sin datos comparativos en el prototipo"
          isLoading={isLoading}
        />

        <StatCard
          title="Reservas Pendientes"
          value={stats.pending}
          subtitle="Requieren confirmación del Maitre"
          icon={Clock}
          trend={stats.pending > 0 ? 'Atención requerida' : 'Al día'}
          isLoading={isLoading}
        />

        <StatCard
          title="Comensales Programados"
          value={stats.totalGuests}
          subtitle="Cubiertos asignados en salón"
          icon={Users}
          trend={`Promedio ${averageGuests}p / mesa`}
          isLoading={isLoading}
        />
      </div>

      {/* Sección Inferior: Reservas Prioritarias y Reglas de Exclusividad */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Tabla / Lista de Reservas Prioritarias (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#101010]/20 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#101010]/15">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6F1D1B] font-bold block mb-1">
                Atención Inmediata
              </span>
              <h2 className="font-serif-classic text-2xl uppercase tracking-tight text-[#101010]">
                Reservas Prioritarias
              </h2>
            </div>
            <Link
              to="/admin/reservas"
              className="text-xs font-mono uppercase tracking-wider text-[#6F1D1B] hover:text-[#8B2624] flex items-center gap-1.5 transition-colors font-semibold"
            >
              <span>Ver todas ({reservations.length})</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="divide-y divide-[#101010]/10">
            {isLoading ? (
              <p className="py-8 text-center text-xs text-[#101010]/60 font-mono">
                Cargando reservas prioritarias...
              </p>
            ) : priorityReservations.length === 0 ? (
              <p className="py-8 text-center text-xs text-[#101010]/60 font-mono">
                No hay reservas registradas en este momento.
              </p>
            ) : (
              priorityReservations.map((item) => (
                <div
                  key={item.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-[#101010]/20 bg-[#F3F3F3] flex items-center justify-center font-mono font-bold text-xs text-[#101010] shrink-0">
                      #{item.id.replace('res-', '')}
                    </div>
                    <div>
                      <h3 className="font-serif-classic font-bold text-base text-[#101010]">
                        {item.customerName}
                      </h3>
                      <p className="text-xs text-[#101010]/70 font-mono">
                        {item.date} • {item.time} hrs •{' '}
                        <strong className="text-[#6F1D1B]">{item.guests} comensales</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <StatusBadge status={item.status} />

                    {item.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() => updateReservationStatus(item.id, 'confirmed')}
                        className="px-3 py-1.5 border border-emerald-600/40 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-xs font-mono font-semibold uppercase tracking-wider transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      >
                        Aprobar
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Panel Lateral: Bloque Oscuro de Reglas de Capacidad (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#101010] text-[#F3F3F3] p-6 sm:p-8 border border-[#F3F3F3]/15 space-y-6">
            <div className="border-b border-[#F3F3F3]/15 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#919191] block mb-1">
                Protocolo de Sala
              </span>
              <h2 className="font-serif-classic text-2xl uppercase tracking-tight text-[#F3F3F3]">
                Reglas de Exclusividad
              </h2>
            </div>

            <p className="text-xs text-[#919191] font-golos leading-relaxed">
              Ámbar opera con un aforo restringido de <strong>4 mesas simultáneas</strong> por bloque horario para asegurar el maridaje personalizado y la atención sosegada.
            </p>

            <div className="border-t border-[#F3F3F3]/15 pt-4 space-y-3 text-xs font-mono">
              <div className="flex justify-between text-[#919191]">
                <span>Máx. Mesas / Turno:</span>
                <strong className="text-[#F3F3F3]">4 mesas</strong>
              </div>
              <div className="flex justify-between text-[#919191]">
                <span>Máx. Comensales / Turno:</span>
                <strong className="text-[#F3F3F3]">16 comensales</strong>
              </div>
              <div className="flex justify-between text-[#919191]">
                <span>Turnos Diarios:</span>
                <strong className="text-[#F3F3F3]">9 bloques</strong>
              </div>
            </div>
          </div>

          {/* Enlace al Portal de Clientes */}
          <div className="bg-white border border-[#101010]/20 p-5 flex items-center justify-between">
            <div>
              <h3 className="font-serif-classic font-bold text-sm text-[#101010]">
                ¿Simular reserva de cliente?
              </h3>
              <p className="text-[11px] text-[#101010]/70 font-golos">
                Prueba el asistente público de reservas.
              </p>
            </div>
            <Link
              to="/reservar"
              target="_blank"
              className="p-2.5 border border-[#101010]/20 bg-[#F3F3F3] hover:bg-[#6F1D1B] hover:text-[#F3F3F3] text-[#101010] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
              title="Abrir Asistente"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
