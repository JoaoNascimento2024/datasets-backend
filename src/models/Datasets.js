import { type } from "express/lib/response";
import mongoose from "mongoose";

const datasetSchema = new mongoose.Schema({
    id : {
        type : mongoose.Schema.Types.ObjectId,
        require : true
    },
    name : {
        type : String,
        minlength : 10,
        maxlength : 50,
        required: true,
        unique : true
        //match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    /*numColumns : {
        type : Number,
        min: 1,
        max: 20 
    },*/
    description : {
        type : String,
    },
    filePath : {
        type : String
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    /*columns : {
        type : Array
    }*/
}, 
//The propertie timestamp update timestamp to created and updated operations
{ timestamps : true });

const Datasets = mongoose.model("Datasets", datasetSchema);

export default Datasets;

