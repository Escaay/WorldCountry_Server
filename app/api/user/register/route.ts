import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { type Register } from "@/type/user";
import { v4 as uuidv4 } from 'uuid';
export async function POST(req: NextRequest) {
  const body: Register = await req.json();
  const {phone, code, password} = body
  const prisma = new PrismaClient();
    const uuid = uuidv4()
    try {
    await prisma.user_login.create({
        data: {
            id: uuid,
            phone,
            password
        }
    })
    await prisma.user_basis.create({
      data: {
        id: uuid,
        phone
      }
    })
  return Response.json({
    message: '注册成功',
    code: 1
  });
  } catch (e: any) {
    await prisma.$disconnect()
    return Response.json({
      message: e instanceof Object ? e.message : e,
      code: 0
    });
  }
} 
