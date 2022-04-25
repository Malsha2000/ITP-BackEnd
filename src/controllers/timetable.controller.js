const Timetable = require("../model/TimetableModels");
const { timetableValidation } = require("../validations/timetableValidation");

//add timetable function
const addTimetable = async (req,res) => {
    const validate = localStorage.getItem("isAdmin");

    if(validate === "true"){
    
    //validate the timetable input fields
    const {error} = timetableValidation(req.body);
    if(error) {
        res.send({message:error['details'][0]['message']});
    }

    //to check timetable already exist
    const timetableExist = await Timetable.findOne({subject: req.body.subject});
    if(timetableExist) {
        return res.status(400).send({message: "Subject already exist"});
    }

    //assign data to the model
    const timetable = new Timetable({
        subject: req.body.subject,
        grade: req.body.grade,
        teacherName: req.body.teacherName,
        hallNumber: req.body.hallNumber,
        date: req.body.date,
        time: req.body.time,
        classType: req.body.classType,
        medium: req.body.medium,
        floorNumber: req.body.floorNumber,
    });
    
    try {
        //save the data in the database
        const savedTimetable = await timetable.save();
        res.send(savedTimetable);
    }
    catch(error) { //error handling
        res.status(400).send({message:error});
    }

}
else {
    return res.status(403).json("You do not have permission to access this");
}
};

const getTimetable = async (req, res) => {
    const validate = localStorage.getItem("isAdmin");

    if(validate == "true") {
    try {
      const timetable = await Timetable.find();
      res.send(timetable);
    } catch (error) {
      res.status(400).send({ message: error });
    }
  }
  else {
    return res.status(403).json("You do not have permission to access this");
}
};


  const updateTimetable = async (req,res) => {
    const validate = localStorage.getItem("isAdmin");

    if(validate === "true") {

    const timetableId = req.params.id;

    try {
        const timetable = await Timetable.findById(timetableId);
        if(!timetable) {
            res.status(404).json("No Timetable Found");
        }

        const {subject, grade
            , teacherName
            ,hallNumber, date, time, classType, medium, floorNumber} = req.body;
        const updatedTimetable = await Timetable.findByIdAndUpdate(timetableId, {subject, grade
            , teacherName
            ,hallNumber, date, time, classType, medium, floorNumber});

        res.status(200).json(updatedTimetable);
    }
    catch(err) {
        res.status(400).send({message: err});
    }
}
else {
    return res.status(403).json("You do not have permission to access this");
}
};

const deleteTimetable = async (req,res) => {
    const validate = localStorage.getItem("isAdmin");

    if(validate === "true") {
    const timetableId = req.params.id;

    try {
        const timetable = await Timetable.findById(timetableId);

        if(!timetable) {
            res.status(404).json("Timetable Not Found");
        }

        const deletedTimetable = await Timetable.findByIdAndDelete(timetableId);
        res.status(200).json("Timetable Deleted");
    }
    catch(err) {
        res.status(400).json(err.message);
    }
}
else {
    return res.status(403).json("You do not have permission to access this");
}
};


const getoneTimetable = async (req, res) => {
    const validateTeacher = localStorage.getItem("isTeacher");
    const validateStudent = localStorage.getItem("isStudent");
    const validateAdmin = localStorage.getItem("isAdmin");

    if(validateTeacher === "true" || validateStudent === "true" || validateAdmin === "true") {
    try {
      const timetable = await Timetable.findOne({ _id: req.params.id });
  
      if (!timetable) {
        res.status(404).json("Timetable Not Found");
      }
      res.status(200).json(timetable);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
  else {
    return res.status(403).json("You do not have permission to access this");
}
};

  

module.exports = {
    addTimetable,
    getTimetable,
    updateTimetable,
    deleteTimetable,
    getoneTimetable,
}; //export functions