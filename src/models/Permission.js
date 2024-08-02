import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    name: {type : String, required : [true, "Obrigatory field name"]},
    description: {type : String},
    key: {type : String}    
    },{versionKey : false,  timestamps : true}
);

const Permission = mongoose.model("Permission",permissionSchema);
export default Permission;