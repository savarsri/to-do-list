<script>
	import LoginView from "./views/login-view.svelte";
	import RegisterView from "./views/register-view.svelte";
	import TodoView from "./views/todo-view.svelte";
	import { onAuthStateChanged } from "firebase/auth";
	import { auth } from "./firebase";
	import { fade } from 'svelte/transition';

	let login = true;
	let view;
	

	onAuthStateChanged(auth, (user) => {
  		if (user) {
			view = TodoView;
  		} else {
			view=LoginView;
  		}
	});

	const switchView = (event) => {
		login=event.detail;
		if(login==true){
			view = LoginView;
		}else{
			view = RegisterView;
		}
	}

</script>

<main class="fullScreen" >
	<div in:fade out:fade>
		<svelte:component this={view} on:viewChange={switchView} />
	</div>
</main>

<style>

</style>