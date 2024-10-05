// 对prisma操作数据库的函数进行包装，附加错误处理
export default async (prisma: any, fn: (...args: any[]) => any) => {
    try {
        throw new Error('错误')
        const res = await fn()
        await prisma.$disconnect()
        return res
    } catch (e) {
        console.error('prismaErrorCatch', e)
        await prisma.$disconnect()
        return e
    }
}