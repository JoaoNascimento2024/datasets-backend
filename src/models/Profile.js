import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    name: {type : String, required : [true, "Obrigatory field name"]},    
    permissions : [{type: mongoose.Schema.Types.ObjectId, ref: "Permission"}]
    },{versionKey : false,  timestamps : true}
);

const Profile = mongoose.model("Profile",profileSchema);
export default Profile;