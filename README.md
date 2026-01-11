# Crypto Wallet Recharge API

API de recargas para billeteras cripto construida con NestJS, Prisma y PostgreSQL. Expone endpoints para registrar recargas y consultar el historial, con un control de acceso simple basado en un header de rol.

## Stack

- **Node.js + NestJS** para la API.
- **Prisma** como ORM.
- **PostgreSQL** como base de datos.

## Requisitos

- Node.js 18+ (recomendado).
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

## Ejecución

```bash
# desarrollo
npm run start:dev

# producción
npm run start:prod
```

La API se levanta en `http://localhost:3000`.

## Autorización por rol

La API usa el header `x-role` para simular autenticación. Si no envías el header, el rol es `read-only` por defecto.

Valores permitidos:

- `admin`
- `read-only` o `readonly`

Ejemplo:

```bash
curl -H "x-role: admin" http://localhost:3000/recharges
```

## Endpoints

### `POST /recharges`

Crea una recarga (solo `admin`).

**Body**

```json
{
  "userId": "user-123",
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

### `GET /recharges`

Lista las recargas (roles `admin` y `read-only`).

```bash
curl -H "x-role: read-only" http://localhost:3000/recharges
```

## Tests

```bash
npm run test
```

## Notas

- La conversión de moneda y el costo de transacción están simulados en la capa de servicios de infraestructura.
- Prisma utiliza `DATABASE_URL` para conectarse a PostgreSQL.
