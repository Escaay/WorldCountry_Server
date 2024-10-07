import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
export async function POST(req: NextRequest) {
    // 这里会把参数的json parse出来，想要存入数据库，需要把对象或者数组重新stringfy
    const body = await req.json()
    // 标签去重和JSON化
    body.customTags = JSON.stringify(Array.from(new Set(body.customTags)))
    const prisma = new PrismaClient()
    const {id} = body
    const res = await prisma.user_basis.update({
        where: {
            id
        },
        data: body
    })
    return Response.json(res)
}