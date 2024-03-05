//import mongoos

const mongoose=require('mongoose')


//get connection string from .env.DATABASE

const connectionString =process.env.DATABASE;


//connect mongoose 

mongoose.connect(connectionString).then((res)=>{
console.log("MongoDB connect success");
}).catch((err)=>{ 
    console.log(`MongoDB connection err due to ${err}`);
})