const mongoose = require("mongoose");
 

const HallSchema = new.mongoose.Schema({

    hallnumber:{

        type : string,
        required : true,
    },

    floornumber : {

        type : Number,
        required : true,
    },

    capacity:{

        type : Number,
        required : true,

    },

    AC :{

        type : Boolean,
        required : true,
    },


},
 
{timestamps: true}

);

module.exports = mongoose.model("Hall",HallSchema);