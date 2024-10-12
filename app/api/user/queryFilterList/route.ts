import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function POST(req: NextRequest) {
    const prisma = new PrismaClient();
    try {
    const body = await req.json();
    const filterInfo = body;
    // 最终的where, 判断传进来的是否是空对象，如果是空对象不能使用where: {OR: []},要用where: {}才能获取全部数据，OR为空数组不会获取任何数据
    let where;
    if (Object.keys(filterInfo).length === 0) {
      where = {};
    } else {
      for (const key in filterInfo) {
        if (
          !filterInfo[key] ||
          (Array.isArray(filterInfo[key]) && !filterInfo[key].length)
        )
          delete filterInfo[key];
      }
      const { maxAge, minAge } = filterInfo;
      delete filterInfo.customTags;
      delete filterInfo.maxAge;
      delete filterInfo.minAge;
      const filterWhere: typeof filterInfo = {};
      for (const key in filterInfo) {
        // 用contains判读来获取 例如 上海-全部 下面的所有人群，不能用equals
        if (
          key === "currentAddress" ||
          key === "originalAddress" ||
          key === "customTags"
        ) {
          filterWhere[key] = {
            array_contains: filterInfo[key].filter(
              (item: string) => item !== "全部"
            ),
          };
        } else {
          filterWhere[key] = {
            // 全部采用equals形式，避免json类型无法判断
            equals: filterInfo[key],
          };
        }
      }
      if (maxAge || minAge) {
        filterWhere.age = {};
        if (maxAge) filterWhere.age.lte = maxAge;
        if (minAge) filterWhere.age.gte = minAge;
      }
      // const filterWhereArr = customTags.map((item: string) => ({
      //   ...filterWhere,
      //   customTags: {
      //     array_contains: item,
      //   },
      // }));
      //   console.log('filterWhereArr', filterWhereArr)

      // where = {
      //   OR: [...filterWhereArr, filterWhere],
      // };

      where = filterWhere;
    }

    // 除了customTags是相关性排序，其他都是硬性指标必须完全一样
    // 查询
    const rows = await prisma.user_basis.findMany({
      where,
    });
    //   console.log('rows', rows)
    return Response.json({
      code: 200,
      message: "请求列表成功",
      data: rows,
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
