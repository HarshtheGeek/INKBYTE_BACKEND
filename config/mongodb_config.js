require('dotenv').config();
const mongoose = require('mongoose'); 

//Trying to make connection
const DatabaseConnection = async (req,res) =>{
    try{

        if(!process.env.MONGO_DB_URL){
            console.log("MONGO_DB_URL is not defined in the environment variables");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("The connection with the database has been made successfully");

        process.on('SIGINT',async()=>{
            await mongoose.disconnect();
            console.log("The connection has been terminated");
            process.exit(0);
        })
    }
    catch(error){
        console.error("The error in connecting to the database :",error);
        process.exit(1); 
    }
}

//Exporting the module
module.exports = DatabaseConnection ; 