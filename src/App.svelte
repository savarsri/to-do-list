<script>
	import LoginView from "./views/login-view.svelte";
	import RegisterView from "./views/register-view.svelte";
	import TodoView from "./views/todo-view.svelte";
	import { onAuthStateChanged } from "firebase/auth";
	import { auth } from "./firebase";

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

<main class="fullScreen">
	<svelte:component this={view} on:viewChange={switchView}/>
</main>

<style>

</style>