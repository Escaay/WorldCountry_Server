import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
export async function POST(req: NextRequest) {
    const body = await req.json()
    const prisma = new PrismaClient()
    const {filterInfo} = body
    // console.log(filterInfo)
    for (let key in filterInfo) {
        if (!filterInfo[key] || (Array.isArray(filterInfo[key]) && !filterInfo[key].length)) delete filterInfo[key]
    }
    // console.log(filterInfo)
    const {customTags = [], maxAge, minAge} = filterInfo
    delete filterInfo.customTags
    delete filterInfo.maxAge
    delete filterInfo.minAge
    const filterWhere = {...filterInfo}
    if (maxAge || minAge) {
        filterWhere.age = {}
        if (maxAge) filterWhere.age.lte = maxAge
        if (minAge) filterWhere.age.gte = minAge
    }
    console.log(filterWhere)
    const filterWhereArr = customTags.map((item: string) => ({
        ...filterWhere,
        customTags: {
            string_contains: item
        }
    }))
    // 除了customTags是相关性排序，其他都是硬性指标必须完全一样
    const rows = await prisma.user_basis.findMany({
        where: {
            OR: [...filterWhereArr, filterWhere]
        }
    })
    return Response.json(rows)
}