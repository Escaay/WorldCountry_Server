import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { type Register } from "@/type/user";
import { v4 as uuidv4 } from "uuid";
import {
  passwordValidator,
  phoneValidator,
  codeValidator,
} from "@/utils/validators";
import { apiCatchError } from "@/utils/apiCatchError";
import { createAccessToken } from "@/utils/authorization";
export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const fn = async () => {
    const body: Register = await req.json();
    const { phone, code, password } = body;
    await phoneValidator(phone);
    await passwordValidator(password);
    await codeValidator(code);
    const uuid = uuidv4();
    await prisma.user_login.create({
      data: {
        id: uuid,
        phone,
        password,
      },
    });
    await prisma.user_basis.create({
      data: {
        id: uuid,
        phone,
      },
    });
  };
  try {
    await apiCatchError(prisma, fn);
    return Response.json({
      code: 1,
      message: "注册成功",
      data: {
        accessToken: createAccessToken({})
      },
    });
  } catch (e) {
    return Response.json({
      code: 0,
      message: e,
    });
  }
}
