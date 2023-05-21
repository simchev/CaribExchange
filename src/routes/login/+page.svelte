<script>
  import { Alert } from 'flowbite-svelte';
  import { enhance } from '$app/forms';

  export let form;
</script>

<section class="w-full mt-[30px]">
    <form class="flex flex-col w-[600px] mx-auto p-[50px]" method="POST" action="?/login" use:enhance>
        <h1 class="text-3xl text-center font-raleway">Login</h1>
        <Alert color="red" class="mt-2 rounded-none {form?.error ? '' : 'hidden'}">
            <span class="font-medium">Error: </span>{form?.error}
        </Alert>
        <Alert color="green" class="mt-2 rounded-none {form?.success ? '' : 'hidden'}">
            <span class="font-medium">Success: </span> account created succesfully
        </Alert>
        <!--input class="mt-4 mb-2" name="email" type="email" placeholder="Email" />
        <input class="mt-2 mb-4" name="password" type="password" placeholder="Password" /-->
        <input class="mt-4 mb-2" name="email" type="email" placeholder="Email" required minlength="3" pattern="^\S+@\S+$" />
        <input class="mt-2 mb-4" name="password" type="password" placeholder="Password" required minlength="8" maxlength="64" />
        <div class="flex flex-col">
            <input class="bg-brown-500 hover:bg-brown-600 p-2.5 mb-4 cursor-pointer" type="submit" value="Login" />
            <input class="bg-brown-500 hover:bg-brown-600 p-2.5 cursor-pointer" type="submit" value="Register" formaction="?/register" />
        </div>
    </form>
</section>