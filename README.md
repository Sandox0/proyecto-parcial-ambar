# Ámbar — Cocina Experimental

Aplicación web de reservas de mesas para un restaurante, hecha con React.

- **Curso:** Desarrollo de Interfaces 2 — IDAT (ciclo 3)
- **Integrantes:** [PENDIENTE: nombre 1], [PENDIENTE: nombre 2], [PENDIENTE: nombre 3]
- **Prototipo en Figma:** https://www.figma.com/design/Y7S8eOYfa9fWAogjwI4bPl/ambar-restaurante?node-id=0-1&t=7CYheRrrM5UNukrt-1
- **Repositorio:** https://github.com/Sandox0/proyecto-parcial-ambar
- **Versión desplegada:** https://ambar-peru.netlify.app

---

## 1. ¿Qué hace la aplicación?

Resuelve el problema de las reservas por teléfono, que causan duplicados y desorden en horarios de alta demanda.

**Para el cliente:**
- Elige fecha y turno en un asistente de 3 pasos: fecha y turno, ficha técnica, y pago de garantía (simulado).
- Recibe un voucher con el código de su reserva.
- Los turnos llenos aparecen como "Agotado" y se le sugiere el siguiente turno libre.

**Para el administrador:**
- Dashboard con estadísticas del día.
- Calendario mensual que muestra qué días están más ocupados.
- Lista de reservas con buscador y filtros, donde puede confirmar o cancelar.

**Regla principal:** cada turno admite máximo **4 mesas y 16 comensales**. Si el turno está lleno, no se puede reservar, así no hay duplicados. Una reserva cancelada libera su mesa.

---

## 2. Tecnologías

- React 18 (JSX) con los hooks `useState`, `useEffect` y `useContext`
- Vite
- Tailwind CSS
- React Router v6
- lucide-react (íconos)

Las reservas se guardan en el `localStorage` del navegador. No hay backend todavía.

---

## 3. Cómo instalar, ejecutar y probar

Necesitas tener instalado [Node.js](https://nodejs.org) (versión 18 o superior).

```bash
# 1. Descargar el proyecto
git clone https://github.com/Sandox0/proyecto-parcial-ambar.git
cd proyecto-parcial-ambar

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev
```

Luego abre en el navegador: http://localhost:5173

Otros comandos:

```bash
npm run build     # genera la versión final en la carpeta dist
npm run preview   # prueba localmente esa versión final
```

### Cómo probar la aplicación

**Como cliente:**
1. Entra a `/reservar`.
2. Elige una fecha y un turno, y pulsa "Continuar".
3. Llena la ficha técnica y pulsa continuar.
4. En el pago usa cualquier dato de prueba (tarjeta de 16 dígitos, o Yape con un código de 6 dígitos). El pago es simulado.
5. Verás el voucher con el código de tu reserva.

**Probar que no se duplican reservas:**
- Hoy a las **19:30** ya hay 4 de 4 mesas ocupadas. Ese turno aparece como "Agotado" y no se puede elegir.

**Como administrador:**
1. Entra a `/admin/login` con usuario `admin` y contraseña `admin123`.
2. En `/admin/calendario` elige un día para ver sus reservas.
3. En `/admin/reservas` cancela una reserva y comprueba que se libera la mesa.

**Volver a los datos de ejemplo:** abre las herramientas de desarrollador del navegador (F12), ve a Application, luego Local Storage, borra la clave `ambar_reservations_data_v3` y recarga la página.

---

## 4. Páginas de la aplicación

| Ruta | Qué muestra |
|------|-------------|
| `/` | Página de inicio |
| `/reservar` | Asistente de reserva en 3 pasos |
| `/reserva-exitosa` | Voucher de la reserva |
| `/admin/login` | Login del administrador (simulado) |
| `/admin/dashboard` | Resumen y estadísticas |
| `/admin/calendario` | Calendario de ocupación |
| `/admin/reservas` | Lista de reservas |

---

## 5. Estructura del proyecto

```text
src/
 ├── App.jsx                   # Rutas de la aplicación
 ├── main.jsx                  # Punto de entrada
 ├── context/
 │    └── ReservationContext.jsx   # Comparte las reservas entre todas las páginas
 ├── hooks/
 │    └── useReservations.js       # Lógica de reservas (useState, useEffect, aforo)
 ├── data/
 │    └── mockReservations.js      # Reservas de ejemplo y límites del restaurante
 ├── components/
 │    ├── common/                  # ClientLayout, AdminLayout, StatusBadge
 │    ├── client/                  # DateSelector, ReservationForm, PaymentStep
 │    └── admin/                   # CalendarGrid, DataTable, StatCard
 └── pages/                        # Una página por cada ruta
```

---

## 6. Pruebas de usabilidad

**Participantes:** [PENDIENTE]

| # | Tarea | ¿Completó? | Dónde dudó |
|---|-------|-----------|------------|
| 1 | Reservar una mesa y pagar la garantía | [PENDIENTE] | [PENDIENTE] |
| 2 | Intentar reservar el turno agotado y entender por qué no se puede | [PENDIENTE] | [PENDIENTE] |
| 3 | Confirmar una reserva pendiente desde el panel admin | [PENDIENTE] | [PENDIENTE] |
| 4 | Cancelar una reserva y ver que libera la mesa | [PENDIENTE] | [PENDIENTE] |

**Problemas detectados y soluciones:**

| Problema | Solución implementada |
|----------|-----------------------|
| [PENDIENTE] | [PENDIENTE] |

**Conclusión:** [PENDIENTE]