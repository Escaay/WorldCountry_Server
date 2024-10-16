import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
export async function POST(req: NextRequest) {
    const prisma = new PrismaClient()
    try{
    const body = await req.json()
    // const {senderId, receiverId, chatId, content} = body
    await prisma.message_list.create({
        data: body
    })
    return Response.json({
      code: 200,
      message: '请求成功',
    })
} catch (e) {
  console.log(e)
    return Response.json({
      code: 400,
      message: e,
    });
  } finally {
    prisma.$disconnect();
  }
}