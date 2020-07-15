const mongoose = require('mongoose');
const validator =require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Tasks = require('./tasks');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    age:{
        type: Number,
        validate(value){
            if(value<0){
              throw new Error('Age must be a positive number');
            }
        }
    },
    email:{
        type: String,
        required:true,
        unique: true,
        lowercase:true,
        trim: true,
        validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Email is invalid')
        }
    }},
    password:{
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value){
            if(value.includes("password")){
                throw new Error('Password shouldn\'t contain "password" literal')
            }
        }

    },
    token:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ],
    avatar:{
        type: Buffer
    }
},{
    timestamps: true
})

userSchema.virtual('tasks',{
    ref: 'Tasks',
    localField : '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject()

    delete userObject.password;
    delete userObject.token;
    delete userObject.avatar;

    return userObject;
}

userSchema.methods.generateAuthToken= async function(){
    const user = this
    const token = jwt.sign({_id :user._id.toString()}, process.env.JWT_SECRET);
    user.token = user.token.concat({token})
    await user.save()
    return token;
}


userSchema.statics.findbyCredentials = async(email, password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login');
    }
    return user
}   

// hashed password for users
userSchema.pre('save',async function(next){
    const user =this
    if(user.isModified('password')){
        user.password =await bcrypt.hash(user.password, 8)
    }
    
    next()

})
// delete tasks when user is deleted
userSchema.pre('remove',async function(next){
    const user =this
    await Tasks.deleteMany({owner: user._id})
    next()

})
const User =mongoose.model('User',userSchema)

module.exports =User
