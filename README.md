# Crypto Wallet Recharge API

API de recargas para billeteras cripto construida con NestJS, Prisma y PostgreSQL. Expone endpoints para registrar recargas y consultar el historial, con control de acceso simple basado en usuarios almacenados en base de datos.

## Stack

- **Node.js + NestJS** para la API.
- **Prisma** como ORM.
- **PostgreSQL** como base de datos.

## Requisitos

- Node.js 18+.
- PostgreSQL disponible localmente o remoto.

## Configuración

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Configura variables de entorno creando un archivo `.env`:

   ```bash
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
   ```

3. Genera el cliente de Prisma y aplica migraciones:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

## Seed (datos iniciales)

Se incluye un seed básico para crear usuarios y recargas de ejemplo. El seed crea:

- Usuario admin: `user-admin-001`
- Usuario de solo lectura: `user-readonly-001`

Para ejecutar el seed:

```bash
npx prisma db seed
```

> Si ya existen registros, el seed actualiza los usuarios y solo inserta recargas si todavía no hay recargas para el usuario admin.

## Ejecución del proyecto

```bash
# desarrollo (con recarga)
npm run start:dev

# producción
npm run start:prod
```

La API se levanta en `http://localhost:3000`.

## Autorización por usuario

La API lee el usuario desde el header `x-user-id` y valida que exista en base de datos. El rol se toma del usuario en la tabla `users`.

- Si no envías `x-user-id`, la API responde `401 Missing x-user-id header`.
- Si el usuario no existe, responde `401 Invalid user`.

## Endpoints y ejemplos de uso

### `POST /recharges`

Crea una recarga. Solo permitido para usuarios con rol `admin`.

**Body**

```json
{
  "userId": "user-admin-001",
  "walletType": "USDC",
  "amountFiat": 100,
  "fiatCurrency": "USD",
  "transactionType": "BANK_TRANSFER"
}
```

**Valores permitidos**

- `walletType`: `USDC`, `COPW`
- `fiatCurrency`: `USD`, `CHF`, `COP`
- `transactionType`: `BANK_TRANSFER`, `ATM_NATIONAL`, `ATM_INTERNATIONAL`

**cURL**

```bash
curl -X POST http://localhost:3000/recharges \
  -H "Content-Type: application/json" \
  -H "x-user-id: user-admin-001" \
  -d '{
    "userId": "user-admin-001",
    "walletType": "USDC",
    "amountFiat": 100,
    "fiatCurrency": "USD",
    "transactionType": "BANK_TRANSFER"
  }'
```

### `GET /recharges`

Lista las recargas. Roles permitidos: `admin` y `read-only`.

**cURL**

```bash
curl -H "x-user-id: user-readonly-001" http://localhost:3000/recharges
```

## Tests

```bash
npm run test
```

## Notas

- La conversión de moneda y el costo de transacción están simulados en la capa de servicios de infraestructura.
- Prisma utiliza `DATABASE_URL` para conectarse a PostgreSQL.
