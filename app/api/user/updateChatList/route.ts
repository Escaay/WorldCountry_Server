import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
export async function POST(req: NextRequest) {
    const body = await req.json()
    const prisma = new PrismaClient()
    const res = await prisma.chat_list.update({
        where: {
            id: body.id
        },
        data: body
    })
    return Response.json(res)
}