// 后台管理，做一些重置操作，方便测试
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import basic from "@/config/basic";
export async function POST() {
  const prisma = new PrismaClient();
  try {
    await prisma.user_basis.updateMany({
      where: {}, // 此条件将匹配表中的所有记录
      data: {
        gameList: [],
      },
    });
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
