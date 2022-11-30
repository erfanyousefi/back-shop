import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { model } from "mongoose";
import { IErrorDetail, IErrorLocation } from "../interface/error.interface";
import { IRequestDetai } from "../interface/request.interface";
import { ErrorLocation } from "./error-location.schema";
import { ErrorDetail } from "./error.schema";
import { RequestSchema } from "./request.schema";


@Schema({timestamps: true})
export class History {
    // [x:string]: [y: any]
    @Prop({type: RequestSchema})
    requestDetail?: IRequestDetai
    @Prop({type: ErrorDetail})
    errorDetail?: IErrorDetail
    @Prop({type: ErrorLocation})
    errorLocation?: IErrorLocation

}

export type HistoryDocument = History & Document;
export const HistorySchema = SchemaFactory.createForClass(History)
export const HistoryModel = model(History.name, HistorySchema, "histories");