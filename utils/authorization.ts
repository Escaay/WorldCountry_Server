import * as jose from "jose";
import { NextResponse } from "next/server";

// const encodedSecret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
const encodedSecret = new TextEncoder().encode("qiuwenjing_secert");

export const createToken = async (payload: any) => {
  // 用时间戳让每一次签发的token不重复
  const timeStamp = new Date().getTime();
  const signedToken = await new jose.SignJWT({
    ...payload,
    timeStamp,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(payload.type === "access" ? "1day" : "7days")
    .sign(encodedSecret);
  if (!signedToken) {
    return Promise.reject("创建token失败");
  }
  return signedToken;
};

// token过期无感刷新
export const verifyToken = async (req: any) => {
  const accessToken =
    req.headers.get("authorization") || req.headers.get("Authorization");
  // console.log('accessToken', accessToken)
  try {
    const decodedAccessToken = await jose.jwtVerify(accessToken, encodedSecret);
    // 防止refreshToken登录
    if (decodedAccessToken.payload.type !== "access")
      await Promise.reject("token类型错误");
    return [decodedAccessToken.payload]
    // decodedAccessTokenErr就是token解析后的对象，多了一个错误信息的字段
  } catch (decodedAccessTokenErr: unknown) {
    const decodedAccessToken = decodedAccessTokenErr as {
      payload: { type: string; id: string};
    };
    try {
      // 尝试用刷新token
      const refreshToken = req.headers.get("X-Refresh-Token");
      const decodedRefreshToken = await jose.jwtVerify(
        refreshToken,
        encodedSecret
      );
      // 如果刷新token通过了，那么签发新的accessToken和refreshToken，添加到响应头中
      return [decodedAccessToken.payload, decodedRefreshToken.payload]
    } catch (err2) {
      return Promise.reject("token验证不通过");
    }
  }
};
