const Hall = require("../model/HallModel");
const {HallValidation} = require("../validations/HallValidation");


// user Hall managementr function

const addHall = async(req,res) => {


    // validate the user input fileds
    
    const{error} = HallValidation(req.body);
    if(error){

        res.send({message : error["details"][0]["message"]});

    }
    // to check user already exist
    const HallExist = await Hall.findOne({hallnumber : req.body.hallnumber});
    if(HallExist){
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

module.exports ={
    addHall,
    getHall,
};



