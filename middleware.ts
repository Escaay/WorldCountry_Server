import type { NextRequest } from 'next/server'
import { verifyToken, createToken } from './utils/authorization'
import authApiPath from './config/authApiPath'
import { NextResponse } from "next/server";
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

    const path = req.url.split('api')[1]
    // 需要鉴权的api
    if (authApiPath.indexOf(path) !== -1) {
        try {
            const requestHeaders = new Headers(req.headers)
            const [accessTokenPayload, refreshTokenPayload] = await verifyToken(req)
            requestHeaders.set('operatorId', accessTokenPayload.id as string)
            const response = NextResponse.next({
                request: {
                  // New request headers
                  headers: requestHeaders,
                },
              })
              // 如果验证了刷新token，就要签发新的token
            if (refreshTokenPayload) {
                response.headers.set(
                    "accessToken",
                    await createToken(accessTokenPayload)
                  );
                  response.headers.set(
                    "refreshToken",
                    await createToken(refreshTokenPayload)
                  );
            }
            // 修改了响应之后要返回response,不然修改不生效
            return response
        } catch (e) {
            console.log('e', e)
            // 如果验证失败，则重定向到发送失败信息的路由
            return Response.json({
              code: 401,
              message: 'token验证不通过'
          })
            // return NextResponse.rewrite(new URL('/api/authFailed', req.url))
        }
    }
}
