import type { NextRequest } from 'next/server'
import { verifyToken } from './utils/authorization'
import authApiPath from './config/authApiPath'
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const path = req.url.split('api')[1]
    // 需要鉴权的api
    if (authApiPath.indexOf(path) !== -1) {
        try {
            await verifyToken(req)
        } catch (e) {
            // 如果验证失败直接返回
            return Response.json({
                code: 401,
                messgae: 'token验证不通过'
            })
        }
    }
}
