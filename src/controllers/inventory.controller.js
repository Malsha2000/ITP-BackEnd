const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage('./scratch');
const Inventory = require("../model/InventoryModel");
const { inventoryValidation } = require("../validations/inventoryValidation");

//add inventory function
const addInventory = async (req,res) => {
    const validate = localStorage.getItem("isAdmin");

    if(validate === "true"){
    
    //validate the inventory input fields
    const {error} = inventoryValidation(req.body.data);
    if(error) {
        return res.send({message:error['details'][0]['message']});
    }
    console.log(req.body.data);

    //to check inventory already exist
    const inventoryExist = await Inventory.findOne({itemName: req.body.data.itemName});
    if(inventoryExist) {
        return res.status(400).send({message: "Item already exist"});
    }
    console.log("ok");
    //assign data to the model
    const inventory = new Inventory({
        itemName: req.body.data.itemName,
        boughtDate: req.body.data.boughtDate,
        quantity: req.body.data.quantity,
        price: req.body.data.price,
        
    });
    console.log(inventory);
    try {
        //save the data in the database
        console.log("success");
        const savedInventory = inventory.save();
        return res.send(savedInventory);
    }
    catch(error) { //error handling
        res.status(400).send({message:error});
        console.log(error);
    }

}
else {
    return res.status(403).json("You do not have permission to access this");
}
};

const getInventory = async (req, res) => {
    const validate = localStorage.getItem("isAdmin");

    if(validate == "true") {
    try {
      const inventory = await Inventory.find();
      res.send(inventory);
    } catch (error) {
      res.status(400).send({ message: error });
    }
  }
  else {
    return res.status(403).json("You do not have permission to access this");
}
};

  const updateInventory = async (req,res) => {
    const validate = localStorage.getItem("isAdmin");

    if(validate === "true") {

    const inventoryId = req.params.id;

    try {
        const inventory = await Inventory.findById(inventoryId);
        if(!inventory) {
            res.status(404).json("No Inventory Found");
        }

        const {itemName, boughtDate
            ,quantity, price} = req.body.data;
        const updatedInventory = await Inventory.findByIdAndUpdate(inventoryId, {itemName, boughtDate, quantity, price});

        res.status(200).json(updatedInventory);
    }
    catch(err) {
        res.status(400).send({message: err});
    }
}
else {
    return res.status(403).json("You do not have permission to access this");
}
};


const deleteInventory = async (req,res) => {
    const validate = localStorage.getItem("isAdmin");

    if(validate === "true") {
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
}
else {
    return res.status(403).json("You do not have permission to access this");
}
};

const getoneInventory = async (req, res) => {
    const validate = localStorage.getItem("isAdmin");

    if(validate === "true") {
    try {
      const inventory = await Inventory.findOne({ _id: req.params.id });
  
      if (!inventory) {
        res.status(404).json("Inventory Not Found");
      }
      res.status(200).json(inventory);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
  else {
    return res.status(403).json("You do not have permission to access this");
}
};

module.exports = {
    addInventory,
    getInventory,
    updateInventory,
    deleteInventory,
    getoneInventory,
}; //export functions