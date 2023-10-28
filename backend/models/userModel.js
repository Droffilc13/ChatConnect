import mongoose from "mongoose"; 

const userSchema = mongoose.Schema(
    {
        name: {type:String, required:true},
        email: {type: String, required:true},
        password: {type: String, required:true},
        pic: {
            type:String, 
            required:true, 
            default: "../media/profile-user.png"
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;