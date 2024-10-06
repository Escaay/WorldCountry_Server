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
import { createToken } from "@/utils/authorization";
export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
    const id = uuidv4();
    const fn = async () => {
    const body: Register = await req.json();
    const { phone, code, password } = body;
    await phoneValidator(phone);
    await passwordValidator(password);
    await codeValidator(code);
    await prisma.user_login.create({
      data: {
        id,
        phone,
        password,
      },
    });
    await prisma.user_basis.create({
      data: {
        id,
        phone,
      },
    });
  };
  try {
    await apiCatchError(prisma, fn);
    return Response.json({
      code: 200,
      message: "注册成功",
      data: {
        accessToken: await createToken({id, type: 'access'}),
        refreshToken: await createToken({id, type: 'refresh'})
      },
    });
  } catch (e) {
    return Response.json({
      code: 400,
      message: e,
    });
  }
}
