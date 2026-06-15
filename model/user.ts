import mongoose, { Document, Schema } from "mongoose";


interface IUser extends Document{
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    
}

const UserSchema  = new Schema<IUser>({
    userName:{
        type: String,
        require: true,
        unique:true
    },
    firstName:{
        type: String,
        require: true,
    },
    lastName:{
        type: String,
        require: true,
       
    },
    password:{
        type: String,
        require: true,
        minlength: 6
        
    },
})


UserSchema.


const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)