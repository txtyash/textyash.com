<script lang="ts">
  import Icon from "@iconify/svelte";
  import {
    checkForm,
    type formError,
    type formFields,
  } from "$lib/client/formChecker";
  /* TODO:
  FRONTEND: beforeSubmit
  * check if form is valid => if(!error) then valid
  BACKEND:
  * trim() fields(except passwords)
  */
  let fields: formFields = {
    displayName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  let error: formError | null = { field: "", message: "" };
  $: error = checkForm(fields);
</script>

<div class="flex flex-col items-center mt-8">
  <h3 class="h3 my-6">Create a new account</h3>
  <form method="POST" class="card h-fit py-3 px-9 rounded-xl">
    <label class="label my-3">
      <span><b>Display Name</b></span>
      <input
        bind:value={fields.displayName}
        class="input"
        type="text"
        name="first"
        placeholder="ex: John Doe"
        required
      />
    </label>
    {#if error?.field === "displayName"}
      <small>{error?.message}</small>
    {/if}
    <!-- TODO: Allow only number, alphabet & period -->
    <label class="label my-3">
      <span><b>Username</b></span>
      <input
        bind:value={fields.username}
        required
        class="input"
        type="text"
        name="last"
        placeholder="ex: john3d"
      />
    </label>
    {#if error?.field === "username"}
      <small>{error?.message}</small>
    {/if}
    <label class="label my-3">
      <span><b>Email</b></span>
      <input
        required
        bind:value={fields.email}
        class="input my-3"
        title="Input (email)"
        type="email"
        name="email"
        placeholder="ex: name@example.com"
        autocomplete="email"
      />
    </label>
    {#if error?.field === "email"}
      <small>{error?.message}</small>
    {/if}
    <label class="label my-3">
      <span><b>Password</b></span>
      <input
        required
        bind:value={fields.password}
        title="Input (password)"
        class="input my-3"
        name="password"
        type="password"
        placeholder="Strong@Password129"
      />
    </label>
    {#if error?.field === "password"}
      <small>{error?.message}</small>
    {/if}
    <label class="label my-3">
      <span><b>Confirm Password</b></span>
      <input
        required
        type="password"
        class="input my-3"
        bind:value={fields.confirmPassword}
        title="Input (Confirm Password)"
        name="confirmPassword"
        placeholder="repeat previous password..."
      />
    </label>
    {#if error?.field === "confirmPassword"}
      <small>{error?.message}</small>
    {/if}
    <!-- Separator between above warning and below button-->
    <div />
    <button type="submit" class="btn variant-filled my-3">
      <span>
        <Icon icon="mingcute:check-fill" class="h-7 w-7" />
      </span>
      <span>Register</span>
    </button>
  </form>
  <a class="p-3 m-3" href="/auth/login">
    Already have an account?
    <u>Login</u>
  </a>
</div>
