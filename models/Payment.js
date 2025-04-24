import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
    name: { type: String, required: true },
    to_user: { type: String, required: true },
    message: { type: String },
    transaction_uuid: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: Boolean, default: false }

    });

 
export default mongoose.models.Payment || model("Payment", PaymentSchema);;

