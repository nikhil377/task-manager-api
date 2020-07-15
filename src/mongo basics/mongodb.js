const { MongoClient,ObjectID} =  require('mongodb');

// localhost:mongoDB port
const connectionURL= 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// callback containing will execute only when connection happens at given connectionURL
MongoClient.connect(connectionURL, {useUnifiedTopology:true},  (error,client)=>{
    if(error){
       return console.log('Unable to connect to database');
        
    }
// even if we don't create db, mongodb will create one for us

    const db =client.db(databaseName);

    // Create document

    // db.collection('users').insertOne({
    //     name: 'Arora',
    //     age : '23'
    // },(error,result)=>{
    //     if(error){
    //         console.log('unable to insert user');
            
    //     }
    //     // ops prints the documents that we have in database
    //     console.log(result.ops);
    // }) ;       

        // Create document

    // db.collection('users').insertMany([
    //     {
    //         name: 'Nikhil',
    //         age : '23'
    //     },
    //     {
    //         name: 'Joey',
    //         age : '33'
    //     },
        
    // ],(error,result)=>{
    //     if(error){
    //         console.log('unable to insert user');
    //     }
    //     // ops prints the documents that we have in database
    //     console.log(result.ops);
    // }) ;   

        // Create document

//  db.collection('tasks').insertMany([
//         {
//             description: 'Inserting the document first time',
//             status: true
//         },
//         {
//             description: 'Completed the NodeJS ?',
//             status: false
//         },
//         {
//             description: 'Will you complete the NodeJS ?',
//             status: true
//         }
        
//     ],(error,result)=>{
//         if(error){
//             console.log('unable to insert user');
//         }
//         // ops prints the documents that we have in database
//         console.log(result.ops);
//     }) ;  


    // Read document 

    // db.collection('users').findOne({_id: new ObjectID("5eac129f9934b844d7d82f14")},(error,user)=>{
    //     if(error){
    //         console.log('Unable to find user');
    //     }
    //     console.log(user);
        
    // });
    // db.collection('users').find({name:'Nikhil'}).toArray((error,user)=>{
    //     if(error){
    //         console.log('Unable to find user');
    //     }
    //     console.log(user);
        
    // });
    // db.collection('users').find({name:'Nikhil'}).count((error,count)=>{
    //     if(error){
    //         console.log('Unable to find user');
    //     }
    //     console.log(count);
        
    // });

    // Read document 

    // db.collection('tasks').findOne({_id: new ObjectID("5eace623cf713a5190a9b9a4")},(error,user)=>{
    //     if(error){
    //         console.log('Unable to find user');
    //     }
    //     console.log(user);
    //     console.log("+++++++++++++++++++++++++");
        
        
    // });
    // db.collection('tasks').find({status:false}).toArray((error,user)=>{
    //     if(error){
    //         console.log('Unable to find user');
    //     }
    //     console.log(user);
        
    // });

    // Update one

    // db.collection('users').updateOne({_id: new ObjectID("5eac14819d1b19450a747a4c")},
    // {
    //     $set:{
    //         name : 'Andrew'
    //     }
    // }).then((result)=>{
    //     console.log('Name successfully changed to--> ', result);

    // }).catch(()=>{
    //     console.log('Not able to change name check your connection');
    // })

    // Update

    // db.collection('users').updateMany({name: 'Bohemia'},
    // {
    //     $set:{
    //         name : 'Mike'
    //     }
    // }).then((result)=>{
    //     console.log('Name successfully changed to--> ', result);

    // }).catch(()=>{
    //     console.log('Not able to change name check your connection');
    // })

    db.collection('users').deleteMany({ name : 'Mike'}).then((result)=>{
        console.log('Name successfully changed to--> ', result);

    }).catch(()=>{
        console.log('Not able to change name check your connection');
    })

    db.collection('tasks').deleteMany({ description : 'Inserting the document first time'}).then((result)=>{
        console.log('Name successfully changed to--> ', result);

    }).catch(()=>{
        console.log('Not able to change name check your connection');
    })


});
