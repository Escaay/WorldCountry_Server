import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  try {
    const body = await req.json();
    const { chatIds } = body;
    const messagesList: { chatId: string; messages: unknown[] }[] = [];
    // chatIds.forEach(async (chatId: string) => {
    //   const historyCount = await prisma.message_list.count({
    //     where: {
    //       chatId
    //   }
    //   })
    //   const messages = await prisma.message_list.findMany({
    //     skip: historyCount - 10 < 10 ? 0 : historyCount - 10,
    //       where: {
    //           chatId
    //       },
    //       orderBy: {
    //         createTime: 'asc'
    //       }
    //   })
    // })
    // 查询所有与给定 chatIds 相关联的消息
    const messages = await prisma.message_list.findMany({
      where: {
        chatId: {
          in: chatIds,
        },
      },
      orderBy: {
        createTime: "asc",
      },
    });

    // console.log(messages);
    return Response.json({
      code: 200,
      message: "请求成功",
      data: messages,
    });
  } catch (e) {
    console.log(e);
    return Response.json({
      code: 400,
      message: e,
    });
  } finally {
    prisma.$disconnect();
  }
}
