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
