<script lang="ts">
  import Icon from "@iconify/svelte";
  /* TODO:
  BACKEND:
  * trim() fields(except passwords)
  */
  export let form;
</script>

<div class="flex flex-col items-center mt-8">
  <h3 class="h3 my-6">Create a new account</h3>
  <form method="post" class="card h-fit py-3 px-9 rounded-xl">
    <label class="label my-3">
      <span><b>Email</b></span>
      <input
        value={form?.email}
        class="input"
        name="email"
        type="text"
        placeholder="ex: john3d or john@mail.com"
        required
      />
    </label>
    <label class="label my-3">
      <span><b>Password</b></span>
      <input
        required
        title="Input (password)"
        class="input"
        name="password"
        type="password"
        placeholder="Strong@Password129"
      />
    </label>
    {#if form?.error}
      <small class="text-red-500"><b>Error</b>: {form?.error}</small>
    {/if}
    <!-- Separator -->
    <div />
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
