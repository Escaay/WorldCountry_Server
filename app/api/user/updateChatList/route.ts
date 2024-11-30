import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
export async function POST(req: NextRequest) {
    const prisma = new PrismaClient()
    try{
    const body = await req.json()
    const {chatId} = body
    // const operatorId = req.headers.get('operatorId')
    // 暂时注释，测试
    // if (userId !== operatorId) {
    //   // 防止用户修改别的用户的信息
    //   await Promise.reject('权限不足')
    // }
    await prisma.chat_list.update({
        where: {
            chatId
        },
        data: body
    })
    // console.log('upchatList', chatList)
    return Response.json({
      code: 200,
      message: '更新成功',
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