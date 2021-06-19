const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const data = require('../products/products.json')
const User = require('../models/user')
const router = express.Router();

const db = "mongodb+srv://sahin_512:sahin123@cluster0.xvowe.mongodb.net/angulardb?retryWrites=true&w=majority";


mongoose.connect(db , (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('Database connected')
    }
})


router.get('/products' , (req,res)=>{
    res.status(200).send(data)
})

router.get('/products/:id' , (req,res)=>{
    const {id} = req.params.id;
    let item = data.brandProducts.filter((element)=>(element.id === id));
    if(item){
        res.status(200).send(item);
    }else{
        res.status(401).send('Product not found');
    }

})


router.post('/signup',(req,res)=>{
    let userData = req.body;
    User.findOne({email:userData.email} , (err , user)=>{
        if(err){
            console.log(err);
        }
        if(user){
            res.status(401).send('Email Already Present');
        }else{
            let user = new User(userData);
            user.save((err,registerUser)=>{
                if(err){
                    console.log(err);
                }else{
                    res.status(200).send(registerUser)
                }
            })
        }
    })
    
})


router.post('/login',(req,res)=>{
    const userData = req.body;
    User.findOne({email:userData.email} , (err,user)=>{
        if(err){
            console.log(err);
        }
        if(!user){
            res.status(401).send('Email Address not found!');
        }else{
            if(user.password !== userData.password){
                res.status(401).send('Wrong Password')
            }else{
                let payload = {subject:user._id}
                let token = jwt.sign(payload , 'secretKey');
                res.status(200).send({token})
            }
        }
    })
})




module.exports = router;