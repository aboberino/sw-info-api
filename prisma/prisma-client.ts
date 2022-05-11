import { PrismaClient } from '@prisma/client'

// add prisma to the NodeJS global type
// TODO : downgraded @types/node to 15.14.1 to avoid error on NodeJS.Global
// interface CustomNodeJsGlobal extends NodeJS.Global {
//   prisma: PrismaClient
// }

// // Prevent multiple instances of Prisma Client in development

// const prisma = global.prisma || new PrismaClient()

// if (process.env.NODE_ENV === 'development') {
//   global.prisma = prisma
// }

// export default prisma

declare global {
    var prisma: PrismaClient
}
  
let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }
    prisma = global.prisma
}

export default prisma