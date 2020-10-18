import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 61874,
    username: 'postgres',
    password: 'root',
    database: 'tasky',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}