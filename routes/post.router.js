const express=require("express")
const { Modelpost } = require("../model/post.model")
const postrouter=express.Router()


postrouter.post("/create",async(req,res)=>{
    try {
        const posts=new  Modelpost(req.body)
        await posts.save()
        res.status(200).send("added new post")
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})




postrouter.delete("/delete/:id",async(req,res)=>{
const {id}=req.params
const posts=await Modelpost.findOne({_id:id})
try {
    if(req.body.authorID!==posts.authorID){
        res.status(200).send("you are not authorized")
    }else{
        await Modelpost.findByIdAndDelete({_id:id})
        res.send("posts has been deleted")
    }
    
} catch (error) {
 res.send("error")   
}
})



postrouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    const posts=await Modelpost.findOne({_id:id})
    try {
        if(req.body.authorID!==posts.authorID){
            res.status(200).send("you are not authorized")
        }else{
            await Modelpost.findByIdAndDelete({_id:id},req.body)
            res.send("posts has been deleted")
        }
        
    } catch (error) {
     res.send("error")   
    }
    })


    // getrequest////

    postrouter.get("/",async(req,res)=>{
        try {
            const {device}=req.query
if(device){
    query.device=device
}
const post=await Modelpost.find(query)
res.status(200).json(post)
        } catch (error) {
            res.send("error")
        }

    })

    module.exports={
        postrouter
    }