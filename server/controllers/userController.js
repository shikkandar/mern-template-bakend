const User =require("../models/userModel");
const bcrypt= require("bcryptjs")

const create =async(req,res)=>{
    
    try {
        const {name ,email ,password} =req.body;

        //Check the user exist
        let user =await User.findOne({email})
        if (user) {
            return res.status(400).json({msg:"User already exists"})
        };

        //Create a new user
        user=new User({name ,email,password})

        //Hash password
        const salt =await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt)

        await user.save()
        res.status(201).json({ msg: "User registered successfully." });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
};
const list =async(req,res)=>{
    try {
        let user = await User.find().select("name email updated created")
        res.json(user)
    } catch (err) {
        return res.status(400).json({error:err})
    }
};
const userById =(req,res)=>{};
const read =async(req,res)=>{
    try {
        const userId =req.params.userId;
        let user =await User.findById(userId)
        if (!user) {
            return res.status(400).json({error:"User not found"})
        }
        res.status(200).json(user)
    } catch (err) {
        return res.status(400).json({error:err})
    }
};
const update =async(req,res)=>{
    try {
        const {name ,updated= Date.now()}=req.body;
        await User.findByIdAndUpdate(req.params.userId ,{name ,updated})
        return res.status(200).json({ meassage:"Sucessfully Updated"});
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error")
    }
};
const remove =async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.userId)
        return res.status(200).json({ meassage:"Sucessfully deleted"});
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error")
    }
};

module.exports= {create,list,userById,read,update,remove} 