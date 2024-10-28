// 后台管理，做一些重置操作，方便测试
import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import basic from "@/config/basic";
export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  try {
    await prisma.message_list.deleteMany({
      where: {},
    });
    // 重置所有聊天列表（不是删除）
    await prisma.chat_list.updateMany({
      where: {}, // 此条件将匹配 chat_list 表中的所有记录
      data: {
        chatList: [
          {
            chatId: uuidv4(),
            partnerId: basic.assistantId,
            lastMessage: '',
            lastMessageTime: new Date(),
          }
        ], // 将 chatList 字段更新为空数组
      },
    });
    const idObjList = await prisma.user_basis.findMany({
        where: {
            name: '新村民'
        },
        select: {
            id: true
        }
    })
    // 清除所有姓名为新村民的人，并且删除他们的聊天列表
    const idList = idObjList.map(item => item.id)
    await prisma.user_basis.deleteMany({
        where: {
            name: '新村民'
        }
    })
    await prisma.user_login.deleteMany({
        where: {
            id: {
                in: idList
            }
        }
    })
    await prisma.chat_list.deleteMany({
        where: {
            userId: {
                in: idList
            }
        }
    })
    return Response.json({
      code: 200,
      message: "请求成功",
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
