require('./db/mongoose')
const express = require('express');
const app = express();
const port =process.env.PORT;
const userRouter = require('./router/user');
const taskRouter = require('./router/tasks');
// const jwt = require('jsonwebtoken');
// app.use((req,res,next)=>{
//     res.status(503).send('Site is under maintenance will be back soon :)');
// })

app.use(express.json())
app.use(userRouter);
app.use(taskRouter);

// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits:{
//         fileSize: 1000000
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb( new Error('Please upload a word file'))
//         }
//         cb(undefined, true)
//     }
// })
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// })

// const avatars = multer({
//     dest: 'avatars'
// })
// app.post('/users/me/avatar', avatars.single('avatar'), (req, res) => {
//     res.send()
// },(error,req,res,next)=>{
//     res.status(400).send({error: error.message})
// })

app.listen(port,()=>{
    console.log('App is up and running at port ', port);
    
});
