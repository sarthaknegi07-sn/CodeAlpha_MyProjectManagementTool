const express=require ("express");
const mongoose=require("mongoose");
const { type } = require("os");
const path=require("path");
const app=express();
const PORT=3000;
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
mongoose.connect("mongodb+srv://Raghav:Xcross2007@cluster0.0u6qqko.mongodb.net/projectmanagement?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});

const UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
});
const User=mongoose.model("User",UserSchema);

const ProjectSchema=new mongoose.Schema({
   projectName:String,
   createdBy:String,
   createdAt:{
        type:Date,
        default:Date.now 
   }
});
const Project=mongoose.model("Project",ProjectSchema);

const TaskSchema=new mongoose.Schema({
    projectId:String,
    taskName:String,
    assignedTo:String,
    status:{
        type:String,
        default:"Pending"
    }
});
const Task=mongoose.model("Task",TaskSchema);

const CommentSchema=new mongoose.Schema({
    taskId:String,
    username:String,
    comment:String
});
const Comment=mongoose.model("Comment",CommentSchema);

app.post("/register",async(req,res)=>{
    const{ name,email,password }=req.body;
    const newUser=new User({
        name,
        email,
        password
    });
    await newUser.save();
    res.json({
        message:"Registration Successfull!"
    });
});

app.post("/login",async(req,res)=>{
    console.log(req.body);
    const{ email,password }=req.body;
    const foundUser=await User.findOne({
        email,
        password
    });
    if(foundUser){
        res.json({
            message:"Login Successful!"
        });
    }
    else{
        res.json({
            message:"Invalid Email or Password"
        });
    }
});

app.post("/create-project",async(req,res)=>{
    console.log(req.body);
    const{ projectName,createdBy }=req.body;
    const newProject=new Project({
        projectName,
        createdBy
    });
    await newProject.save();
    console.log("PROJECT SAVED");
    res.json({
        message:"Project Created Successfully!"
    });
});

app.get("/projects",async(req,res)=>{
    const projects=await Project.find();
    res.json(projects);
});

app.post("/create-task",async(req,res)=>{
    const{ projectId,assignedTo,taskName }=req.body;
    const newTask=new Task({
        projectId,
        taskName,
        assignedTo
    });
    await newTask.save();
    res.json({
        message:"Task Created Successfully!"
    });
});

app.get("/tasks",async(req,res)=>{
    const tasks=await Task.find();
    res.json(tasks);
});

app.post("/update-status",async(req,res)=>{
    const{ taskId,status }=req.body;
    await Task.findByIdAndUpdate(taskId,{
        status
    });
    res.json({
        message:"Status Updated!"
    });
});

app.post("/add-comment",async(req,res)=>{
    const{ taskId,username,comment }=req.body;
    const newComment=new Comment({
        taskId,
        username,
        comment
    });
    await newComment.save();
    res.json({
        message:"Comment Added Successfully!"
    });
});

app.get("/comments",async(req,res)=>{
    const comments=await Comment.find();
    res.json(comments);
})

app.post("/delete-task",async(req,res)=>{
    const{ taskId }=req.body;
    await Task.findByIdAndDelete(taskId);
    res.json({
        message:"Task Deleted Successfully!"
    });
});

app.post("/delete-comment",async(req,res)=>{
    const{ commentId }=req.body;
    await Comment.findByIdAndDelete(commentId);
    res.json({
        message:"Comment Deleted Successfully!"
    });
});