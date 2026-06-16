import bcrypt from "bcrypt";
import mongoose, { Document, Schema } from "mongoose";


interface IUser extends Document{
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    confirmPassword?: string;
    
}

const UserSchema  = new Schema<IUser>({
    userName:{
        type: String,
        require: true,
        unique:true,
        trim: true
    },
    firstName:{
        type: String,
        require: true,
        trim: true
    },
    lastName:{
        type: String,
        require: true,
        trim: true
       
    },
    password:{
        type: String,
        require: true,
        minlength: 6,
        trim: true
        
    },
})

UserSchema.virtual("confirmPassword")
.set(function (value){
    (this as any)._confirmPassword = value
})
.get(function (){
   return (this as any)._confirmPassword
})

UserSchema.pre("save", async function (){
    if(!this.isModified("password")){
        return ;
    }
    const salt = await bcrypt.genSalt(10)
    this.password  = await  bcrypt.hash(this.password, salt)
})

UserSchema.pre("validate", async function (){
    if(this.confirmPassword !== this.password){
        this.invalidate("confirmPassword", "Password didnt match")
    }
})

UserSchema.methods.comaprePassword = async function (candidatePass: string){
    return bcrypt.compare(candidatePass,this.password )
}


export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)