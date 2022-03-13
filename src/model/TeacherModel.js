const mongoose = require('mongoose');

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
        
        address:{
          type: String,
          required: false,
        },

        phoneNumber: {
          type: [String],
          required: true,
        },

        email: {
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

        medium:{
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
              required : false,
            },

            Sinhala: {
              type: String,
              required : false,
            },

            Mathamatics: {
              type:String,
              required : false,
            },

            Science: {
              type:String,
              required : false,
            },

            English: {
              type:String,
              required : false,
            },

            History: {
              type:String,
              required : false,
            },

            Religion: {
              type:String,
              required : false,
            },

            Subject1: {
              type:String,
              required : false,
            },

            Subject2: {
              type:String,
              required : false,
            },

            Subject3: {
              type:String,
              required : false,
            }, 
        
          },

        AL_result:{
          year: {
              type: String,
              required : false,
            },

            Subject1: {
              type: String,
              required : false,
            },

            Subject2: {
              type:String,
              required : false,
            },

            Subject3: {
              type:String,
              required : false,
            },
          },

        classType:{
          type: String,
          required: true,
        },

        imageUrl:{
          type: String,
          required: true,  
        },
    
        feeExpectation:{
          type: String,
          required: false,    
        },

        isTeacher:{
          type: Boolean,
          default:true
        }
  },
  { timestamps: true },
);


module.exports = mongoose.model("Teacher", TeacherSchema);