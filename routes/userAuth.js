const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require("../models");
const User = db.user;
const Role = db.role;
const jwt = require('jsonwebtoken');



router.post('/signup',(req,res)=>{
    const {
        userName,
        email,
        password,
        phone,
        role } = req.body;
    if(!email || !password || !userName || !phone || !role){
        return res.status(400).json({error:"all fileds are required"})
    }
    User.findOne({where:{ email: email }}).then((user) => {
        if(user){
            return res.status(400).json({error:"user already exists"})
        }
    bcrypt.hash(password,10).then(hashedpassword=>{
            User.create({
                email,
                password:hashedpassword,
                userName,
                phone,
                role
            }).then((user) => {
                res.status(201).json({data:user,message:'created'});
            })
        })
    }).catch((err) =>{return res.status(401).json(err.message)})
})



router.post('/login',(req,res)=>{
    const {email,password} = req.body
    console.log(email,password)
    if(!email|| !password){
        return res.status(422).json({error:"please enter a valid email or password"})
    }
    User.findOne({where:{email: email }}).then((user)=>{
        if(!user){
            return res.status(422).json({message:"invalid email or password"})
        }
        bcrypt.compare(password,user.password).then(doMatch=>{
            if(doMatch){
                // return res.status(200).json({message:"sucessfully logged in "})
                const token = jwt.sign({_id: user.id,},"secret",{expiresIn:'1h'});
                const {_id,userName,email,role,phone} = user;
                res.json({token,saveduser:{_id,userName,email,role,phone}})
            }
            else{
                return res.status(422).json({message:"invalid email or password"})
            }
        })
    }).catch(err=>{
        return res.status(400).json(err.message)
    })
})

module.exports = router