import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
export async function POST(req: NextRequest) {
    const body = await req.json()
    const prisma = new PrismaClient()
    const {id} = body
    const row = await prisma.user_basis.findFirst({
        where: {
            id
        }
    })
    return Response.json(row)
}