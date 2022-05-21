
const { date } = require("joi");
const mongoose = require("mongoose");


const EventSchema = new mongoose.Schema({

    eventName: {
        type: String,
        required: true,
    },

    eventDate: {
        type: String,
        required: true,
    },

    tags: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    time: {
        type: String,
        required: true,
    },

    Venue: {
        type: String,
        required: true,
    },

},
{timestamps: true}
);

module.exports = mongoose.model("Event", EventSchema);