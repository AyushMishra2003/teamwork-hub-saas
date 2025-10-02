import { model, Schema } from "mongoose";


const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,

        },
        password: {
            type: String,
            required: true,
            select: false,
        }
    },
    {
        timestamps: true
    }
)


const UserModel = model("CRM-USER", userSchema)

export default UserModel