const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));


app.get("/", (req,res)=>{
    res.render("index");
})

app.get("/read", async (req,res)=>{
    let user = await userModel.find();
    res.render("read",{users : user});
})
app.post("/create",async (req,res)=>{
    let {name,email,image} = req.body;
    let createdUser = await userModel.create({name,email,image})
    res.redirect("/read");
})
app.get("/edit/:userid", async (req, res) => {
    let user = await userModel.findById(req.params.userid); 
    res.render("edit", { user });
    
});
app.post("/update/:userid", async (req, res) => {
    let { name, email, image } = req.body;

    let user = await userModel.findOneAndUpdate(
        { _id: req.params.userid }, 
        { name, email, image }, 
        { new: true } 
    );

    res.redirect("/read");
    
});
app.get("/delete/:id", async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
   
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});