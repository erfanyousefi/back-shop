import { RedisModuleOptions } from "@liaoliaots/nestjs-redis";

export function getRedistConfig(host?: string, port? : number): RedisModuleOptions {
    return {
        config: {
            host: host ?? process.env.REDIS_HOST ?? 'localhost',
            port: port ?? process.env.REDIS_PORT ?? 6379,
        },
        errorLog: true
    }
}