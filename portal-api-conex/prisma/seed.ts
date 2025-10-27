import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting database seed...")

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10)
  const admin = await prisma.admin.upsert({
    where: { email: "admin@conex.com" },
    update: {},
    create: {
      email: "admin@conex.com",
      password: hashedPassword,
      name: "Admin Conex",
      photoUrl: null,
    },
  })
  console.log("Created admin:", admin.email)

  // Create sample users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "user1@example.com" },
      update: {},
      create: {
        email: "user1@example.com",
        name: "João Silva",
        phone: "+55 11 98765-4321",
        photoUrl: null,
      },
    }),
    prisma.user.upsert({
      where: { email: "user2@example.com" },
      update: {},
      create: {
        email: "user2@example.com",
        name: "Maria Santos",
        phone: "+55 21 98765-4321",
        photoUrl: null,
      },
    }),
    prisma.user.upsert({
      where: { email: "user3@example.com" },
      update: {},
      create: {
        email: "user3@example.com",
        name: "Pedro Oliveira",
        phone: "+55 31 98765-4321",
        photoUrl: null,
      },
    }),
  ])
  console.log(`Created ${users.length} users`)

  // Create sample feedbacks
  const feedbacks = await Promise.all([
    prisma.feedback.create({
      data: {
        userId: users[0].id,
        rating: 5,
        comment: "Excelente aplicativo! Muito útil e fácil de usar.",
      },
    }),
    prisma.feedback.create({
      data: {
        userId: users[1].id,
        rating: 4,
        comment: "Muito bom, mas poderia ter mais funcionalidades.",
      },
    }),
    prisma.feedback.create({
      data: {
        userId: users[2].id,
        rating: 5,
        comment: "Perfeito! Recomendo para todos.",
      },
    }),
  ])
  console.log(`Created ${feedbacks.length} feedbacks`)

  // Create sample services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        userId: users[0].id,
        title: "Instalação de Sistema",
        description: "Instalação completa do sistema operacional",
        status: "completed",
        completedAt: new Date(),
      },
    }),
    prisma.service.create({
      data: {
        userId: users[1].id,
        title: "Manutenção Preventiva",
        description: "Manutenção preventiva de equipamentos",
        status: "completed",
        completedAt: new Date(),
      },
    }),
    prisma.service.create({
      data: {
        userId: users[2].id,
        title: "Suporte Técnico",
        description: "Suporte técnico remoto",
        status: "pending",
      },
    }),
  ])
  console.log(`Created ${services.length} services`)

  console.log("Database seed completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
