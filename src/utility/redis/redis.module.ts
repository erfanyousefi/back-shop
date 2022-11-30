import { Module } from "@nestjs/common";
import { RedisModule as Redis,  } from "@liaoliaots/nestjs-redis"
import { getRedistConfig } from "src/config/database/redis.config";

@Module({
    imports: [Redis.forRoot(getRedistConfig())],
    providers: [],
    exports: []
})
export class RedisModule {}