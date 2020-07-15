const mongoose = require('mongoose');
const TasksSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User'
    }
},{
    timestamps: true
})

const Tasks =mongoose.model('Tasks',TasksSchema)

module.exports =Tasks
