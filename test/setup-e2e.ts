import { PrismaPg } from '@prisma/adapter-pg'
import { execSync } from 'child_process'
import { randomUUID } from 'crypto'
import 'dotenv/config'

import { PrismaClient } from 'generated/prisma/client'

let prisma: PrismaClient | undefined

function generateUniqueDatabaseUrl(schemaId: string){
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL environment variable')
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schemaId)

    return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {

    const databaseUrl = generateUniqueDatabaseUrl(schemaId)

    process.env.DATABASE_URL = databaseUrl
    process.env.DATABASE_SCHEMA = schemaId

    const prismaAdapter = new PrismaPg(
        { connectionString: process.env.DATABASE_URL },
    )

    prisma = new PrismaClient({
        adapter: prismaAdapter
    })

    execSync('npx prisma migrate deploy')
})

afterAll(async () => {
    
    await prisma?.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
    await prisma?.$disconnect()
})