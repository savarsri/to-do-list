<script>
    import {auth} from "./firebase"
    import { signOut } from "firebase/auth"; 


    let tasks = [];
    let completedTasks = [];
    let i;

    function addTask(){
        // if(document.getElementById("listInput").value!=""){
        //     tasks.push(document.getElementById("listInput").value);
        //     document.getElementById("listInput").value = "";
        //     tasks=tasks;
        // }
        signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
    }

    function doneTask(){
        completedTasks.push(tasks[i]);
        tasks.splice(i,1);
        tasks=tasks;
    }

    function deleteTask(){
        tasks.splice(i,1);
        tasks=tasks;
    }

</script>

<main>
    <div>
        <input id="listInput" type="text" placeholder="Enter task">
        <div>
            <button on:click={addTask}>Enter</button>
            <div class='list'>
                {#each tasks as t,i}
                <div>
                    <h4>{t}</h4> 
                    <button on:click={doneTask}>✅</button>
                    <button on:click={deleteTask}>❌</button>
                </div>
                {/each}
            </div>
        </div>
    </div>
    
</main>

<style>

    div{
        display: flex;
        justify-content: center;
    }

    .list{
        display: flexbox;
        justify-content: center;
    }

    button{
        text-shadow: 4px 4px 16px #666666;
        font-size: 30px;
        padding: 10px 10px 10px 10px;
        text-decoration: none;
        
    }
    button:hover{
        background-color: white;
        color: black;
    }
</style>