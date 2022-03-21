const Inventory = require("../model/InventoryModel");
const { inventoryValidation } = require("../validations/inventoryValidation");

//user ragistration function
const addInventory = async (req,res) => {
    
    //validate the user input fields
    const {error} = inventoryValidation(req.body);
    if(error) {
        res.send({message:error['details'][0]['message']});
    }

    //to check user already exist
    const inventoryExist = await Inventory.findOne({itemName: req.body.itemName});
    if(inventoryExist) {
        return res.status(400).send({message: "Item already exist"});
    }

    //assign data to the model
    const inventory = new Inventory({
        itemName: req.body.itemName,
        boughtDate: req.body.boughtDate,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        
    });
    
    try {
        //save the data in the database
        const savedInventory = await inventory.save();
        res.send(savedInventory);
    }
    catch(error) { //error handling
        res.status(400).send({message:error});
    }

}

const getInventory = async (req, res) => {
    try {
      const inventory = await Inventory.find();
      res.send(inventory);
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

module.exports = {
    addInventory,
    getInventory,
}; //export functions