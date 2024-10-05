import { DataSource } from "typeorm"
import { DataSourceOptions } from "typeorm/browser"
/* typeorm数据库相关配置 */
const config: DataSourceOptions = {
      type: "mysql",
      host: 'sh-cynosdbmysql-grp-9ot7lke2.sql.tencentcdb.com', // 主机名
      // port: 3306,        // MySQL 默认端口为 3306
      port: 20669,        // MySQL 默认端口为 3306
      username: 'root',          // 使用 root 用户登入 MySQL
      password: 'Aays2790', // MySQL 密码，用你自己的
      database: 'worldcountry', // 使用数据库
}
export default config