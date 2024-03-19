<script lang="ts">
  import Icon from "@iconify/svelte";
  /* TODO:
  BACKEND:
  * trim() fields(except passwords)
  */
  let user = "";
  let password = "";
</script>

<div class="flex flex-col items-center mt-8">
  <h3 class="h3 my-6">Create a new account</h3>
  <form action="?/login" method="post" class="card h-fit py-3 px-9 rounded-xl">
    <label class="label my-3">
      <span><b>Username or Email</b></span>
      <input
        bind:value={user}
        class="input"
        type="text"
        name="first"
        placeholder="ex: john3d or john@mail.com"
        required
      />
    </label>
    <label class="label my-3">
      <span><b>Password</b></span>
      <input
        required
        bind:value={password}
        title="Input (password)"
        class="input my-3"
        name="password"
        type="password"
        placeholder="Strong@Password129"
      />
    </label>
    <button type="submit" class="btn variant-filled my-3">
      <span>
        <Icon icon="mingcute:check-fill" class="h-7 w-7" />
      </span>
      <span>Login</span>
    </button>
  </form>
  <a class="m-4 p-4" href="/auth/register">
    New here?
    <u>Create a new account</u>
  </a>
  <a class="" href="/auth/login">
    Forgot Password?
    <u>Recover Account</u>
  </a>
</div>
