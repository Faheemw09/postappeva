const express=require("express")
const { ModelAuth } = require("../model/auth.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRouter=express.Router()

userRouter.get("/",(req,res)=>{
    res.send("home")
})

userRouter.post("/register",async(req,res)=>{
    const{email,password,name,gender}=req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            const user=new ModelAuth({email,name,gender,password:hash})
            await user.save()
            res.status(200).send("new user has been registred")
        })
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body
  
    try {
        const user=await ModelAuth.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token=jwt.sign({authorID:user._id},"masai")
                    res.status(200).send({"msg":"login sucessfull","token":token},)
                }else{
                    res.status(400).send({"msg":"wrong credentials"})
                }
               })
        }else{
            res.status(400).send({"msg":"wrong credentials"})
        }
     
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
module.exports={
    userRouter
}