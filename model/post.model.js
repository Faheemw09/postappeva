const mongoose=require("mongoose")

const postSchmea=mongoose.Schema({
    title: {type:String,required:true},
        body : {type:String,required:true},
        authorID:{type:String,required :true},
     device : {type:String,enum:["PC", "TABLET", "MOBILE"],required:true},
       
},{
versionKey:false
})
const Modelpost=mongoose.model("user",postSchmea)
module.exports={
    Modelpost
}