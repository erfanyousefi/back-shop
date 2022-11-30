import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class ErrorDetail {
    @Prop({type: Object})
    message?: any
    @Prop({type: Object})
    stack?: any
    @Prop({type: Object})
    context?: any
    @Prop({type: Object})
    code?: any
    @Prop({type: Object})
    status?: any
    @Prop({type: Object})
    level?: any
}
export type ErrorDocument = ErrorDetail & Document;
export const ErrorSchema = SchemaFactory.createForClass(ErrorDetail)