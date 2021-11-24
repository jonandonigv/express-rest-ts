import mongoose, { Schema } from 'mongoose';

export type UserDocument = mongoose.Document & {
    name: string;
    email: string;
    password: string;
    resetToken: string;
    resettokenExpiration: Date;
    cart: object;
};

const userSchema = new mongoose.Schema<UserDocument>(
    {
        name: String,
        email: { type: String, required: true },
        password: { type: String, required: true },
        resetToken: String,
        resettokenExpiration: Date,
        cart: {
            items: [
                {
                    productId: {
                        type: Schema.Types.ObjectId,
                        ref: 'Product',
                        required: true
                    },
                    quantity: {type: Number, required: true}
                }
            ]
        }
    }
);

export const User = mongoose.model<UserDocument>("User", userSchema);