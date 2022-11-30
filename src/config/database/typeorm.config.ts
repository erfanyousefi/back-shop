import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { NodeEnviorment } from "src/common/enums/global.enum";
import "src/config/global/enviorment.config"
import { DataSource, DataSourceOptions } from "typeorm";
export function getTypeOrmOptions(): TypeOrmModuleOptions {
    const { NODE_ENV, DB_DATABSE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env;
    const option: TypeOrmModuleOptions =
        NODE_ENV == NodeEnviorment.DEV ?
            {
                type: "postgres",
                host: DB_HOST,
                port: DB_PORT,
                database: DB_DATABSE,
                username: DB_USERNAME,
                password: DB_PASSWORD,
                entities: [`${__dirname}/../../**/**/**/**/*.entity{.js,.ts}`],
                synchronize: true,
            } :
            {
                type: "postgres",
                host: DB_HOST,
                port: DB_PORT,
                database: DB_DATABSE,
                username: DB_USERNAME,
                password: DB_PASSWORD,
                entities: [`${__dirname}/../../**/**/**/**/*.entity{.js,.ts}`]
            }
    return option
}
export const AppDataSource: DataSource = ((): DataSource => {
    const { NODE_ENV, DB_DATABSE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env;
    const option: DataSourceOptions =
        NODE_ENV == NodeEnviorment.DEV ?
            {
                type: "postgres",
                host: DB_HOST,
                port: DB_PORT,
                database: DB_DATABSE,
                username: DB_USERNAME,
                password: DB_PASSWORD,
                entities: [`${__dirname}/../../**/**/**/**/*.entity{.js,.ts}`],
                synchronize: true,
            } :
            {
                type: "postgres",
                host: DB_HOST,
                port: DB_PORT,
                database: DB_DATABSE,
                username: DB_USERNAME,
                password: DB_PASSWORD,
                entities: [`${__dirname}/../../**/**/**/**/*.entity{.js,.ts}`]
            }
    return new DataSource(option)
})();