-- CreateEnum
CREATE TYPE "WalletType" AS ENUM ('SPOT', 'FUNDING');

-- CreateEnum
CREATE TYPE "FiatCurrency" AS ENUM ('USD', 'EUR', 'COP');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('BUY', 'SELL', 'RECHARGE');

-- CreateTable
CREATE TABLE "recharges" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "wallet_type" "WalletType" NOT NULL,
    "amount_fiat" DECIMAL(10,2) NOT NULL,
    "fiat_currency" "FiatCurrency" NOT NULL,
    "amount_crypto" DECIMAL(15,8) NOT NULL,
    "transaction_type" "TransactionType" NOT NULL,
    "transaction_cost" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recharges_pkey" PRIMARY KEY ("id")
);
