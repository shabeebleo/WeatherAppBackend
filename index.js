const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const UserModel=require("./models/userModel")


const app=express()


app.use(express.json())
app.use(cors())


mongoose.connect("mongodb://localhost:27017/user");

app.post("/register",(req,res)=>{
    console.log(req.body,"req.bodyyy");
const newUser=new UserModel(req.body);
console.log(newUser);
newUser.save().then(savedUser => res.json(savedUser))
.catch(err => res.status(400).json({ error: err.message }));
})



app.post("/login", async (req, res) => { 
    console.log(req.body, "req.bodyyy login");
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            
            if (user.password === password) { 
                res.status(200).json("login successful");
            } else {
                res.status(400).json({ error: "incorrect password" });
            }
        } else {
            res.status(400).json({ error: "no such user" });
        }
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
});

app.listen(3001,()=>{
    console.log("server is running");
})