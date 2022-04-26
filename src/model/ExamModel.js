const mongoose = require("mongoose");


const ExamSchema = new mongoose.Schema({

    examName: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    subject: {
        type: String,
        required: true,
    },

    grade: {
        type: String,
        required: false,
    },

    teacherName: {
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

    duration: {
        type: String,
        required: true,
    },
},
{timestamps: true}
);

module.exports = mongoose.model("Exam", ExamSchema);