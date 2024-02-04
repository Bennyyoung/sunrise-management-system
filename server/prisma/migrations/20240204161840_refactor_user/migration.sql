/*
  Warnings:

  - You are about to drop the column `schoolAdminId` on the `CACFile` table. All the data in the column will be lost.
  - You are about to drop the `SchoolAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SuperAdmin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `schoolAdminProfileId` to the `CACFile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleStatus" AS ENUM ('Active', 'Inactive');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'DEACTIVATED');

-- CreateEnum
CREATE TYPE "PermissionEnum" AS ENUM ('ManageStudents', 'ManageSchoolAdmin', 'ManageAdmins');

-- DropForeignKey
ALTER TABLE "CACFile" DROP CONSTRAINT "CACFile_schoolAdminId_fkey";

-- AlterTable
ALTER TABLE "CACFile" DROP COLUMN "schoolAdminId",
ADD COLUMN     "schoolAdminProfileId" TEXT NOT NULL;

-- DropTable
DROP TABLE "SchoolAdmin";

-- DropTable
DROP TABLE "SuperAdmin";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT,
    "password" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "status" "AccountStatus" NOT NULL DEFAULT E'ACTIVE',
    "isDeactivated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "schoolAdminProfileId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "RoleStatus" NOT NULL DEFAULT E'Active',
    "permissions" "PermissionEnum"[],
    "isDeactivated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolAdminProfile" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "schoolAddress" TEXT NOT NULL,
    "schoolEmail" TEXT NOT NULL,
    "schoolPhoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SchoolAdminProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "Roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolAdminProfile_username_key" ON "SchoolAdminProfile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolAdminProfile_userId_key" ON "SchoolAdminProfile"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolAdminProfile" ADD CONSTRAINT "SchoolAdminProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CACFile" ADD CONSTRAINT "CACFile_schoolAdminProfileId_fkey" FOREIGN KEY ("schoolAdminProfileId") REFERENCES "SchoolAdminProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
