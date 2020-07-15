const express = require('express');
const router = new express.Router();
const User= require('../models/user');
const auth = require('../middleware/auth')
require('../models/user')
const multer = require('multer')
const sharp = require('sharp');
const {sendWelcomeEmail,sendCancellingEmail} = require('../emails/account'); 
// Create a user
router.post('/users', async(req,res)=>{
    const user = new User(req.body);
    
    try{
        await user.save();
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token});
    } catch(e){
        res.status(400).send(e);
    }
});


// login via user and generate token 
router.post('/users/login',async(req,res)=>{

    try{
        const user = await User.findbyCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token});
    }catch(e){
        res.status(400).send('');
    }

})

// Get all users
router.get('/users',auth,async(req,res)=>{
   res.send(req.user)
})

// logout user
router.post('/users/logout',auth, async(req,res)=>{

    try{
       req.user.token = req.user.token.filter((token)=>{
         
        return token.token !==req.token 
       })
       await req.user.save();
       res.send()
    }catch(e){
        res.status(500).send();
    }

})
// logout all the sessions of user
router.post('/users/logoutAll',auth, async(req,res)=>{

    try{
       req.user.token = [];
       await req.user.save();
       res.send()
    }catch(e){
        res.status(500).send();
    }

})


// Update user by Id 
router.patch('/users/me', auth,async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!!'})
    }
    try{
        updates.forEach((update)=>req.user[update] = req.body[update])

        await req.user.save();
        res.status(200).send(req.user)
    }catch(e){
        console.log(e);
        
        res.status(500).send(e)
    }

})
// Delete User by Id
router.delete('/users/me', auth, async(req,res)=>{
    try{
        await req.user.remove()
        sendCancellingEmail(req.user.email, req.user.name)
        res.send(req.user);
    }catch(e){
        res.status(500).send()
    }
})

// Uploading avatar picture

const avatars = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return cb( new Error('Please upload a img file'))
        }
        cb(undefined, true)
    }
})


// setting up the avatar image
router.post('/users/me/avatar',auth,  avatars.single('avatar'), async(req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
     req.user.avatar =buffer;
    await req.user.save();
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

// deleting the avatar image
router.delete('/users/me/avatar',auth, async(req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})


// converting binary avatar to normal image to view
router.get('/users/:id/avatar', async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-type', 'image/png');
        res.send(user.avatar);
    }catch(e){
        res.status(404).send();
    }
    
});




module.exports= router;