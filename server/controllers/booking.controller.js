import Booking from '../mongodb/models/booking.js';
import User from '../mongodb/models/user.js';

import mongoose from "mongoose";
import * as dotenv from'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllBooking = async( req, res ) => {

    const { _end, _order, _start, _sort, title_like = "", packageType = "" } = req.query;

    const query = {};

    if(packageType !== '') {
        query.packageType = packageType;
    }

    if(title_like) {
        query.title = { $regex: title_like, $options: 'i' };
    }

    try{
        const count = await Booking.countDocuments({ query });

        const bookings = await Booking
        .find(query)
        .limit(_end)
        .skip(_start)
        .sort({ [_sort]: _order })

        res.header('x-total-count', count);
        res.header('Access-control-Expose-Headers', 'x-total-count');

        res.status(200).json(bookings);
    }catch(error){
        res.status(500).json({ message: error.message})
    }
};
const getBookingDetails = async( req, res ) => {
    const { id } = req.params;
    const bookingExists = await Booking.findOne({_id: id}).populate("creator");

    if(bookingExists) {
        res.status(200).json(bookingExists)
    }else{
        res.status(404).json({message: "Booking not Found"});
    }
};
const addBooking = async( req, res ) => {
    try{

        const { title, headscount, dayscount, roomscount, name, address, contactno, price, email } = req.body;
        
        //start a new session...
        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({email}).session(session);

        if(!user) throw new Error('User not Found');

        const newBooking = await Booking.create({
            title,
            price,
            headscount, 
            roomscount,  
            dayscount, 
            contactno, 
            address,
            name,
            creator: user._id,
        });

        user.allBooking.push(newBooking._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({message: 'Booking Completed Successfully'});
    } catch(error) {
        res.status(500).json({ message: error.message})
    }
};
const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, headscount, roomscount, dayscount, contactno, address, name } =
            req.body;

        await Booking.findByIdAndUpdate(
            { _id: id },
            {
                title,
                headscount,
                roomscount,
                dayscount,
                contactno,
                address,
                name,
            },
        );

        res.status(200).json({ message: "Booking changed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const bookingToDelete = await Booking.findById({ _id: id }).populate(
            "creator",
        );

        if (!bookingToDelete) throw new Error("Booking not found");

        const session = await mongoose.startSession();
        session.startTransaction();

        bookingToDelete.remove({ session });
        bookingToDelete.creator.allBooking.pull(bookingToDelete);

        await bookingToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Booking canceled successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllBooking,
    getBookingDetails,
    addBooking,
    updateBooking,
    deleteBooking,
}