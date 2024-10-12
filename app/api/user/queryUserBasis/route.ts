import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
// 没传userId就是请求自己的信息，直接从accessToken里面取
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
    return Response.json({
        code: 200,
        data: row ? row : {},
        message: '请求成功'
    })
} catch (e) {
    return Response.json({
      code: 400,
      message: e,
    });
  } finally {
    prisma.$disconnect();
  }
}