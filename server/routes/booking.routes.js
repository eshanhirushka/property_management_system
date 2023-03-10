import express from "express";

import { addBooking, deleteBooking, getAllBooking, updateBooking, getBookingDetails } from "../controllers/booking.controller.js";
import { getAllProperties } from "../controllers/property.controller.js";

const router = express.Router();

router.route('/').get(getAllBooking);
router.route('/:id').get(getBookingDetails);
router.route('/').post(addBooking);
router.route('/:id').patch(updateBooking);
router.route('/:id').delete(deleteBooking);
router.route('/').get(getAllProperties);

export default router;