import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const prisma = new PrismaClient();
  const { id } = body;
  try {
    const row = await prisma.user_basis.findFirst({
      where: {
        id,
      },
    });
    return Response.json({
      code: 200,
      message: "成功",
      data: row,
    });
  } catch (e) {
    console.log(e)
    return Response.json({
      code: 500,
      message: "失败",
    });
  } finally {
    prisma.$disconnect();
  }
}
