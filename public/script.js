async function registerUser(){
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const response=await fetch("/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            email,
            password
        })
    });
    const data=await response.json();
    alert(data.message);
}

async function loginUser(){
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const response=await fetch("/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,
            password
        })
    });
    const data=await response.json();
    if(data.message==="Login Successful!"){
        alert(data.message);
        window.location.href="profile.html";
    }else{
        alert(data.message);
    }
}

async function createProject(){
  const projectName=document.getElementById("projectName").value;
  try{ 
  const response=await fetch("/create-project",{
      method:"POST",
      headers:{
        "Content-Type":"application/json" 
      },
   body:JSON.stringify({
    projectName,
    createdBy:"Raghav"
   })    
  });
  console.log(response);
  const data=await response.json();
  alert(data.message);
  loadProjects();
}catch(err){
    console.log(err);
    alert("Error Occured");
}}

async function loadProjects(){
   const response=await fetch("/projects");
   const projects=await response.json();
   let container=document.getElementById("project-container");
   container.innerHTML="";
   projects.forEach(project=>{
    container.innerHTML+=`
    <div>
    <h3>${project.projectName}</h3>
    <p>Project ID:${project._id}</p>
    <p>Created By:${project.createdBy}</p>
    </div>
    <hr>`;
   });
}
   if(window.location.pathname.includes("index.html")||window.location.pathname==="/"){
    loadProjects();
   }

async function createTask(){
    const projectId=document.getElementById("projectId").value;
    const taskName=document.getElementById("taskName").value;
    const assignedTo=document.getElementById("assignedTo").value;
    const response=await fetch("/create-task",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            projectId,
            taskName,
            assignedTo
        })
    });
    const data=await response.json();
    alert(data.message);
    loadTasks();
}

async function loadTasks(){
    const response=await fetch("/tasks");
    const tasks=await response.json();
    let container=document.getElementById("task-container");
    container.innerHTML="";
    tasks.forEach(task=>{
        container.innerHTML+=`
        <div>
        <h3>${task.taskName}</h3>
        <p>Task ID:${task._id}</p>
        <p>Assigned To:${task.assignedTo}</p>
        <p>Status:${task.status}</p>
        <select id="status-${task._id}">
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
        </select>
        <button onclick="updateStatus('${task._id}')">
        Update Status</button>
        <button onclick="deleteTask('${task._id}')">Delete Task</button>
        </div>
        <hr>`;
    });
}
if(window.location.pathname.includes("index.html")||window.location.pathname==="/"){
    loadProjects();
    loadTasks();
    loadComments();
}

async function updateStatus(taskId){
    const status=document.getElementById(`status-${taskId}`).value;
    const response=await fetch("/update-status",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            taskId,
            status
        })
    });
    const data=await response.json();
    alert(data.message);
    loadTasks();
}

async function addComment(){
    const taskId=document.getElementById("taskId").value;
    const username=document.getElementById("username").value;
    const comment=document.getElementById("comment").value;
    const response=await fetch("/add-comment",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            taskId,
            username,
            comment
        })
    });
    const data=await response.json();
    alert(data.message);
    loadComments();
}

async function loadComments(){
    const response=await fetch("/comments");
    const comments=await response.json();
    let container=document.getElementById("comment-container");
    container.innerHTML="";
    comments.forEach(comment=>{
        container.innerHTML+=`
        <div>
        <h4>${comment.username}</h4>
        <p>${comment.comment}</p>
        <p>Task ID:${comment.taskId}</p>
        <button onclick="deleteComment('${comment._id}')">Delete Comment</button>
        </div>
        <hr>`;
    });
}

async function deleteTask(taskId){
    const response=await fetch("/delete-task",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            taskId
        })
    });
    const data=await response.json();
    alert(data.message);
    loadTasks();
}

async function deleteComment(commentId){
    const response=await fetch("/delete-comment",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            commentId
        })
    });
    const data=await response.json();
    alert(data.message);
    loadComments();
}