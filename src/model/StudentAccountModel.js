const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        birthday: {
            type: Date,
            required: true,
        },

        NIC: {
            type: String,
            required: false,
        },

        phoneNumber: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        school: {
            type: String,
            required: true,
        },

        grade: {
            type: String,
            required: true,
        },

        medium: {
            type: String,
            required: true,
        },

        parentName: {
            type: String,
            required: true,
        },

        parentPhoneNumber: {
            type: String,
            required: true,
        },

        parentEmail: {
            type: String,
            required: false,
        },

        studentGender: {
            type: String,
            required: true,
        },

        parentAddress: {
            type: String,
            required: true,
        },

        parentOccupation: {
            type: String,
            required: true,
        },

        imageURL: {
            type: String,
            required: false,
        },

        subject: {
            type: [String],
            required: true,
        },

        teacher: {
            type: [String],
            required: true,
        },

        OL_Year: {
            type: String,
            required: false,
        },

        AL_Year: {
            type: String,
            required: false,
        },

        username: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        isStudent: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Student", StudentSchema);
