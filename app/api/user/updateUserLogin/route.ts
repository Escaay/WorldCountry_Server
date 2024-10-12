// import { PrismaClient } from "@prisma/client";
import { type NextRequest } from 'next/server'
export async function POST(req: NextRequest) {
  // const prisma = new PrismaClient();
  try {
    const body = await req.json()
    const {id} = body
    const operatorId = req.headers.get('operatorId')
    if (id !== operatorId) {
      // 防止用户修改别的用户的信息
      await Promise.reject('权限不足')
    }
    // const body = await req.json();
    // const main = async () => {
    // };
    // const res = await prismaErrorCatch(prisma, main);
    return Response.json({});
  } catch (e) {
    return Response.json({
      code: 400,
      message: e,
    });
  } finally {
    // prisma.$disconnect();
  }
}
