import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { type Register } from "@/type/user";
import { v4 as uuidv4 } from "uuid";
import {
  passwordValidator,
  phoneValidator,
  // codeValidator,
} from "@/utils/validators";
import { createToken } from "@/utils/authorization";
export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  try {
    const id = uuidv4();
    const body: Register = await req.json();
    const { phone, password } = body;
    // 格式校验
    await phoneValidator(phone);
    await passwordValidator(password);

    //暂时注释，后续开通
    // await codeValidator(code);

    // 手机号是否已注册
    const hasRegister = !!(await prisma.user_login.findFirst({
      where: {
        phone,
      },
    }));
    if (hasRegister) await Promise.reject("手机号已注册");
    await prisma.user_login.create({
      data: {
        id,
        phone,
        password,
      },
    });
    const initUserBasis = {
      data: {
        id,
        phone,
        name: "新村民",
        avatarURL: "",
        gender: "男",
        age: 18,
        originalAddress: ["广东省", "深圳市", "全部"],
        currentAddress: ["广东省", "深圳市", "全部"],
        status: ["自由"],
        customTags: ["初出茅庐"],
        filterInfo: {},
        filterConds: ['gender', 'minAge', 'maxAge', 'originalAddress', 'currentAddress', 'status', 'customTags']
      },
    }
    const initChatList: any[] = []
    await prisma.user_basis.create(initUserBasis);
    await prisma.chat_list.create({
      data: {
        id,
        body: initChatList,
      },
    });
    return Response.json({
      code: 200,
      message: "注册成功",
      data: {
        accessToken: await createToken({ id, type: "access" }),
        refreshToken: await createToken({ id, type: "refresh" }),
        myInfo: initUserBasis,
        chatList: initChatList
      },
    });
  } catch (e) {
    return Response.json({
      code: 400,
      message: e,
    });
  } finally {
    prisma.$disconnect();
  }
}
