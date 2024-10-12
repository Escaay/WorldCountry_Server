import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
export async function POST(req: NextRequest) {
    const prisma = new PrismaClient()
    try{
    const body = await req.json()
    const {id} = body
    const operatorId = req.headers.get('operatorId')
    if (id !== operatorId) {
      // 防止用户修改别的用户的信息
      await Promise.reject('权限不足')
    }
    const res = await prisma.chat_list.update({
        where: {
            id: body.id
        },
        data: body
    })
    return Response.json(res)
} catch (e) {
    return Response.json({
      code: 400,
      message: e,
    });
  } finally {
    prisma.$disconnect();
  }
}