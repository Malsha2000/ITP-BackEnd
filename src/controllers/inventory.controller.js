const Inventory = require("../model/InventoryModel");
const { inventoryValidation } = require("../validations/inventoryValidation");

//add inventory function
const addInventory = async (req,res) => {
    
    //validate the inventory input fields
    const {error} = inventoryValidation(req.body);
    if(error) {
        res.send({message:error['details'][0]['message']});
    }

    //to check inventory already exist
    const inventoryExist = await Inventory.findOne({itemName: req.body.itemName});
    if(inventoryExist) {
        return res.status(400).send({message: "Item already exist"});
    }

    //assign data to the model
    const inventory = new Inventory({
        itemName: req.body.itemName,
        boughtDate: req.body.boughtDate,
        imageUrl: req.body.imageUrl,
        quantity: req.body.quantity,
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

  const updateInventory = async (req,res) => {

    const inventoryId = req.params.id;

    try {
        const inventory = await Inventory.findById(inventoryId);
        if(!inventory) {
            res.status(404).json("No Inventory Found");
        }

        const {itemName, boughtDate
            , imageUrl,quantity, price} = req.body;
        const updatedInventory = await Inventory.findByIdAndUpdate(inventoryId, {itemName, boughtDate, imageUrl, quantity, price});

        res.status(200).json(updatedInventory);
    }
    catch(err) {
        res.status(400).send({message: err});
    }
};

const deleteInventory = async (req,res) => {
    const inventoryId = req.params.id;

    try {
        const inventory = await Inventory.findById(inventoryId);

        if(!inventory) {
            res.status(404).json("Inventory Not Found");
        }

        const deletedInventory = await Inventory.findByIdAndDelete(inventoryId);
        res.status(200).json("Inventory Deleted");
    }
    catch(err) {
        res.status(400).json(err.message);
    }
};

module.exports = {
    addInventory,
    getInventory,
    updateInventory,
    deleteInventory,
}; //export functions