const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');

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

        password: {
          type: String,
          required: true,
        },

        confirmPassword: {
          type: String,
          required: true,
        },

        birthday: {
          type: Date,
          required: true,
        },

        NIC: {
          type: String,
          required: true,
        },
        
        address:{
          type: String,
          required: true,

        },

        phoneNumber: {
          type: [String],
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

        },


  },
  { timestamps: true },
);

//genarate jwt
TeacherSchema.methods.genarateAuthToken = () => {
  const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, { expiresIn: "7d"});
  return token;
}
const Teacher = mongoose.model("Teacher", TeacherSchema);
//validation

const validate =(data) => {
  const Schema = joi.object({
        firstName : joi.string().required().label("First Name"),
        lastName : joi.string().required().label("Last Name"),
        password : joi.string() .required().label("Password"),
        confirmPassword : joi.string(). required().label("Comfirm Password"),
        birthday : joi.string().required().label("Birth day"),
        NIC : joi.string().required().label("NIC"),
        address : joi.string().required().label("Address"),
        phoneNumber : joi.array().items(joi.string().required.label("Phone Number")),
        email : joi.string().required().label("Email"),
        teacherGender : joi.string().required().label("Gender"),
        higerQulification : joi.string().required().label("Qulification"),
        subject : joi.string(). required().label("Subject"),
        meadium : joi.string().required().label("Meadium"),
        experienceYear : joi.string().required().label("Experience Year"),
        classType : joi.string().required().label("Class type"),
        ImageURL : joi.string().required().label("Image"),
        feeExpectation : joi.string().required().label("Fee expectation"),
        isTeacher : joi.boolean().required().label("IsTeacher"),
  });
  return schema.validate(data);

}
  module.exports = {Teacher, validate};