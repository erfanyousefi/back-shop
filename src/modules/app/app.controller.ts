
import { BadRequestException, Body, Controller, Post, Req } from "@nestjs/common";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { Request } from "express";
import path, { join } from "path";
import { HistoryService } from "src/utility/history/history.service";
import { IErrorLocation } from "src/utility/history/interface/error.interface";
import CustomLogger from "src/utility/logger/module/custom.logger";
import { RedisService } from "src/utility/redis/redis.service";
import { testDto } from "./test.dto";

@Controller("/app")
export class AppController {
    constructor(
        private redisService: RedisService,
        private historyService: HistoryService,
        private customLog: CustomLogger,
    ) { }
    @Post("/")
    @ApiBody({ type: testDto })
    @ApiConsumes("application/x-www-form-urlencoded")
    async index(@Req() req: Request, @Body() body: testDto) {
        try {
            await this.redisService.setKeyNoExpire("user", "erfan usefi 26 nestjs")
            throw new BadRequestException()
            return await this.redisService.getKey("user")
        } catch (error) {
            const errorLocation: IErrorLocation = {
                filename: __filename,
                class_name: AppController.name,
                method_name: this.index.name
            }
            this.customLog.setErrorLog(req, error, errorLocation)
            throw error
        }
    }
}