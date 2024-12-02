import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const prisma = new PrismaClient();
  const { userId } = body;
  try {
    const articleLikeList = await prisma.article_like.findMany({
      where: { articleSenderId: userId },
      select: {
        articleLikeId: true,
        articleSenderId: true,
        createTime: true,
        updateTime: true,
        isRead: true,
        sender: {
          select: {
            id: true,
            name: true,
            avatarURL: true,
            currentAddress: true,
            gender: true,
            age: true
          }
        },
        article: {
          select: {
            articleId: true,
            textContent: true,
            imageUrlList: true,
          }
        }
      },
      orderBy: {
        // 按照创建时间降序排序（发布评论的时间）
        createTime: "desc",
      },
    });
    const articleCommentLikeList = await prisma.article_comment_like.findMany({
      where: {
        commentSenderId: userId,
      },
      select: {
        articleCommentLikeId: true,
        commentSenderId: true,
        createTime: true,
        updateTime: true,
        isRead: true,
        sender: {
          select: {
            id: true,
            name: true,
            avatarURL: true,
            currentAddress: true,
            gender: true,
            age: true
          }
        },
        article: {
          select: {
            articleId: true
          }
        },
        articleComment: {
          select: {
            articleCommentId: true,
            textContent: true,
            imageURL: true,
          }
        }
      },
      orderBy: {
        // 按照创建时间排序（发布评论的时间）
        createTime: "desc",
      },
    });

    // 把个人的所有未读的点赞信息设为已读（动态点赞，评论点赞）
    await prisma.article_like.updateMany({
      where: { articleSenderId: userId, isRead: false },
      data: {
        isRead: true,
      },
    });
    await prisma.article_comment_like.updateMany({
      where: {
        commentSenderId: userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return Response.json({
      code: 200,
      message: "成功",
      data: { articleLikeList, articleCommentLikeList },
    });
  } catch (e) {
    console.log(e);
    return Response.json({
      code: 500,
      messsage: "失败",
    });
  } finally {
    prisma.$disconnect();
  }
}
