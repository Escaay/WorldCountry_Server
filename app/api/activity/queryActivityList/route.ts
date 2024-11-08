import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
export async function POST(req: NextRequest) {
    const body = await req.json()
    const prisma = new PrismaClient()
    // 线上的address是["线上", "全部"]， isDetail是否详情（评论信息等）
    const {senderOriginAddress} = body
    try {
    const row = await prisma.activity.findMany({
        where: {
            senderOriginAddress: {
                array_contains: senderOriginAddress
            }
        },
        orderBy: {
            updateTime: 'asc'
        }
    })
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