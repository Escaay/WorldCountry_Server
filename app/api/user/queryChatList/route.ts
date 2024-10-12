import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
export async function POST(req: NextRequest) {
    const prisma = new PrismaClient()
    try{
    const body = await req.json()
    const {id} = body
    const row = await prisma.user_basis.findFirst({
        where: {
            id
        }
    })
    return Response.json(row)
} catch (e) {
    return Response.json({
      code: 400,
      message: e,
    });
  } finally {
    prisma.$disconnect();
  }
}