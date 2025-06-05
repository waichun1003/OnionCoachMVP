import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prismaClientSingleton = () => {
  // Handle missing DATABASE_URL during build time
  if (!process.env.DATABASE_URL && process.env.NODE_ENV !== 'development') {
    // Return a mock client during build time
    return {} as PrismaClient
  }

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  })
  
  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    return prisma.$extends(withAccelerate())
  }
  return prisma
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma