const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const TeacherSchema =  new mongoose.Schema(
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
        
        address:{
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

        teacherGender: {
          type: String,
          required: true,
        },

        higerQulification:{
          type: String,
          required: true,

        },

        subject: {
            type: String,
            required: true,

        },

        meadium:{
            type: String,
            required: true,


        },

        experienceYear:{
            type: String,
            required: true,


        },

        OL_result:{
            year: {
              type: String,
            },

            Sinhala: {
              type: String,
            },

            Mathamatics: {
              type:String,
            },

            Science: {
              type:String,
            },

            English: {
              type:String,
            },

            History: {
              type:String,
            },

            Religion: {
              type:String,
            },

            Subject1: {
              type:String,
            },

            Subject2: {
              type:String,
            },

            Subject3: {
              type:String,
            },  
          },

        AL_result:{
          year: {
              type: String,
            },

            Subject1: {
              type: String,
            },

            Subject2: {
              type:String,
            },

            Subject3: {
              type:String,
            },


          },

        classType:{
          type: [String],
          required: true,

        },

        ImageURL:{
          type: String,
          required: true,  

        },
    
        feeExpectation:{
          type: String,
          required: true,    

        },

        isTeacher:{
          type: Boolean,
          required: true,

        }


  },
  { timestamps: true }

);
module.exports = mongoose.model("Teacher", TeacherSchema);
