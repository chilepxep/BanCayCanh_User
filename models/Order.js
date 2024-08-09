const { Schema, model, models } = require("mongoose");

const OrderSchema = new Schema({
    userEmail: String,
    line_items: Object,
    name: String,
    address: String,
    email: String,
    phone: String,
    note: String,
    paid: Boolean,
}, { timestamps: true, });

export const Order = models?.Order || model('Order', OrderSchema);