declare namespace NodeJS{
    interface ProcessEnv {
        NODE_ENV: string;
        // mongodb
        MONGO_HOST: string;
        MONGO_PORT: number;
        MONGO_DATABSE: string;
        MONGO_USERNAME: string;
        MONGO_PASSWORD: string;
        // typeorm
        DB_HOST: string;
        DB_PORT: number;
        DB_DATABSE: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;
        // redis
        REDIS_PORT: number;
        REDIS_HOST: string;
        REDIS_USERNAME: string;
        REDIS_PASSWORD: string;
        // swagger
        SWAGGER_USERNAME: string;
        SWAGGER_PASSWORD: string;

        // application
        PORT: number
    }
}