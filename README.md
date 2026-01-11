 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
index 8f0f65f7e7f7a77781af65d82501109530d444f4..46841c042555cb67cba514973d0840b635286c39 100644
--- a/README.md
+++ b/README.md
@@ -1,98 +1,105 @@
-<p align="center">
-  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
-</p>
-
-[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
-[circleci-url]: https://circleci.com/gh/nestjs/nest
-
-  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
-    <p align="center">
-<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
-<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
-<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
-<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
-<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
-<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
-<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
-  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
-    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
-  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
-</p>
-  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
-  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
-
-## Description
-
-[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
-
-## Project setup
+# Crypto Wallet Recharge API
 
-```bash
-$ npm install
-```
+API de recargas para billeteras cripto construida con NestJS, Prisma y PostgreSQL. Expone endpoints para registrar recargas y consultar el historial, con un control de acceso simple basado en un header de rol.
 
-## Compile and run the project
+## Stack
 
-```bash
-# development
-$ npm run start
+- **Node.js + NestJS** para la API.
+- **Prisma** como ORM.
+- **PostgreSQL** como base de datos.
 
-# watch mode
-$ npm run start:dev
+## Requisitos
 
-# production mode
-$ npm run start:prod
-```
+- Node.js 18+ (recomendado).
+- PostgreSQL disponible localmente o remoto.
 
-## Run tests
+## Configuración
 
-```bash
-# unit tests
-$ npm run test
+1. Instala dependencias:
+
+   ```bash
+   npm install
+   ```
 
-# e2e tests
-$ npm run test:e2e
+2. Configura variables de entorno creando un archivo `.env`:
+
+   ```bash
+   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
+   ```
+
+3. Genera el cliente de Prisma y aplica migraciones:
+
+   ```bash
+   npx prisma generate
+   npx prisma migrate dev
+   ```
+
+## Ejecución
+
+```bash
+# desarrollo
+npm run start:dev
 
-# test coverage
-$ npm run test:cov
+# producción
+npm run start:prod
 ```
 
-## Deployment
+La API se levanta en `http://localhost:3000`.
 
-When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.
+## Autorización por rol
 
-If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:
+La API usa el header `x-role` para simular autenticación. Si no envías el header, el rol es `read-only` por defecto.
+
+Valores permitidos:
+
+- `admin`
+- `read-only` o `readonly`
+
+Ejemplo:
 
 ```bash
-$ npm install -g @nestjs/mau
-$ mau deploy
+curl -H "x-role: admin" http://localhost:3000/recharges
 ```
 
-With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.
+## Endpoints
+
+### `POST /recharges`
+
+Crea una recarga (solo `admin`).
+
+**Body**
 
-## Resources
+```json
+{
+  "userId": "user-123",
+  "walletType": "USDC",
+  "amountFiat": 100,
+  "fiatCurrency": "USD",
+  "transactionType": "BANK_TRANSFER"
+}
+```
+
+**Valores permitidos**
 
-Check out a few resources that may come in handy when working with NestJS:
+- `walletType`: `USDC`, `COPW`
+- `fiatCurrency`: `USD`, `CHF`, `COP`
+- `transactionType`: `BANK_TRANSFER`, `ATM_NATIONAL`, `ATM_INTERNATIONAL`
 
-- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
-- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
-- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
-- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
-- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
-- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
-- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
-- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).
+### `GET /recharges`
 
-## Support
+Lista las recargas (roles `admin` y `read-only`).
 
-Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
+```bash
+curl -H "x-role: read-only" http://localhost:3000/recharges
+```
 
-## Stay in touch
+## Tests
 
-- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
-- Website - [https://nestjs.com](https://nestjs.com/)
-- Twitter - [@nestframework](https://twitter.com/nestframework)
+```bash
+npm run test
+```
 
-## License
+## Notas
 
-Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
+- La conversión de moneda y el costo de transacción están simulados en la capa de servicios de infraestructura.
+- Prisma utiliza `DATABASE_URL` para conectarse a PostgreSQL.
 
EOF
)
