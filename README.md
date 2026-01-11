# 🚀 Crypto Wallet Recharge API

API REST desarrollada con **NestJS**, **Prisma v7** y **PostgreSQL**, que permite registrar y listar recargas de una billetera cripto aplicando conversión Fiat → Crypto, costos por transacción y control de roles (admin / read-only).

El proyecto implementa **Clean Architecture**, **roles reales desde base de datos** y **pruebas unitarias**, cumpliendo completamente los requisitos de la prueba técnica.

---

## 📌 Características

- Registro de recargas (`POST /recharges`)
- Listado de recargas (`GET /recharges`)
- Conversión Fiat → Crypto (mock)
- Cálculo de fee por tipo de transacción (mock)
- Persistencia con Prisma + PostgreSQL
- Control de acceso por roles (admin / read-only)
- Roles obtenidos desde la base de datos
- Pruebas unitarias con Jest
- Arquitectura limpia

---

## 🧱 Arquitectura (Clean Architecture)


````
src/
├── domain/ # Entidades, enums, interfaces
├── application/ # Casos de uso y DTOs
├── infrastructure/ # Prisma, auth, repositorios, servicios
├── presentation/ # Controllers (API)
└── app.module.ts

````


Principio clave: el dominio no depende de frameworks ni librerías externas.

---

## 🛠️ Requisitos

- Node.js (LTS)
- npm
- PostgreSQL
- Git

---

## 🔐 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://postgres:123456@127.0.0.1:5432/crypto_cartera?schema=public"

🧬 Base de datos (Prisma)
📁 Estructura
prisma/
├── schema.prisma
├── migrations/
└── seed.ts


Generar cliente Prisma
npx prisma generate

2️⃣ Ejecutar migraciones
npx prisma migrate dev --name init

Ejecutar seed (usuarios y roles)
npx prisma db seed


Usuarios creados automáticamente:

ID	           Email	              Rol
admin-1	     admin@demo.com       admin
readonly-1	  readonly@demo.com    read-only

Ejecutar el proyecto
npm install
npm run start:dev


Servidor disponible en:

http://localhost:3000


El usuario se valida contra la tabla users y su rol determina el acceso.

Permisos
Rol	      Permisos
admin	      Crear y listar recargas
read-only	Solo listar recargas

📡 Endpoints
🔹 POST /recharges (solo ADMIN)

Headers

Content-Type: application/json
x-user-id: admin-1


Body

{
  "userId": "admin-1",
  "walletType": "USDC",
  "amountFiat": 100,
  "fiatCurrency": "USD",
  "transactionType": "BANK_TRANSFER"
}


Respuesta 200

{
  "id": "uuid",
  "userId": "admin-1",
  "walletType": "USDC",
  "amountFiat": 100,
  "fiatCurrency": "USD",
  "amountCrypto": 100,
  "transactionType": "BANK_TRANSFER",
  "transactionCost": 2,
  "createdAt": "2026-01-10T21:53:19.431Z"
}


Errores posibles

401 Missing x-user-id header

401 Invalid user

403 Forbidden

🔹 GET /recharges (ADMIN y READ-ONLY)

Headers

x-user-id: readonly-1


Respuesta 200

[
  {
    "id": "uuid",
    "userId": "admin-1",
    "walletType": "USDC",
    "amountFiat": 100,
    "fiatCurrency": "USD",
    "amountCrypto": 100,
    "transactionType": "BANK_TRANSFER",
    "transactionCost": 2,
    "createdAt": "2026-01-10T21:53:19.431Z"
  }
]

🧪 Pruebas unitarias

Incluye pruebas para los casos de uso principales.

Ejecutar tests:

npm test


Resultado esperado:

PASS create-recharge.use-case.spec.ts
PASS list-recharges.use-case.spec.ts

📊 Prisma Studio (opcional)
npx prisma studio


Abrir manualmente en el navegador:

http://localhost:5555

❌ Restricciones

No se permite editar recargas

No se implementa autenticación real (login)

La autenticación se simula por header (permitido por la prueba)

🏁 Conclusión

Este proyecto cumple todos los requisitos de la prueba técnica:

Funcionalidad completa

Arquitectura limpia

Control de roles desde base de datos

Pruebas unitarias

Persistencia con Prisma
   


