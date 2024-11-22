1. 云数据库需要配置安全组放开3306端口后才可以连接，云数据库连接的端口是控制台提供的，不是3306，3306是内网连接mysql的端口，提供给外网的接口不是

2. const axios = require('axios')
axios.post('http://localhost:9000/user/register', {
    userName: 'qiuwenjing'
}, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
如果不加上正确的header指定数据格式，那么服务端无法解析出正确的请求参数，会导致req.body为空

3. const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
使用bodyParser中间件，用来解析post请求体，req.body

4. mysql用await的方式返回的数据会报错，和callback返回的形式不一样，改用mysql2

5. restful api规范，一切以资源为准，url命名规范（url定位资源,相当于sql的where放在url），method规范，mysql表命名规范

6. 装饰器模式
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;
实际就是执行了个前置函数给类加了一些属性，注意语法

7. typeorm
需要开启ts的装饰器类型，ts.config.js中的 compilerOptions添加：
"experimentalDecorators": true,
"emitDecoratorMetadata": true,

8. prisma
- DATABASE_URL格式(mysql):   'mysql://user:password@host:port/dbName'
- prisma初始化映射到数据库
	npx prisma migrate dev --name init
- 后续更新
	npx prisma migrate dev
- 数据库可视化管理工具
	npx prisma studio
- 格式化和自动添加关系字段
	npx prisma format
- 生成客户端代码
  npx prisma generate(需要关闭服务，不然会提示拒绝没权限)
  （如果失败，检查有没有不符合要求的接口和文件）
- 关系映射
model user_basis {
  id              String  @unique
  phone           String?
  name            String?
  avatarURL       String?
  gender          String?
  age             String?
  vx              String?
  Aid             String
  originalAddress A[]
  currentAddress  C[]
  status          String?
  filterInfo      String?
  customTags      String?
  height          String?
  weight          String?
}

model A {
  id           String      @unique
  User_Basis   user_basis? @relation(fields: [user_BasisId], references: [id])
  cc C[]
  user_BasisId String?
}

model C {
  id           String      @unique
  user_basis user_basis? @relation(fields: [user_BasisId], references: [id])
  A A @relation(fields: [Aid], references: [id])
  Aid String
  user_BasisId  String?
}

9. apifox里面的数据模型是params参数模型，对应的是前端和后端的接口参数type定义，prisma模型对应的是数据库的类型，他们的定义不完全一样，有出入，比如传参不用传createTime，但是数据库里面需要存储createTime，此时type不需要定义，但是模型需要定义，type对应的是接口（前端-服务端），prisma对应的是（服务端-数据库），这里容易混淆

10. 装了uuid后引入飘红，就安装他的类型包，npm i @types/uuid --dev

11. 前后端都要做数据限制，但是他们的方法可以复用，例如passwordValidator

12. jwt在next下面会有冲突，因为next用的是一个轻量的运行时node引擎，要用jose库，还有在签发token的时候要把用户id传到payload中，用于验证时确认用户，还要把时间戳放到payload中让每次token不一样

13. 想要catch捕获promise的reject，就要await,例如
if (hasRegister) await Promise.reject('手机号已注册')

14. 如果修改了表结构，记得重启studio和服务端，不然容易报错，类型验证这一块

15. JSON格式在筛选的时候在where中不能直接写相等，要用equals,例如currentAddress: ['广东省', '清远市']会报错，要用
currentAddress: {
  equals: ['广东省', '清远市']
}

16. 前端axios对响应的统一判断是code === 200成功，对报错的处理是message,那么后端也要统一响应格式，例如
    return Response.json({
        code: 200,
        message: '请求列表成功',
        data: rows
    })

17. 阿里云云函数部署过程：
阿里云建立云函数，启动方法写npm run start，开启公网
把整个项目除了node_modules跟.next之外，压缩后部署到云函数
执行npm i安装依赖, 执行npm run build打包
打包成功后点击部署，然后当你调用接口，云函数就会自动执行npm run start然后响应（不用自己npm run start）
如果打包卡住不动，试试删除.next文件，日志服务是不需要的，因为可以自己把错误信息响应回去，用apifox调试
请求的时候不用在公网url后面加3000端口，直接请求url就行

18. 返回的报错信息不要乱写，如果不能各种情况写全面就写宽泛一些，免得误导自己，例如refreshToken通过后的重新签发，是createToken报错，但是自己返回的信息误导了自己，以为是验证错误

19. prisma操作完记得disconnect

20. 验证完路由还要验证用户权限，不能让a用户改了b用户的信息，特别是update操作，通过token解析出来的id存到req.headers中，然后在对应组件使用传过来的id和他要操作的id比较

21. 云函数部署websocket创建函数的时候要选web函数，不要选事件函数，然后执行命令写index.js，之后直接在index.js写开启服务的代码就行，一次websocket连接就相当于一次请求，后端服务代码和websocket代码分开两个云函数，因为ws协议和https协议不能占用同一个端口，但是其实可以在代码里面升级普通http请求为websocket请求

还有websocket的端口和服务要这样启动，和本地不一样（固定格式），不然跑不起来
const WebSocket = require('ws');
const axios = require('./utils/axios');
const WebSocketServer = WebSocket.Server;
const server = new WebSocketServer({
  host: "0.0.0.0",
  port: 9000
});

22. 设计表的时候，要从表中每个字段的取和读两个方向去考量如何分表分库，比如消息记录不能直接存成JSON，要每条消息都对应一条数据库的数据，这样写入比较快，读的时候可以findMany

23. prisma studio打不开的时候(开启模拟器会导致他打不开)， 查找端口5555：netstat -ano | findstr [端口号]，杀死端口程序：taskkill /F /PID [PID]，然后重启,可以用 npx prisma studio -p 5000

24. 阿里云云函数大概5分钟不用就会回收，大概3分钟预热一次就行，不用专门写接口，就设置一个定时触发器，他会热的

25. 减少云函数CU(转化计费单位): 
- 减少整个包的体积（减少内存使用量）
- websocket心跳检测，及时踢出断开的用户，避免资源浪费
- 谨慎使用函数预热功能，会消耗很多
- 能在客户端做的操作尽量在客户端做

26. queryMessagesByChatIds这个接口做到了1."初始化"，2."断线重连后获取最新消息"，3."懒加载历史聊天记录"三者的复用，通过参数take和skip可以复用这个接口，而且最重要是只要请求一次，是优化的典范, 对于2,未读数量就是take的数量，对于3，当前消息列表的数量就是skip的数量

27. chatList里面不能存用户的头像或者名称，要通过id关联起来，不然用户改头像之类的就获取不到，还是那句话，前端存的结构不一定等于表，也不一定等于接口返回的数据

28. 活动帖子和评论分开两张表存储，前端先请求活动列表，当用户点击去的时候，复用原来的活动帖子数据，然后单独请求评论信息，合并到活动数据中

29. 类似与点赞，评论这些不定长的数组，一定要分开多个表存储，这样在别的地方只展示点赞的时候才不用专门把关联的文章表拉下来，还因为不是JSON类型，方便做筛选和分页

30. 像likeNum这种还是要存储到article表里面的，不然每次请求都要去count有几条记录，因为查询的请求远大于更新的请求，还不如在点赞的时候更新article的likeNum和like表的记录，查询的时候更快