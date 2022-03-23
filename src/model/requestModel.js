const mongoose = require('mongoose');

const RequestSchema =  new mongoose.Schema(
  {

        requestTitle: {
          type: String,
          required: true,
        },    

        teacherName: {
            type: String,
            required: true,
          },    

        Date: {
          type: String,
          required: true,
        },

        time: {
          type: String,
          required: true,
        },

        description: {
          type: String,
          required: true,
          unique: true,
        },

       
  },
  { timestamps: true },
);


module.exports = mongoose.model("Request", RequestSchema);