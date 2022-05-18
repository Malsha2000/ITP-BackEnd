const TeacherRequest = require("../model/requestModel");
const { requestValidation } = require("../validations/requestValidation");


//user ragistration function
const addRequest = async (req, res) => {
    //validate the user input fields
    const { error } = requestValidation(req.body.data);
    if (error) {
      res.send({ message: error["details"][0]["message"] });
    }
  
    //to check user already exist
    const requestExist = await TeacherRequest.findOne({ requestTitle: req.body.data.requestTitle });
    if (requestExist) {
      return res.status(400).send({ message: "Requst already exist" });
    }
  
    //assign data to the model
    console.log("ok");
    const teacherRequest = new TeacherRequest({
        requestTitle: req.body.data.requestTitle,
        teacherName: req.body.data.teacherName,
        Date: req.body.data.Date,
        time: req.body.data.time,
        description: req.body.data.description,
    });
    console.log("teacherRequest");
    console.log(teacherRequest);
    try {
      //save the data in the database
      console.log("success");
      const savedRequest =  teacherRequest.save();
       return res.send(savedRequest);
    } catch (error) {
      //error handling
       return res.status(400).send({ message: error });
    }
  };
  
  const getRequest = async (req, res) => {
    try {
      const request = await TeacherRequest.find();
      res.send(request);
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };
  
  const updateRequest = async (req, res) => {
    const requestId = req.params.id;
  
    try {
      console.log("ok");
      const request = await TeacherRequest.findById(requestId);
      if (!request) {
        res.status(404).json("No Request Found");
      }
  
      const {
        requestTitle,
        teacherName,
        Date,
        time,
        description,
    
      } = req.body.data;
      const updatedRequest = await TeacherRequest.findByIdAndUpdate(requestId, {
        requestTitle,
        teacherName,
        Date,
        time,
        description,
      });
  
      res.status(200).json(updatedRequest);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  };
  
  const deleteRequest = async (req, res) => {
    const requestId = req.params.id;
  
    try {
      const request = await TeacherRequest.findById(requestId);
      if (!request) {
        res.status(404).json("Request Not Found");
      }
  
      const deletedRequest = await TeacherRequest.findByIdAndDelete(requestId);
      res.status(200).json(deletedRequest);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
  
  
  const getoneRequest = async (req, res) => {
    try {
      const request = await TeacherRequest.findOne({ _id: req.params.id });
      if (!request) {
        res.status(404).json("Request Not Found");
      }
      res.status(200).json(request);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
  
  module.exports = {
    addRequest, 
    getRequest, 
    updateRequest, 
    deleteRequest,
    getoneRequest,
  }; //export functions
   