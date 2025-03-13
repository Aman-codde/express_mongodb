import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

const PORT = 5000;

const app = express();

app.use(express.json())

connectDB();


//define schema and model
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    userId: Number,
})

const User = mongoose.model('User',userSchema)

//routes

//(Create) create new user/s
app.post('/users',async (req,res) => {
    try{
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(500).json({message:"Error creating user" ,error: error.message});
    }
});

// (Read all)get all users
app.get('/users',async (req,res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
});

//(Read one) get user by id
app.get('/users/:id',async (req,res) => {
    try {
        const {id} = req.params;
        const numericId = Number(id);
        const user = await User.findOne({userId: numericId});
        if(!user){
            return res.status(404).json('User Not Found')
        }
        res.status(200).json({user})
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})

//update
app.put('/users/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const numericId = Number(id);
        const updtaedUser = await User.findOneAndUpdate(
            { userId: numericId },
            req.body,
            {new : true}
        );
        if(!updtaedUser){
            return res.status(404).json('User Not Found')
        }
    }
    catch(err){
        
    }
})

//delete



app.get('/', (req,res) => {
    res.json('Hello world!');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

/*
const users = await User.find();
        const bulkOps = users.map((user,index) => ({
            updateOne: {
                filter: { _id : user._id},
                update: {$set: {userId: index+1}}
            }
        }))
        const result = await User.bulkWrite(bulkOps);
        console.log(result)
*/