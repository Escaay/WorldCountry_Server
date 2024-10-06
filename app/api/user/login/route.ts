import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { UserLogin } from "@/type/user";
import { apiCatchError } from "@/utils/apiCatchError";
import { createAccessToken } from "@/utils/authorization";
import {
  phoneValidator,
  passwordValidator,
  codeValidator,
} from "@/utils/validators";
import Error from "next/error";
import { access } from "fs";
export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const fn = async () => {
    const body = await req.json();
    // 后面再支持使用手机验证码登录
    const { phone, password } = body;
    await phoneValidator(phone);
    await passwordValidator(password);
    const row = await prisma.user_login.findFirst({
        where: {
            phone: phone
        }
    })
    if (row?.password !== password) return Promise.reject('密码错误')
  };
try {
  await apiCatchError(prisma, fn);
  return Response.json({
    code: 1,
    message: "登录成功",
    data: {
      accessToken: createAccessToken({})
    },
  });
}
    catch (e) {
      return Response.json({
        code: 0,
        messgae: e,
      });
    }
}
