import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop({
        type: String,
        required: true,
        unique: true
    })
    userName: string

    @Prop({
        type: String,
        required: true
    })
    password: string

    @Prop({
        storedPasswords: [
            {
                password: {
                    type: String,
                    required: true,
                },
                title: {
                    type: String,
                }
            }
        ]
    })
    storedPasswords: Array<{
        password: string,
        title: string
    }>
}

export default SchemaFactory.createForClass(User);
export type UserDocument = User & Document;