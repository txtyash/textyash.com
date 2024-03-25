<script lang="ts">
  import { Login } from "$lib/components";
  import type { ActionData } from "./$types";
  export let form: ActionData;
</script>

<div class="flex flex-col items-center mt-8 mx-4">
  <h3 class="h3 my-6">Login to your account</h3>
  <Login {form} />
  <a class="m-4 p-4" href="/register">
    <u>Create a new account</u>
  </a>
  <a href="/login">
    <u>Forgot Password?</u>
  </a>
</div>
