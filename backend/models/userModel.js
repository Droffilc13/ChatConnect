import mongoose from "mongoose"; 
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
    {
        name: {
            type:String, 
            required:true
        },
        email: {
            type: String, 
            required:true
        },
        password: {
            type: String, 
            required:true
        },
        pic: {
            type:String,
            default: "../media/profile-user.png"
        }
    },
    {
        timestamps: true
    }
);

userSchema.methods.matchPassword = async function(inputPassword) {
    console.log("Matching Password")
    const truthValue = await bcrypt.compare(inputPassword, this.password);
    console.log(truthValue);
    return truthValue;
}


userSchema.pre('save', async function (next) {
    if (!this.isModified()) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(this.password, salt);
    this.password = encryptedPassword;
    next();
})

const User = mongoose.model("User", userSchema);

export default User;