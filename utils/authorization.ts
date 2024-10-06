import { timeStamp } from "console";
import * as jose from "jose";
import { NextResponse } from "next/server";

// const encodedSecret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
const encodedSecret = new TextEncoder().encode("qiuwenjing_secert");

export const createToken = async (payload: any) => {
  // 用时间戳让每一次签发的token不重复
  const signedToken = await new jose.SignJWT({
    payload,
    timeStamp: new Date().getTime(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(payload.type === "refresh" ? "1day" : "30day")
    .sign(encodedSecret);
  if (!signedToken) {
    return Promise.reject("创建token失败");
  }
  return signedToken;
};

// token过期无感刷新
// 这里需要把中间件获取的nextResponse传进来，不能在这里通过next()获取，那样添加不到headers里面
export const verifyToken = async (req: any, nextRes: NextResponse) => {
  const token =
    req.headers.get("authorization") || req.headers.get("Authorization");
  let decodedAccessToken, decodedRefreshToken;
  try {
    decodedAccessToken = await jose.jwtVerify(token, encodedSecret);
  } catch (err1) {
    try {
      // 尝试用刷新token
      const refreshToken = req.headers.get("X-Refresh-Token");
      decodedRefreshToken = await jose.jwtVerify(refreshToken, encodedSecret);
      // 如果刷新token通过了，那么签发新的accessToken和refreshToken，添加到响应头中
      nextRes.headers.append("accessToken", await createToken(decodedAccessToken?.payload))
      nextRes.headers.append("refreshToken", await createToken(decodedRefreshToken?.payload))
      } catch (err2) {
      return Promise.reject('token验证不通过')
    }
  }
};
