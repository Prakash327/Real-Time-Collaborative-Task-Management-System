import {Document, Schema,model,Model} from 'mongoose';

//define the User interface extending mongoose Document
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const User: Model<IUser> = model<IUser>('User', userSchema);
export default User;