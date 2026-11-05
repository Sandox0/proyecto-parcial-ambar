# Ámbar — Cocina Experimental

Aplicación web de reservas de mesas para un restaurante, hecha con React.

- **Curso:** Desarrollo de Interfaces 2 — IDAT (ciclo 3)
- **Integrantes:** Felip Moisés Gamboa Vivenes, Ronny Humberto Herrera Sanchez, Andrea Paola Carhuas Cabrera
- **Prototipo interactivo en Figma:** https://www.figma.com/proto/Y7S8eOYfa9fWAogjwI4bPl/ambar-restaurante?node-id=126-20&t=E6X4bBEtBcEy3d6D-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=140%3A1203
- **Wireframes y diseño en Figma:** https://www.figma.com/design/Y7S8eOYfa9fWAogjwI4bPl/ambar-restaurante?node-id=126-3473
- **Repositorio:** https://github.com/Sandox0/proyecto-parcial-ambar
- **Versión desplegada:** https://ambar-pe.netlify.app

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

**Participantes:** Felip Gamboa, como usuario simulado, sin ayuda y sin guía.

| # | Tarea | ¿Completó? | Observación |
|---|-------|-----------|-------------|
| 1 | Reservar una mesa y pagar la garantía | Sí | Llegó al voucher sin errores. |
| 2 | Intentar reservar el turno agotado y entender por qué no se puede | Sí | Vio «Agotado (4/4 mesas)» y «Próximo libre: 20:00 hrs». |
| 3 | Confirmar una reserva pendiente desde el panel admin | Sí | Aprobó una reserva y pasó a «Confirmada». |
| 4 | Cancelar una reserva y ver que libera la mesa | Sí | El turno de las 19:30 pasó de «Agotado» a «¡Última mesa disponible!». |

**Problemas detectados y soluciones:**

| Problema | Solución implementada |
|----------|-----------------------|
| Se podía llegar al pago sin cupo suficiente en el turno | Ahora se revisa el cupo antes de pasar al pago |
| El campo de teléfono aceptaba letras | Ahora exige al menos 7 números |
| Al imprimir el voucher salían la cabecera y el pie de la página | Se ocultan al imprimir |

**Pendientes como mejora:** pedir confirmación antes de cancelar una reserva y ajustar el ancho de la tabla del admin en pantallas de 1366 px.

**Conclusión:** la aplicación se pudo usar de principio a fin sin errores, y las pruebas sirvieron para corregir tres problemas reales.