import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
export async function POST(req: NextRequest) {
    const operatorId = req.headers.get('operatorId')
    const prisma = new PrismaClient()
    try{
    const body = await req.json()
    // 标签去重,这里传的是对象，到时候prisma会自动帮你变成json存进数据库，不用自己stringify
    if (body.customTags) body.customTags = Array.from(new Set(body.customTags))
    const {id} = body
  if (id !== operatorId) {
    // 防止用户修改别的用户的信息
    await Promise.reject('权限不足')
  }
    const data = await prisma.user_basis.update({
        where: {
            id
        },
        data: body
    })
    return Response.json({
        code: 200,
        data,
        message: '保存成功'
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