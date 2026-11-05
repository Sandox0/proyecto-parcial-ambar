import React from 'react'

// Tarjeta pequeña del dashboard que muestra un número (ej. reservas de hoy).
export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  colorVariant = 'accent',
  isLoading = false,
}) {
  return (
    <div className="bg-white border border-[#101010]/20 p-6 flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase font-mono tracking-wider text-[#101010]/70 font-semibold">
          {title}
        </span>
        {Icon && (
          <div className="w-8 h-8 border border-[#101010]/15 bg-[#F3F3F3] flex items-center justify-center text-[#6F1D1B]">
            <Icon className="w-4 h-4" aria-hidden="true" />
          </div>
        )}
      </div>

      <div>
        <div className="font-serif-classic text-4xl sm:text-5xl font-normal text-[#101010] tracking-tight">
          {isLoading ? (
            <div className="h-10 w-24 bg-[#EAEAEA] animate-pulse"></div>
          ) : (
            value
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-[#101010]/10 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-[#101010]/70 font-golos text-xs">{subtitle}</span>
          {trend && (
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[#101010]/20 bg-[#F3F3F3] text-[#101010]">
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
