const express=require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/routes.auth")
const { postrouter } = require("./routes/post.router")
const { auth } = require("./middleware/auth.middleware")
const cors=require("cors")

const app=express()
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)

app.use(auth)
app.use("/posts",postrouter)

app.listen(8080,async()=>{
    console.log("sever is running")
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log('somehing went wrong')
    }
   
})