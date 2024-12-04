import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const prisma = new PrismaClient();
  const PAGE_SIZE = 5;
  // type分为推荐列表(recommand)，同城列表(sameCity)，用户个人列表(userSelf), 对应不同的筛选where条件
  const { senderCity, userId, type, pageInfo, skip } = body;
  let where;
  if (type === "recommand") where = {};
  if (type === "sameCity") {
    where = {
        articleAddress: {
          array_contains: senderCity
      },
    };
  }
  if (type === "userSelf") where = { senderId: userId };

  try {
    const articleList = await prisma.article.findMany({
      where,
      skip: (skip !== undefined) ? skip : (pageInfo.pageNum - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        articleId: true,
        articleLike: {
          select: {
            articleLikeId: true,
            sender: {
              select: {
                id: true,
              },
            },
          },
        },
        gameName: true,
        playTime: true,
        peopleNum: true,
        teamPeople: true,
        textContent: true,
        commentNum: true,
        viewNum: true,
        imageUrlList: true,
        tag: true,
        createTime: true,
        updateTime: true,
        sender: {
          select: {
            currentAddress: true,
            id: true,
            avatarURL: true,
            name: true,
            age: true,
            gender: true,
          },
        },
      },
      orderBy: {
        createTime: "desc",
      },
    });

    const articleListCount = await prisma.article.count({
      where
    })
    const articleIdList = articleList.map((item) => item.articleId);
    // // 把所有文章该用户点赞的信息都取出来，这样不用多次操作数据库，取出来之后自己匹配插入到对应文章中，更快
    // const articleLikeList = await prisma.article_like.findMany({
    //   where: {
    //     senderId: userId,
    //     articleId: {
    //       in: articleIdList,
    //     },
    //   },
    //   select: {
    //     articleId: true,
    //     senderId: true,
    //     articleLikeId: true,
    //   },
    // });
    // const result = articleList.map((item) => {
    //   return {
    //     ...item,
    //     likeInfo: articleLikeList.filter(
    //       (item1) => item.articleId === item1.articleId
    //     ),
    //   };
    // });

    // 让所有动态的浏览数加一，这里要await不然不会生效
    if (type !== "userSelf")
      await prisma.article.updateMany({
        where: {
          articleId: {
            in: articleIdList,
          },
        },
        data: {
          viewNum: {
            increment: 1,
          },
        },
      });

    return Response.json({
      code: 200,
      message: "成功",
      data: {articleList, articleListCount},
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
