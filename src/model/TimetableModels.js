const mongoose = require("mongoose");


const TimetableSchema = new mongoose.Schema({

    subject: {
        type: String,
        required: true,
    },

    grade: {
        type: String,
        required: true,
    },

    teacherName: {
        type: String,
        required: true,
    },

    hallNumber: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    time: {
        type: String,
        required: true,
    },

    classType: {
        type: String,
        required: true,
    },

    medium: {
        type: String,
        required: true,
    },

    floorNumber: {
        type: Number,
        required: true,
    },
},
{timestamps: true}
);

module.exports = mongoose.model("Timetable", TimetableSchema);