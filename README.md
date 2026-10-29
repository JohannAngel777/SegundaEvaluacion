# Segunda Evaluación

Proyecto de la segunda evaluación con dos ejercicios, cada uno con su propio backend (Express) y frontend (React + Vite + Reactstrap).

## Integrantes

| Nombre | Carnet |
| --- | --- |
| José Andrés Calles Ramírez | 00054525 |
| Jeffrey Alessandro Guevara Batres | 00388525 |
| Daniel Alexander Avelar Orellana | 00089625 |
| Johann André Angel Menjivar | 00071625 |

## Estructura

```
SegundaEvaluacion/
├── ejercicio-1/        Adivina el Número
│   ├── backend/
│   └── frontend/
└── ejercicio-2/        Food DEI
    ├── backend/
    └── frontend/
```

## Tecnologías

- **Backend:** Node.js, Express, 
- **Frontend:** React 18, Vite, Reactstrap y Bootstrap 5

## Ejercicio 1: Adivina el Número

El servidor genera un número secreto entre 1 y 100 y el jugador intenta adivinarlo. Tras cada intento, la API indica si el número secreto es mayor, menor o si ya se acertó. El frontend muestra un historial de intentos.

| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | `/guess` | Envía un intento (`{ "numero": 50 }`) |
| POST | `/reset` | Genera un nuevo número secreto |

**Puertos:** backend `3001`, frontend `5174`.

## Ejercicio 2: Food DEI

Sistema de reserva de almuerzos. El usuario arma una bandeja con platos del menú, con un saldo disponible y un tiempo limitado para confirmar. Si el tiempo se acaba, la reserva expira y el stock se devuelve al menú.

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/menu` | Lista el menú con su stock |
| GET | `/api/reserva` | Estado de la reserva, saldo y tiempo restante |
| POST | `/api/reserva/agregar` | Agrega un plato (`alimentoId`, `cantidad`) |
| PUT | `/api/reserva/actualizar-porciones/:id` | Cambia la cantidad de un plato |
| DELETE | `/api/reserva/eliminar/:id` | Quita un plato de la reserva |
| POST | `/api/reserva/confirmar` | Confirma la reserva y descuenta el saldo |
| POST | `/api/reserva/reiniciar` | Inicia una reserva nueva |

**Puertos:** backend `3000`, frontend `5173`.

## Cómo ejecutarlo

Necesitas tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior). Cada parte se ejecuta por separado, en su propia terminal.

### Backend

```bash
cd ejercicio-1/backend      # o ejercicio-2/backend
npm install
npm run dev
```

### Frontend

```bash
cd ejercicio-1/frontend     # o ejercicio-2/frontend
npm install
npm run dev
```

Para el ejercicio 2 también puedes copiar `backend/.env.example` a `backend/.env` y ajustar el puerto, la duración de la reserva (`RESERVA_DURACION_SEG`) o el saldo inicial (`SALDO_INICIAL`).

## Licencia

Este proyecto usa la licencia incluida en el archivo [LICENSE](LICENSE).
