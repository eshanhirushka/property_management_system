import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    headscount: { type: Number, required: true },
    roomscount: { type: Number, required: true },
    dayscount: { type: Number, required: true },
    contactno: { type: Number, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    name: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const bookingModel = mongoose.model( 'Booking', BookingSchema );

export default bookingModel;