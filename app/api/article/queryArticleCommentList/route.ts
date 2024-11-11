import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
export async function POST(req: NextRequest) {
    const body = await req.json()
    const prisma = new PrismaClient()
    // 线上的address是["线上", "全部"]， isDetail是否详情（评论信息等）
    const {articleId, articleSenderId} = body
    // 根据文章或者用户id获取评论列表，用处不一样
    const where = articleId ? {articleId} : articleSenderId
    try {
    const row = await prisma.article_comment.findMany({
        where,
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
  console.log(e)
    return Response.json({
      code: 500,
      messsage: "失败",
    });
  } finally {
    prisma.$disconnect();
  }
}