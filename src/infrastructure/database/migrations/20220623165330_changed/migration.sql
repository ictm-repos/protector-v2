-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastname" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "title" SET DEFAULT E'',
ALTER COLUMN "description" DROP NOT NULL;
