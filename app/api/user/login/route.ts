import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
// import type { UserLogin } from "@/type/user";
import { createToken } from "@/utils/authorization";
import {
  phoneValidator,
  passwordValidator,
  // codeValidator,
} from "@/utils/validators";
export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
try {
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
  if (row === null) {
    await Promise.reject('手机号未注册')
  }
  if (row?.password !== password) {
    await Promise.reject('密码错误')
  }
    return Response.json({
    code: 200,
    message: "登录成功",
    data: {
      id: row?.id,
      accessToken: await createToken({id: row?.id, type: 'access'}),
      refreshToken: await createToken({id: row?.id, type: 'refresh'})
    },
  });

}
    catch (e) {
      return Response.json({
        code: 400,
        message: e,
      });
    }
}
