import mongoose from "mongoose";

const datasetSchema = new mongoose.Schema({
    id : {
        type : mongoose.Schema.Types.ObjectId
    },
    name : {
        type : String,
        minlength : 1,
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
        type : String,
        required : [true, "Not file sended"]
    },
    /*
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
    },

    columns : {
        type : Array
    }*/
}, 
//The propertie timestamp update timestamp to created and updated operations
{ timestamps : true });

const Datasets = mongoose.model("Datasets", datasetSchema);

export default Datasets;
