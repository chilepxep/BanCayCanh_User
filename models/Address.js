import { Schema, models, model } from "mongoose"

const AddressSchema = new Schema({
    userEmail: { type: String, unique: true, requied: true },
    name: String,
    address: String,
    email: String,
    phone: String,
    day: String,
})

export const Address = models?.Address || model('Address', AddressSchema);