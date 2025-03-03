const mongoose = require("mongoose");
const { Schema } = mongoose;


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("Connected to mongodb");
  }
main().then( res =>{
    console.log("connection successful");
})
.catch(err =>{
    console.log("error while connecting to mongodb", err);
});
const User = new mongoose.Schema({
    first_name:
     {
         type : String,
     required: true
    },
    last_name:
     {
        type : String,
        required: true
    },
    gender :
     { type : String,
        required: true
    },
    timming: 
    {
        type: Date, 
        default: Date.now
    },
    vacant :
    {
        type: Number,
        required: true
    },
    state:
    {
        type: String,
        required: true
    },
    city : { 
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    age : { 
        type: Number,
        required: true
    },
    pin:{
        type:Number,
        required: true
    },
    
    budget:{
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
    ,
    room: { type: String, default: null },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ]
    
}); 



const Message = mongoose.model("Message", User);


module.exports = Message ;

 