import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const registerUser = async(req,res) => {
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.json({
                success:false,
                message:"Missing Details"
            })
        }
        const salt = await bcrypt.genSalt(10);  // salt is a random string added to a password before hashing it.
        const hashedPassword = await bcrypt.hash(password,salt);
        //      hashedPassword = await bcrypt.hash(password, 10);    // 2nd method to do the same
        const userData = {
            name,email,password:hashedPassword
        }
        // credit balance will be added due to default
        const newUser = new userModel(userData);
        const user = await newUser.save();
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);

        res.json({
            success:true,
            token,
            user:{name:user.name},

        })
    } catch(error){
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

const loginUser = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"User doesn't exist"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
            return res.json({
                success:true,
                token,
                user:{name:user.name},
                message:"User Logged in Successfully"
            })
        } else {
            return res.json({
                success:false,
                message:"Invalid credentials"
            })
        }
    }
    catch(error){
        console.log(error.message);
        res.json({
            success:false,
            message:error.message
        })
    }
}

const userCredits = async(req,res) => {
    try{
        const {userId} = req.body;

        const user = await userModel.findById(userId);
        res.json({
            success:true,
            credits:user.creditBalance,
            user:{name:user.name},
        })
    }
    catch(error){
        console.log(error.message);
        res.json({
            success:false,
            message:error.message
        })
    }
}
export { registerUser, loginUser ,userCredits};
