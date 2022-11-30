import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class ErrorLocation {
    @Prop({type: Object})
    filename: any
    @Prop({type: Object})
    method_name: any
    @Prop({type: Object})
    class_name: any
}
export type ErrorLocationDocument = ErrorLocation & Document;
export const ErrorLocationSchema = SchemaFactory.createForClass(ErrorLocation)