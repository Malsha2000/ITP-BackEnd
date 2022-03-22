
const Hall = require("../model/HallModel");
const { HallValidation } = require("../validations/hallValidation");


// user Hall managementr function

const addHall = async(req,res) => {


    // validate the user input fileds
    
    const{ error } = HallValidation(req.body);
    if(error){

        res.send({message : error["details"][0]["message"]});

    }
    // to check user already exist
    const hallExist = await Hall.findOne({hallnumber : req.body.hallnumber});
    if(hallExist){
        return res.status(400).send({message : "Hall already exist"});
    
    }
    // asign data to the hall

    const hall = new Hall({

        hallnumber : req.body.hallnumber,
        floornumber: req.body.floornumber,
        capacity:req.body.capacity,
        AC:req.body.AC,
    });

    try{
        // save the data in the database
        const savedHall = await hall.save();
        res.send(savedHall);
    }catch(error){
            //error handling
            res.status(400).send({message:error});
    }
};    
  
const getHall = async(req,res) =>{
    try{
        const hall = await Hall.find();
        res.send(hall);
        
    }catch(error){
        res.status(400).send({message: error});

    }

};

const updateHall = async(req,res) => {

    const hallId = req.params.id;
    try {

        const hall =await Hall.findById(hallId);
        if(!hall){

            res.status(404).json("No Hall found");
       }

       const{
       hallnumber,
       floornumber,
       capacity,
       AC,
       } = req.body;

     const updateHall = await Hall.findByIdAndUpdate(hallId,{
         hallnumber,
         floornumber,
         capacity,
         AC,
        });
        res.status(200).json(updateHall);
    }
catch(err) {
    res.status(400).send({message: err});
}

};

const deleteHall = async(req,res) => {
    const hallId = req.params.id;

    try{
        const hall = await Hall.findById(hallId);
    

    if(!hall){

        res.status(404).json("hall not found");
     }
     const deleteHall = await Hall.findByIdAndDelete(hallId);
     res.status(200).json(deleteHall);
    }catch(err){
        res.status(400).json(err.message);
    }
};

const getoneHall = async (req, res) => {
    try {
      const hall = await Hall.findOne({ _id: req.params.id });
  
      if (!hall) {
        res.status(404).json("Hall Not Found");
      }
      res.status(200).json(hall);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
module.exports = {
    addHall,
    getHall,
    updateHall,
    deleteHall,
    getoneHall,
}; // export function






    










