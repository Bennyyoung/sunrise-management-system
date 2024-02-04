-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PARENT', 'STUDENT', 'STAFF', 'SUPER_ADMIN', 'SCHOOL_ADMIN', 'ADMIN');

-- CreateTable
CREATE TABLE "SuperAdmin" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'SUPER_ADMIN',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolAdmin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'SCHOOL_ADMIN',
    "schoolName" TEXT NOT NULL,
    "schoolAddress" TEXT NOT NULL,
    "schoolEmail" TEXT NOT NULL,
    "schoolPhoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CACFile" (
    "id" TEXT NOT NULL,
    "schoolAdminId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CACFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SchoolAdmin_username_key" ON "SchoolAdmin"("username");

-- AddForeignKey
ALTER TABLE "CACFile" ADD CONSTRAINT "CACFile_schoolAdminId_fkey" FOREIGN KEY ("schoolAdminId") REFERENCES "SchoolAdmin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
