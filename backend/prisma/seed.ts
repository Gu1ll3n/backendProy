import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const doctorPassword = await bcrypt.hash('Doctor123!', 10);
  const recepcionPassword = await bcrypt.hash('Recepcion123!', 10);

  await prisma.user.upsert({
    where: { email: 'admin@cemedica.com' },
    update: {},
    create: {
      email: 'admin@cemedica.com',
      name: 'Administrador General',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'doctor@cemedica.com' },
    update: {},
    create: {
      email: 'doctor@cemedica.com',
      name: 'Dr. Juan Pérez',
      password: doctorPassword,
      role: 'DOCTOR',
    },
  });

  await prisma.user.upsert({
    where: { email: 'recepcion@cemedica.com' },
    update: {},
    create: {
      email: 'recepcion@cemedica.com',
      name: 'María López',
      password: recepcionPassword,
      role: 'RECEPCION',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });