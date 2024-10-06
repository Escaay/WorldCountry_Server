import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { UserLogin } from "@/type/user";
import { apiCatchError } from "@/utils/apiCatchError";
import { createToken } from "@/utils/authorization";
import {
  phoneValidator,
  passwordValidator,
  codeValidator,
} from "@/utils/validators";
import { timeStamp } from "console";
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
    return row?.id
  };
try {
  const id = await apiCatchError(prisma, fn);
    return Response.json({
    code: 200,
    message: "登录成功",
    data: {
      accessToken: await createToken({id, type: 'access'}),
      refreshToken: await createToken({id, type: 'refresh'})
    },
  });
}
    catch (e) {
      return Response.json({
        code: 400,
        messgae: e,
      });
    }
}
