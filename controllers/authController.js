import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const getAll=async(req,res,next)=>{
    try {
        const get=await User.find()
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}

export const getByToken=async(req,res,next)=>{
    try {
        const get=await User.findById({_id:req.user.id})
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}

export const register = async (req, res, next) => {
    try {
        // let user=await User.findOne({ema})
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const find=await User.findOne({email:req.body.email})
        if(find){
            res.status(401).json({message:"Email already exists"});
        }else{
            const newUser = new User({
                name:req.body.name,
                department:req.body.department,
                email:req.body.email,
                password:hash
            });
    
            await newUser.save();
            res.status(201).json({message:"User has been created."});
        }
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const user=await User.findOne({email:req.body.email})
        if (user) {
            const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)
            if (!isPasswordCorrect) return res.status(400).json({message:"password wrong"});
            

            const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
            //its used for not show admin and password
            //...otherDetails is  mongoose function first two value ignore and balance value in otherDetails
            const {password , isAdmin , ...otherDetails} = user._doc
            //user._doc is used  for one purpose commend and run it
            res.header("token",token)
            .status(200).json({isAdmin,token}); 
        } else {
           return  res.status(404).json({message:"User not found"}); 
        }
    } catch (err) {
        next(err);
    }
};

export const deleteUser= async (req,res,next)=>{
    try {
        await  User.findOneAndDelete({email:req.body.email})
        res.status(200).json({message:"User has been deleted."});
    } catch (error) {
        next(error);
    }
}

export const deleteUserByDept= async (req,res,next)=>{
    try {
        await  User.findOneAndDelete({department:req.body.department})
        res.status(200).json({message:"User has been deleted."});
    } catch (error) {
        next(error);
    }
}

export const getUser= async(req,res,next)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const changePassword=async(req,res,next)=>{
    let saltRounds=10;
    bcrypt.hash(req.body.newpassword,saltRounds,async(err,hash)=>{
        let update=await User.findOneAndUpdate({_id:req.user.id},{password:hash},{new:true})
        if(update){
            try {
                res.send(update)
            } catch (error) {
                res.send(error.message)
            }
        }else{
            res.send("student not found")
        }
    })
}