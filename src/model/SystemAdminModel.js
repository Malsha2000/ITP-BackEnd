const mongoose = require("mongoose");


const SystemAdminSchema = new mongoose.Schema(
    {

    firstName: {
        type: String,
        required: true,
    },
  
    lastName: {
        type: String,
        required: true,
    },

    NIC: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: true,
    },
},
{timestamps: true}
);

module.exports = mongoose.model("SystemAdmin", SystemAdminSchema);