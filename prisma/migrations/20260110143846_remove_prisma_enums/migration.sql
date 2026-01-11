/*
  Warnings:

  - You are about to alter the column `user_id` on the `recharges` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `wallet_type` on the `recharges` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `fiat_currency` on the `recharges` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `transaction_type` on the `recharges` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "recharges" ALTER COLUMN "user_id" SET DATA TYPE VARCHAR(255),
DROP COLUMN "wallet_type",
ADD COLUMN     "wallet_type" VARCHAR(50) NOT NULL,
DROP COLUMN "fiat_currency",
ADD COLUMN     "fiat_currency" VARCHAR(10) NOT NULL,
DROP COLUMN "transaction_type",
ADD COLUMN     "transaction_type" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" VARCHAR(50) NOT NULL DEFAULT 'read-only';

-- CreateIndex
CREATE INDEX "recharges_user_id_idx" ON "recharges"("user_id");

-- CreateIndex
CREATE INDEX "recharges_created_at_idx" ON "recharges"("created_at");
