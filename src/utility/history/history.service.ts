import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Request } from "express";
import { Model } from "mongoose";
import { IErrorLocation } from "./interface/error.interface";
import { History, HistoryDocument } from "./schema/history.schema";

@Injectable()
export class HistoryService {
    constructor(
        @InjectModel(History.name ) private historyRepository: Model<HistoryDocument>
    ){}
    async create(req: Request, error: Error & any, errorLocation: IErrorLocation) {
        const {body, params, query, path, url, ip, headers, cookies, statusCode, statusMessage} = req;
        const requestDetail = 
        {body, params, query, path, url, ip, headers, cookies, statusCode, statusMessage}
        await this.historyRepository.create({
            requestDetail,
            errorDetail: {...error},
            errorLocation
        })
    }
}