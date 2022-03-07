const mongoose = require("mongoose");


const TutorialSchema = new mongoose.Schema({

    tutorialName:{
        type: String,
        required: true,
    },

    subject:{
        type: String,
        required: true,
    },

    grade:{
        type: String,
        required: true,
    },

    teacherName:{
        type: String,
        required: true,
    },

    lessonName:{
        type: String,
        required: true,
    },

    link:{
        type:String,
        required: true,
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Tutorial", TutorialSchema);