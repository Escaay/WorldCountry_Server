import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const prisma = new PrismaClient();
  const { userId, skip } = body;
  console.log(skip)
  const PAGE_SIZE = 5;
  // 因为是双表查询，不能用常规的skip
  // 判断是否10, 20，而不是5, 15等数字
  const isDobule = String(skip).slice(-1) === "0";
  try {
    const articleLikeList = await prisma.article_like.findMany({
      where: { articleSenderId: userId },
      skip: !isDobule ? ((skip - 5) < 0 ? 0 : (skip - 5)) : skip,
      // 要拿2倍的数据出来，才能保证时间顺序，后续再优化
      take: PAGE_SIZE * 2,
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
            age: true,
          },
        },
        article: {
          select: {
            articleId: true,
            textContent: true,
            imageUrlList: true,
          },
        },
      },
      orderBy: {
        // 按照创建时间降序排序（发布评论的时间）
        createTime: "desc",
      },
    });
    const articleCommentLikeList = await prisma.article_comment_like.findMany({
      take: PAGE_SIZE * 2,
      skip: !isDobule ? ((skip - 5) < 0 ? 0 : (skip - 5)) : skip,
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
            age: true,
          },
        },
        article: {
          select: {
            articleId: true,
          },
        },
        articleComment: {
          select: {
            articleCommentId: true,
            textContent: true,
            imageURL: true,
          },
        },
      },
      orderBy: {
        // 按照创建时间排序（发布评论的时间）
        createTime: "desc",
      },
    });

    const articleLikeListCount = await prisma.article_like.count({
      where: { articleSenderId: userId },
    });

    const articleCommentLikeListCount = await prisma.article_comment_like.count(
      {
        where: {
          commentSenderId: userId,
        },
      }
    );

    const likeList = [...articleLikeList, ...articleCommentLikeList];
    // 降序
    likeList.sort((a, b) => b.createTime.getTime() - a.createTime.getTime());

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

    const result = isDobule ? likeList.slice(0, 5) : likeList.slice(5, 10);
    // console.log(likeList.map(item => {
    //   const result = {...item}
    //   delete result.sender
    //   return result
    // }))
    return Response.json({
      code: 200,
      message: "成功",
      data: {likeList: result, likeListCount: articleLikeListCount + articleCommentLikeListCount},
    });
  } catch (e) {
    console.log(e);
    return Response.json({
      code: 500,
      message: "失败",
    });
  } finally {
    prisma.$disconnect();
  }
}
