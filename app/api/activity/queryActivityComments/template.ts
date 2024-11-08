import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const prisma = new PrismaClient();
  const { activityId } = body;
  try {
    const row = await prisma.activity_comment.findFirst({
      where: {
        activityId,
      },
    });
    return Response.json({
      code: 200,
      messsage: "成功",
      data: row,
    });
  } catch (e) {
    return Response.json({
      code: 500,
      messsage: "失败",
    });
  } finally {
    prisma.$disconnect();
  }
}
