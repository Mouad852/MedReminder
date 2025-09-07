/* eslint-disable */ /* prettier-ignore */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface AvailabilityData {
  doctorId: string;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked?: boolean;
}

async function main() {
  await prisma.availability.deleteMany({});
  await prisma.doctor.deleteMany({});
  await prisma.user.deleteMany({ where: { role: 'DOCTOR' } });

  const specialties = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Pediatrics',
    'Oncology',
    'General Medicine',
    'Orthopedics',
  ];

  const cities = [
    'Casablanca',
    'Marrakech',
    'Fes',
    'Tangier',
    'Agadir',
    'Rabat',
    'Meknes',
    'Oujda',
    'Kenitra',
    'Tetouan',
    'Safi',
    'El Jadida',
    'Nador',
  ];

  const doctorsPerSpecialtyPerCity = 5; // 5 doctors per specialty per city

  for (let i = 0; i < specialties.length; i++) {
    for (let j = 0; j < cities.length; j++) {
      for (let d = 0; d < doctorsPerSpecialtyPerCity; d++) {
        const firstName = `Dr${i}${j}${d}`;
        const lastName = `Seed`;
        const email = `doctor${i}${j}${d}@med.com`;
        const password = await bcrypt.hash('doctor123', 10);

        // Create the user
        const user = await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password,
            role: 'DOCTOR',
            city: cities[j],
          },
        });

        // Create the doctor profile
        const doctor = await prisma.doctor.create({
          data: {
            userId: user.id,
            specialty: specialties[i],
            location: cities[j],
            phone: `+2126000${i}${j}${d}`,
            bio: `Experienced ${specialties[i]} doctor in ${cities[j]}.`,
            experience: Math.floor(Math.random() * 20) + 1,
          },
        });

        // Create availabilities
        const availabilities: AvailabilityData[] = [];
        for (let k = 1; k <= 3; k++) {
          const date = new Date();
          date.setDate(date.getDate() + k);

          availabilities.push({
            doctorId: doctor.id,
            date,
            startTime: '09:00',
            endTime: '12:00',
          });
          availabilities.push({
            doctorId: doctor.id,
            date,
            startTime: '14:00',
            endTime: '17:00',
          });
        }

        for (const availability of availabilities) {
          await prisma.availability.create({ data: availability });
        }

        console.log(
          `✅ Created doctor ${firstName} (${specialties[i]}) in ${cities[j]} with availabilities`,
        );
      }
    }
  }

  console.log('🌱 Doctors + availabilities seeding completed!');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
