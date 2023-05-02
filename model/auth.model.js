
const mongoose=require("mongoose")

const authSchmea=mongoose.Schema({
    name: {type:String,required:true},
        email : {type:String,required:true},
        gender : {type:String,required:true},
        password : {type:String,required:true}
},{
versionKey:false
})
const ModelAuth=mongoose.model("post",authSchmea)
module.exports={
    ModelAuth
}