import mongoose from "mongoose";

interface Iuser{
    _id?: mongoose.Types.ObjectId,
    neam?: string,
    image?: string,
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,

}


const userSchema= new mongoose.Schema<Iuser>({
    neam:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    }

},{timestamps:true})

export const User=mongoose.models.User || mongoose.model('User',userSchema)