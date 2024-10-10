import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
export async function POST(req: NextRequest) {
    const body = await req.json()
    // console.log('body', body)
    const prisma = new PrismaClient()
    const filterInfo = body
    for (const key in filterInfo) {
        if (!filterInfo[key] || (Array.isArray(filterInfo[key]) && !filterInfo[key].length)) delete filterInfo[key]
    }
    const {customTags = [], maxAge, minAge} = filterInfo
    delete filterInfo.customTags
    delete filterInfo.maxAge
    delete filterInfo.minAge
    const filterWhere: typeof filterInfo = {}
    for (const key in filterInfo) {
        filterWhere[key] = {
            // 全部采用equals形式，避免json类型无法判断
            equals: filterInfo[key]
        }
    }
    if (maxAge || minAge) {
        filterWhere.age = {}
        if (maxAge) filterWhere.age.lte = maxAge
        if (minAge) filterWhere.age.gte = minAge
    }
    // console.log(filterWhere)
    const filterWhereArr = customTags.map((item: string) => ({
        ...filterWhere,
        customTags: {
            string_contains: item
        }
    }))
    // 最终的where, 判断传进来的是否是空对象，如果是空对象不能使用where: {OR: []},要用where: {}才能获取全部数据，OR为空数组不会获取任何数据
    const where = Object.keys(filterWhere).length !== 0 ? {
        OR: [...filterWhereArr, filterWhere]
    } : {}
    // 除了customTags是相关性排序，其他都是硬性指标必须完全一样
    const rows = await prisma.user_basis.findMany({
        where
    })
    // console.log('rows', rows)
    return Response.json({
        code: 200,
        message: '请求列表成功',
        data: rows
    })
}