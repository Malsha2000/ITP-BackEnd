const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({

        examName: {
            type: String,
            required: true,
        },

        studentName: {
            type: String,
            required: true,
        },

        studentId: {
            type: String,
            required: true,
            unique: true,
        },

        marks: {
            type: Number,
            required: true,
        },

        subject: {
            type: String,
            required: true,
        },

        grade: {
            type: String,
            required: true,
        },
    },
    {timestamps: true},
);

module.exports = mongoose.model("Results", ResultSchema);