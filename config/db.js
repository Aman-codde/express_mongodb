import mongoose from "mongoose";

export default async function connectDB(){
    // error handling
    try {
        await mongoose
        .connect('mongodb://localhost:27017/usersDB');
        console.log('Connected to mongodb')
    }
    catch(err){
        console.log("Error connecting to mongodb ",err)
    }
}




