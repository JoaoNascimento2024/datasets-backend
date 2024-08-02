import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type : String, required : [true, "Obrigatory field username"]},    
    email : {type: String, required: [true, "Obrigatory field email"], unique : [true, "Email already"], match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
    password : {type : String, required : [true, "Obrigatory field password"]},
    profile : {type : mongoose.Schema.Types.ObjectId, ref : "Profile"}},
    {versionKey : false,  timestamps : true}
);

const User = mongoose.model("User",userSchema);
export default User;