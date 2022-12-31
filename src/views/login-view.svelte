<script>
    import { createEventDispatcher } from "svelte";
    import {auth,db} from "../firebase"
    import {signInWithEmailAndPassword} from "firebase/auth";

    const dispatch = createEventDispatcher();

    const change = () => {
        dispatch('viewChange',false);
    };

    let email,password;

    const signIn = () => {
        email=document.getElementById("email").value;
        password=document.getElementById("password").value;
        
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
    // Signed in 
            const user = userCredential.user;
            console.log(user.displayName);
    // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }



</script>

<main class="fullScreen">
    <div class="centerBox">
        <div id="title">
            To Do List
        </div>
        <div>
            <input id="email" type="email" placeholder="E-mail">
        </div>
        <div>
            <input id="password" type="password" placeholder="Password">
        </div>
        <div>
            <button class="primaryButton" on:click={signIn}>Log In</button>
        </div>
        <div class="style2">
            Don't have an account? 
            <div class="linkText" on:click={change} >Create One!</div> 
        </div>
    </div>
</main>

<style>

    #title{
        font-weight: 600;
        font-size: 42px;
        font-family: monospace;
    }

    #email{
        font-size: 18px;
    }

    #password{
        font-size: 18px;
    }

    .fullScreen{
        background-color: whitesmoke;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .centerBox{
        background-color: white;
        border-radius: 10px;
        box-shadow: 2px 2px 15px -5px #000;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 30%;
        height: 60%;
    }

    .style2{
        display: flex;
    }
    .linkText{
        margin: 0px 6px;
    }

</style>