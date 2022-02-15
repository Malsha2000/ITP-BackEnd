const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
        itemName: {
            type: String,
            required: true,
        },

        boughtDate: {
            type: Date,
            required: true,
        },

        imageUrl: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Inventory", InventorySchema);