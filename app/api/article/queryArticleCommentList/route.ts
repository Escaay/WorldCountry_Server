import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
export async function POST(req: NextRequest) {
    const body = await req.json()
    const prisma = new PrismaClient()
    const PAGE_SIZE = 5  // 每次取5条
    const {articleId, pageInfo} = body
    const where: any = {articleId, level: 1}
    try {
      // 一级评论
    const firstLevelArticleCommentList: any = await prisma.article_comment.findMany({
        skip: (pageInfo.pageNum - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
        select: {
          articleSenderId: true,
          sender: {
            select: {
              id: true,
              avatarURL: true,
              name: true,
              currentAddress: true,
              gender: true,
              age: true
            }
          },
          isRead: true,
          articleCommentId: true,
          level: true,
          textContent: true,
          imageURL: true,
          createTime: true,
          updateTime: true,
          // 文章详情不需要，评论列表需要
          article: {
            select: {
              sender: {
                select: {
                  id: true
                }
              },
              articleId: true,
              textContent: true,
              imageUrlList: true,
            }
          },
          articleCommentLike: {
            select: {
              articleCommentLikeId: true,
              isRead: true,
              sender: {
                select: {
                  id: true
                }
              }
            }
          }
        },
        orderBy: {
          // 按照创建时间排序（发布评论的时间）
            createTime: 'desc'
        }
    })
    const result = [...firstLevelArticleCommentList]
    // 每个一级评论都请求一个最近的回复，更多回复手动展开，在另外一个接口请求
    const promises = result.map(async (item: any, index: number) => {
      const replyComment = await prisma.article_comment.findMany({
        // skip: (pageInfo.pageNum - 1) * PAGE_SIZE,
        take: 1,
        where: {
          replyArticlCommentId: item.articleCommentId,
          level: 2
          // OR: [
          //   {
          //     level: 2
          //   },
          //   {
          //     level: 3
          //   }
          // ]
        },
        select: {
          articleSenderId: true,
          sender: {
            select: {
              id: true,
              avatarURL: true,
              name: true,
              currentAddress: true,
              gender: true,
              age: true
            }
          },
          isRead: true,
          articleCommentId: true,
          level: true,
          textContent: true,
          imageURL: true,
          createTime: true,
          updateTime: true,
          // 文章详情不需要，评论列表需要
          article: {
            select: {
              sender: {
                select: {
                  id: true
                }
              },
              articleId: true,
              textContent: true,
              imageUrlList: true,
            }
          },
          articleCommentLike: {
            select: {
              articleCommentLikeId: true,
              isRead: true,
              sender: {
                select: {
                  id: true
                }
              }
            }
          }
        },
        orderBy: {
          // 按照创建时间排序（发布评论的时间）
            createTime: 'desc'
        }
      })
      const replyCommentCount = await prisma.article_comment.count({
        // skip: (pageInfo.pageNum - 1) * PAGE_SIZE,
        where: {
          replyArticlCommentId: item.articleCommentId,
          OR: [
            {
              level: 2
            },
            {
              level: 3
            }
          ]
        },
      })
      item.replyComment = replyComment
      // 使用回复数量判断是否展示“展示更多回复”按钮
      item.replyCommentCount = replyCommentCount
    })
    await Promise.all(promises)
    return Response.json({
        code: 200,
        message: '成功',
        data: result
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