import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.person.createMany({
    data: [
      { firstName: 'Juan', lastNameP: 'Pérez', lastNameM: 'Lopez', address: 'Calle 1', phone: '123456789' },
      { firstName: 'Ana', lastNameP: 'García', lastNameM: 'Santos', address: 'Calle 2', phone: '987654321' },
    ],
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });