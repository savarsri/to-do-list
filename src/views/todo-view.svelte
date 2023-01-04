<script>
    import { auth,db } from "../firebase";
    import { signOut } from "firebase/auth";
    import { arrayUnion, arrayRemove, doc, getDoc, setDoc, updateDoc, deleteDoc} from "firebase/firestore";
    import { fade } from 'svelte/transition';

    const user = auth.currentUser;
    let projectList = [];
    let taskData = [];
    let index;

    const getData = async () => {
        const docRef = doc(db,"users", user.uid,"details",'details');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            projectList=docSnap.get('projectList');
        } else {
            console.log("No such document!");
        }
    }
    
    getData();

    const newProject = async() => {
        let x = document.getElementById('projectName').value;
        if(x!=''){
            const docRef = doc(db,"users", user.uid,'details', 'details');
            await updateDoc(docRef,{
                projectList: arrayUnion(x)
            }).then(()=>{
                projectList=[...projectList,x];
                document.getElementById('projectName').value='';
            }
            ).catch(()=>{
                console.log("Error occured try again!");
            }    
            );
            await setDoc(doc(db, "users", user.uid,"projects",x),{
                tasks: [],
            });
        } 
    }

    const deleteProject = async () => {
        await deleteDoc(doc(db,"users", user.uid,"projects", projectList[index])).then(async () => {
            const docRef = doc(db,"users", user.uid,'details', 'details');
            await updateDoc(docRef,{
                projectList: arrayRemove(projectList[index])
            }).then(() => {
                projectList.splice(index,1);
                projectList = projectList;
                index=undefined;
            })
        });
    }

    const projectData = async () => {
        const docRef = doc(db,"users", user.uid,"projects", projectList[index]);
        const docSnap = await getDoc(docRef);
        taskData = [];
        if (docSnap.exists()) {
            taskData = [];
            taskData=docSnap.get('tasks');
        } else {
            console.log("No such document!");
        }
    }

    const addTask = async () => {
        let x = document.getElementById('taskInput').value;
        if(x !=''){
            const docRef = doc(db,"users", user.uid,"projects", projectList[index]);
            await updateDoc(docRef,{
                tasks: arrayUnion({
                    status: false,
                    title: x,
                })
            }).then(()=>{
                taskData=[...taskData,{
                    status: false,
                    title: x,
                }];
                document.getElementById('taskInput').value='';
            }
            ).catch(()=>{
                console.log("Error occured try again!");
            }
               
                );
        }   
    }



    const updateTask = async () => {
        const docRef = doc(db,"users", user.uid,"projects", projectList[index]);
        await updateDoc(docRef, {
            tasks: taskData,                  
        });
    }

    const clearTask = async () => {
        if(taskData !=0){
            const docRef = doc(db,"users", user.uid,"projects", projectList[index]);
        await updateDoc(docRef, {
            tasks: taskData.filter(t => !t.status),                  
        }).then(()=>{
            taskData=taskData.filter(t => !t.status);
        }            
        ).catch(()=>{
                console.log("Error occured try again!");
            }          
        );       
        }
    }

    const logOut = () => {
        signOut(auth).then(() => {}).catch((error) => {});
    }    

</script>

<main class="fullScreen">
    <div id="leftPanel">
        <div id="userDetails">
            <div id="name" >{user.displayName}</div>
            <div>{user.email}</div>
        </div>
        <div id="projectList">
            <div>
                {#each projectList as pl, i}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div id="projectTitle" class:select={i==index} on:click={() => {index =i; projectData();}} in:fade out:fade>
                    {pl}
                </div>
            {/each}
            </div>
            <div id="projectCreate">
                <input type="text" id="projectName" maxlength="25" placeholder="Project Name">
                <button id="createButton" on:click={newProject}>Create</button>
                <button id="createButton" on:click={deleteProject}>Delete</button>
            </div>
        </div>
        <div class="bottomButton">
            <button class="secondaryButton">Settings</button>
            <button class="primaryButton" on:click={logOut}>Sign Out</button>
        </div>
    </div>
    <div class="vl"></div>
    <div id="rightPanel">
        <div class="projectTitle">
            {#if index!=undefined}  
            <div>
                {projectList[index]}
            </div>
            <div>
                <button class="Button3" on:click={clearTask}>clear</button>
            </div>
            {/if}
        </div>
        <div id="taskListDiv">
            {#each taskData as taskData, i}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class:done={taskData.status} in:fade out:fade>
                    <div id="projectTitle">
                        <input type=checkbox bind:checked={taskData.status} on:change={updateTask}>
                        {taskData.title}
                    </div>
                </div>
         {/each}
        </div>
        <div id="taskInputDiv">
            <input id="taskInput" type="text" placeholder="Add a task"> 
            <button class="Button3" on:click={addTask}>Add</button>
        </div>
    </div>
</main>

<style>
    .fullScreen{
        display: flex;
    }

    .vl {
        border-left: 3px solid rgb(71, 209, 255);
        height: 100%;
    }

    .done{
        opacity: 0.5;
        text-decoration: line-through;
    }

    .bottomButton{
        display: flex;
        width: 100%;
        justify-content: space-around;
    }

    .projectTitle{
        margin: 2% 0%;
        width: 100%;
        font-family: monospace;
        font-size: 36px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .select{
        border-radius: 4px;
        background-color: rgb(245, 245, 245);
    }

    #leftPanel{
        height: 100%;
        width: 25%;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        
    }

    #userDetails{
        display: flex;
        flex-direction: column;
        justify-content: left;
        width: 100%;
        padding-left: 20%;
    }

    #name{
        font-size: 28px;
        font-family: monospace;
    }

    #projectList{
        height: 75%;
        width: 85%;
        overflow-y: auto;
        background-color: white;
        border-radius: 8px;
        box-shadow: 2px 2px 15px -5px #000;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    #projectCreate{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: 2% 4%;
    }

    #projectTitle{
        margin: 4% 0.5%;
        padding: 2%;
        font-size: 16px;
        font-family: monospace;
        font-weight: 700;
        border-radius: 4px; 
    }

    #projectTitle:hover{
        background-color: rgb(250, 250, 250);
    }


    #rightPanel{
        height: 100%;
        width: 75%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background-color: rgb(255, 255, 255);
    }

    #taskListDiv{
        overflow-y: auto;
        height: 75%;
    }

    #taskInputDiv{
        width: 90%;
        margin: 4% 8%;
        display: flex;
        justify-content: space-between;
    }
</style>