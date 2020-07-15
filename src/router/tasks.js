const express = require('express');
const router = new express.Router();
const Tasks = require('../models/tasks');
const auth = require('../middleware/auth')

// Read all tasks

router.get('/tasks',auth, async(req,res)=>{
    const match ={}
    const sort ={}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]]= parts[1]=== 'desc'? -1: 1
    }
    try{
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip:  parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send(e)
    }
})

// Read task by id
router.get('/tasks/:id',auth, async(req,res)=>{
    const _id = req.params.id;
    try{

    const task= await Tasks.findOne({_id, owner: req.user._id});
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

// Create tasks with authentication
router.post('/tasks', auth, async(req,res)=>{
    const tasks = new Tasks({
        ...req.body,
        owner: req.user._id
    })

    try{
        const task = await tasks.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }
})
// Update tasks by Id 
router.patch('/tasks/:id',auth, async(req,res)=>{
    const tasks = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];
    const isValidOperation = tasks.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!!'})
    }
    try{
        const taskUpdation = await Tasks.findOne({_id: req.params.id, owner: req.user._id});
       
        if(!taskUpdation){
            res.status(404).send();
        }
        tasks.forEach((update)=>taskUpdation[update] = req.body[update])
        await taskUpdation.save();
    
        res.status(200).send(taskUpdation)
    }catch(e){
        console.log(e);
        
        res.status(500).send(e)
    }

})

// delete tasks by id
router.delete('/tasks/:id', auth, async(req,res)=>{
    try{
        const task = await Tasks.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if(!task){
            res.status(404).send();
        } 
        res.send(task);
    }catch(e){
        res.status(500).send()
    }
})

module.exports= router;