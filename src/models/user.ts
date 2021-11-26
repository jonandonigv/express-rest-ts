import mongoose, { Schema } from 'mongoose';

/* export type UserDocument = mongoose.Document & {
    name: string;
    email: string;
    password: string;
    resetToken: string;
    resettokenExpiration: Date;
    cart: object;
}; */

const userSchema = new mongoose.Schema(
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

userSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex((cp: any) => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQuantity;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }

    const updatedCart = {
        items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
};

userSchema.methods.removefromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter( (item: any) => {
        return item.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
};

userSchema.methods.clearCart = function() {
    this.cart = { items: [] };
    return this.save();
};


export const User = mongoose.model("User", userSchema);