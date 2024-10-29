import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
export async function POST(req: NextRequest) {
    const body = await req.json()
    const prisma = new PrismaClient()
    // 线上的address是["线上", "全部"]， isDetail是否详情（评论信息等）
    const {address, isDetail} = body

    try {
    const row = await prisma.activity.findMany({
        where: {
            address: {
                array_contains: address
            }
        },
        orderBy: {
            updateTime: 'asc'
        }
    })
    if (isDetail)
    return Response.json({
        code: 200,
        message: '成功',
        data: row
    })
} catch (e) {
    return Response.json({
      code: 500,
      messsage: "失败",
    });
  } finally {
    prisma.$disconnect();
  }
}