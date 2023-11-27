 const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override')
const { v4 : uuidv4 } = require("uuid")

app.use(express.urlencoded({extended:true}));
app.use("/posts",express.static(path.join(__dirname,"public")));
app.use("/new",express.static(path.join(__dirname,"public")));
app.use("/edit",express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'))

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


let posts = [
    {
        username: "alice",
        content: "Just had a great day at the beach! 🌞🏖️",
        id: "6f24a621-98c1-4a7e-89b8-1e1d89472e01"
    },
    {
        username: "bob",
        content: "New favorite book alert! 📚 Loving this thriller novel.",
        id: "f10587f3-42f8-4f45-9d1b-ea3bfb05e5d2"
    },
    {
        username: "carol",
        content: "Trying out a new recipe tonight - homemade pizza! 🍕",
        id: "a3e598cb-8d4d-4be5-9e49-dce0ce9432ef"
    },
    {
        username: "dave",
        content: "Exploring the beautiful countryside on my bike 🚴‍♂️",
        id: "bb3eb6a9-c4b9-44b8-8b53-0ef7c7e1e42d"
    },
    {
        username: "emma",
        content: "Just adopted a cute puppy! 🐶 Meet Fluffy!",
        id: "1cda03ff-df3a-4f5a-af27-5e3ac7b5b3f6"
    },
    {
        username: "frank",
        content: "Learning a new language - Spanish lessons are fun! 🇪🇸",
        id: "83436d28-95cb-4e9c-9090-0a3a087be1a1"
    },
    {
        username: "grace",
        content: "Weekend getaway to the mountains! 🏔️",
        id: "52eac32c-944a-4d41-a6cb-58d475d8efea"
    },
    {
        username: "harry",
        content: "Exciting news: I'm starting a new job next week!",
        id: "eb9531e9-e8e3-4951-b2f3-2ee0d2bf842d"
    },
    {
        username: "irene",
        content: "Celebrating my birthday with friends tonight! 🎉🎂",
        id: "fa6bda1a-9d2a-4f2e-a7ce-45f83f5b1dd9"
    },
    {
        username: "jack",
        content: "Watching the sunset by the ocean - pure serenity. 🌅🌊",
        id: "c59d6ee3-1b85-4fcf-b3f0-6f10869219bf"
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})

app.get("/posts/:id",(req,res)=>{
    const id = req.params.id;
    res.render("post.ejs",{
        post:posts.filter(post=>post.id==id)[0]
    })
})

app.post("/posts",(req,res)=>{
    let resp = req.body;
    resp.id= uuidv4();
    posts.push((resp));
    res.redirect("/posts");
})

app.get("/new",(req,res)=>{
    res.render("new.ejs",{posts})
})

app.get("/edit/:id",(req,res)=>{
    const id = req.params.id;
    res.render("edit.ejs",{
        post:posts.filter(post=>post.id==id)[0]
    })
})

app.delete("/posts/:id",(req,res)=>{
    posts=posts.filter(post=>!(post.id===req.params.id))
    res.redirect("/posts")
})

app.patch("/posts/:id",(req,res)=>{
    const id = req.params.id;
    console.log(req.body);
    posts = (posts.map(post=>{
        if (post.id==id){
            post.content=req.body.content;
            return post;
        } else{
            return post;
        }
    }));
    res.redirect("/posts")
})

const port = 3000;
app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
})