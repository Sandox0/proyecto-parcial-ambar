// Datos de ejemplo del restaurante "Ámbar".
// Las fechas se calculan a partir de HOY para que el calendario nunca muestre días pasados.
export const toISODate = (d) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export const addDays = (isoDate, days) => {
  const [y, m, d] = isoDate.split('-').map(Number)
  return toISODate(new Date(y, m - 1, d + days))
}

export const PROTOTYPE_DATE = toISODate(new Date())

export const INITIAL_RESERVATIONS = [
  {
    id: 'res-101',
    customerName: 'Valeria Mendoza',
    email: 'valeria.mendoza@email.com',
    phone: '+51 987 654 321',
    date: PROTOTYPE_DATE,
    time: '19:30',
    guests: 2,
    status: 'confirmed',
    experience: 'Menú Degustación Raíces (7 Tiempos)',
    tableLocation: 'Salón Principal (Luz Cenital)',
    notes: 'Celebración de aniversario. Sin restricciones alimentarias.',
    createdAt: '2026-10-25T14:30:00Z',
  },
  {
    id: 'res-107',
    customerName: 'Mateo & Sofía Silva',
    email: 'silva.fam@bosque.pe',
    phone: '+51 933 445 566',
    date: PROTOTYPE_DATE,
    time: '19:30',
    guests: 4,
    status: 'confirmed',
    experience: 'Maridaje Experimental Botánico',
    tableLocation: 'Terraza Botánica Privada',
    notes: 'Mesa exterior climatizada.',
    createdAt: '2026-10-26T10:15:00Z',
  },
  {
    id: 'res-108',
    customerName: 'Dra. Gabriela Ponce',
    email: 'gponce@medicina.pe',
    phone: '+51 955 778 899',
    date: PROTOTYPE_DATE,
    time: '19:30',
    guests: 2,
    status: 'confirmed',
    experience: 'Almuerzo de Temporada Marina',
    tableLocation: 'Barra Frente a Cocina Abierta',
    notes: 'Interés por la técnica de maduración de pescados.',
    createdAt: '2026-10-27T16:00:00Z',
  },
  {
    id: 'res-109',
    customerName: 'Ignacio Barrenechea',
    email: 'ibarrenechea@consulting.com',
    phone: '+51 944 667 788',
    date: PROTOTYPE_DATE,
    time: '19:30',
    guests: 4,
    status: 'confirmed',
    experience: 'Menú Degustación Raíces (7 Tiempos)',
    tableLocation: 'Salón Principal (Luz Cenital)',
    notes: 'Cena de negocios privada.',
    createdAt: '2026-10-28T11:45:00Z',
  },
  {
    id: 'res-102',
    customerName: 'Carlos Benavides',
    email: 'carlos.benavides@empresa.pe',
    phone: '+51 912 345 678',
    date: PROTOTYPE_DATE,
    time: '21:00',
    guests: 4,
    status: 'pending',
    experience: 'Maridaje Experimental Botánico',
    tableLocation: 'Salón Principal (Luz Cenital)',
    notes: 'Mesa con buena iluminación solicitada. 1 comensal celíaco.',
    createdAt: '2026-10-28T09:15:00Z',
  },
  {
    id: 'res-103',
    customerName: 'Mariana Alarcón',
    email: 'mariana.alarcon@studio.com',
    phone: '+51 945 112 233',
    date: addDays(PROTOTYPE_DATE, 1),
    time: '13:30',
    guests: 6,
    status: 'confirmed',
    experience: 'Almuerzo de Temporada Marina',
    tableLocation: 'Salón Principal (Luz Cenital)',
    notes: 'Almuerzo corporativo de diseño.',
    createdAt: '2026-10-27T18:40:00Z',
  },
  {
    id: 'res-104',
    customerName: 'Rodrigo De la Flor',
    email: 'r.delaflor@gastronomia.pe',
    phone: '+51 922 887 766',
    date: addDays(PROTOTYPE_DATE, 1),
    time: '20:30',
    guests: 2,
    status: 'pending',
    experience: 'Menú Degustación Raíces (7 Tiempos)',
    tableLocation: 'Barra Frente a Cocina Abierta',
    notes: 'Prefieren barra frente a cocina abierta si está disponible.',
    createdAt: '2026-10-29T11:05:00Z',
  },
  {
    id: 'res-105',
    customerName: 'Camila Villalobos',
    email: 'camila.v@artgallery.org',
    phone: '+51 977 443 322',
    date: addDays(PROTOTYPE_DATE, 2),
    time: '14:00',
    guests: 3,
    status: 'confirmed',
    experience: 'Almuerzo de Temporada Marina',
    tableLocation: 'Salón Principal (Luz Cenital)',
    notes: 'Alergia estricta a mariscos bivalvos.',
    createdAt: '2026-10-29T16:20:00Z',
  },
  {
    id: 'res-106',
    customerName: 'Diego Salazar',
    email: 'diego.salazar@tech.pe',
    phone: '+51 999 001 122',
    date: addDays(PROTOTYPE_DATE, 2),
    time: '19:30',
    guests: 4,
    status: 'pending',
    experience: 'Menú Degustación Raíces (7 Tiempos)',
    tableLocation: 'Terraza Botánica Privada',
    notes: 'Reunión familiar íntima.',
    createdAt: '2026-10-29T18:50:00Z',
  },
]

// Constantes de configuración de capacidad del restaurante
export const RESTAURANT_CONFIG = {
  maxTablesPerSlot: 4,     // Límite estricto: 4 mesas simultáneas por turno
  maxGuestsPerSlot: 16,    // Máximo 16 comensales por turno
  availableTimeSlots: [
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
  ],
}
