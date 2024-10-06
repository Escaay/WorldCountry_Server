import type { NextRequest } from 'next/server'
import { verifyToken } from './utils/authorization'
import authApiPath from './config/authApiPath'
import { NextResponse } from "next/server";
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

    const path = req.url.split('api')[1]
    // 需要鉴权的api
    if (authApiPath.indexOf(path) !== -1) {
        try {
            const response = NextResponse.next()
            await verifyToken(req, response)
            // 修改了响应之后要返回response,不然修改不生效
            return response
        } catch (e) {
            console.log('e', e)
            // 如果验证失败，则重定向到发送失败信息的路由
            return NextResponse.rewrite(new URL('/api/authFailed', req.url))
        }
    }
}
