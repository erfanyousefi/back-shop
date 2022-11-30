import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class RequestDetail {
    @Prop({type: Object})
    query: any
    @Prop({type: Object})
    params: any
    @Prop({type: Object})
    body: any
    @Prop({type: Object})
    headers: any
    @Prop({type: Object})
    path: any
    @Prop({type: Object})
    url: any
    @Prop({type: Object})
    ip: any
    @Prop({type: Object})
    cookies: any
    @Prop({type: Object})
    statusCode: any
    @Prop({type: Object})
    statusMessage: any
}
export type RequestDocument = RequestDetail & Document;
export const RequestSchema = SchemaFactory.createForClass(RequestDetail)