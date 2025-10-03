-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "fullName" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "accountType" TEXT NOT NULL,
    "avatar" TEXT
);

-- CreateTable
CREATE TABLE "roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalPrice" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "detailDesc" TEXT,
    "shortDesc" TEXT,
    "quantity" INTEGER NOT NULL,
    "sold" TEXT,
    "factory" TEXT,
    "target" TEXT
);
