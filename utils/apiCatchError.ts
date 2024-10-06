export const apiCatchError = async (prisma: any, fn: (...args: any[]) => any) => {
    try {
        // 统一前置处理
        const res = await fn()
        await prisma.$disconnect()
        return res
    } catch (e: any) {
        // 统一错误处理
        await prisma.$disconnect()
       return Promise.reject(e)
    }
}