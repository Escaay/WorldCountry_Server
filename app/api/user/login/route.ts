import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import prismaErrorCatch from '@/utils/prismaErrorCatch'
export async function POST(req: NextRequest) {
    const body = await req.json()
    const prisma = new PrismaClient()
        const main = async () => {
        }
    const res = await prismaErrorCatch(prisma, main)
    console.log(res)
    return Response.json(res)
}