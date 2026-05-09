const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const port = 3000;



  const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });



  const userSchema=new mongoose.Schema(
    {
    name:{
      type:String,
      required:[true,"Name is required"],
      minlength:[3,"Name must be at least 3 characters long"],
      maxlength:[50,"Name must be at most 50 characters long"]
    },
    age:{
      type:Number,
      required:[true,"Age is required"],
      min:[0,"Age must be a positive number"],
      max:[120,"Age must be a valid age"]
    },
    isActive:{
      type:Boolean,
      default:true
    },
    hobbies:{
      type:[String],
       validate:{
        validator:(arr)=> arr.length<=5,
          message:"Hobbies cannot exceed 5 items"
        },
      },
        location:{
          city:{
            type:String,
            required:[true,"City is required"]
          },
          country:{
            type:String,
            required:[true,"Country is required"]
          }
        },
        score:[Number],
        metadata:{
type:mongoose.Schema.Types.Mixed
        },
        email:{
          type:String,
          required:[true,"Email is required"]
  },
  role:{
    type:String,
    enum:{
      values:["admin","user"],
      message:"Role must be either 'admin' or 'user'"
    },
    default:"user"
    },
    }
  ,
  {timestamps:true}
  )

  const User= mongoose.model("User",userSchema);

  User.create({
    name:"John Doe",
    age:30,
    hobbies:["reading","gaming"],
    isActive:true,
    location:{
      city:"New York",
      country:"USA"
    },
    score:[85,90,95],
    metadata:{browser:"Chrome",device:"Laptop"},
    email:"john.doe@example.com",
    role:"admin"

  }).then((user)=>{
    console.log("User created successfully");
  }).catch((err)=>{
    console.log("Error creating user:",err.message);
  });
  User.create({
    name:"Jane Smith",
    age:25,
    hobbies:["cooking","traveling"],
    isActive:false,
    location:{
      city:"Los Angeles",
      country:"USA"
    },
    score:[80,85,90],
    metadata:{browser:"Firefox",device:"Tablet"},
    email:"jane.smith@example.com",
    role:"user"

  }).then((user)=>{
    console.log("User created successfully");
  }).catch((err)=>{
    console.log("Error creating user:",err.message);
  });

  // const taskschema=new mongoose.Schema({
  //   title:{
  //     type:String,
  //     required:true
  //   },
  //   completed:{
  //     type:Boolean,
  //     default:false
  //   },
  // },{timestamps:true})

  // const Task= mongoose.model("Task",taskschema)
  //Task Creates
  // Task.create({title:"Task 1"})
  // .then(()=>{
  //   console.log("Task created successfully");
  // }).catch((err)=>{
  //   console.log("Error creating task:",err.message);
  // });
  // Task.create({title:"Task 2"})
  // .then(()=>{
  //   console.log("Task created successfully");
  // }).catch((err)=>{
  //   console.log("Error creating task:",err.message);
  // });
  // Task.create({title:"Task 3"})
  // .then(()=>{
  //   console.log("Task created successfully");
  // }).catch((err)=>{
  //   console.log("Error creating task:",err.message);
  // });

  // Task.create({title:"Task 4",completed:true})
  // .then(()=>{
  //   console.log("Task created successfully");
  // }).catch((err)=>{
  //   console.log("Error creating task:",err.message);
  // });


  // //Task Find

  // Task.find(
  //   {completed:true}

  // ).then((tasks)=>{
  //   console.log("Task found successfully");
  //   console.log(tasks);
  // })
  // .catch((err)=>{
  //   console.log("Error finding task:",err.message);
  // });


  // Task.findById("69ff5a1d2d2f168648ded3c3").then((task)=>{
  //   console.log("Task found successfully");
  //   console.log(task);
  // }).catch((err)=>{
  //   console.log("Error finding task:",err.message);
  // });

  // Task.findByIdAndUpdate("69ff5a1d2d2f168648ded3c3", { title: "Updated Task 1",
  //   completed: true }, { new: true
  //  }).then((task) => {
  //   console.log("Task updated successfully");
  //   console.log(task);
  // }).catch((err) => {
  //   console.log("Error updating task:", err.message);
  // });

  // Task.findByIdAndDelete("69ff5a1d2d2f168648ded3c3").then((task) => {
  //   console.log("Task deleted successfully");
  //   console.log(task);
  // }).catch((err) => {
  //   console.log("Error deleting task:", err.message);
  // });
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
