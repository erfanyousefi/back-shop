
import { Injectable } from '@nestjs/common';
import CreateLogDto from './dto/createLog.dto';
import { HistoryDocument, History } from 'src/utility/history/schema/history.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express-serve-static-core';
import { IErrorLocation } from 'src/utility/history/interface/error.interface';

@Injectable()
export default class LogsService {
  constructor(
    @InjectModel(History.name) private historyRepository: Model<HistoryDocument>
  ) { }

  async saveErrorLog(req: Request, error: Error & any, errorLocation: IErrorLocation) {
    const { body, params, query, path, url, ip, headers, cookies, statusCode, statusMessage } = req;
    const requestDetail =
      { body, params, query, path, url, ip, headers, cookies, statusCode, statusMessage }
    return await this.historyRepository.create({
      requestDetail,
      errorDetail: { ...error },
      errorLocation
    })
  }
}