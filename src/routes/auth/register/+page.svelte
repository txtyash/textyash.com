<script lang="ts">
  import Icon from "@iconify/svelte";
  import {
    checkPassword,
    checkDisplayName,
    checkEmail,
    checkUsername,
    validForm,
  } from "../formValidator";
  /* TODO: beforeSubmit
  if password === confirmPassword
  if !validForm({object}) then showAllWarnings = true;
  */
  let showPassword = false;
  // TODO: trim displayName before submit
  let displayName = "";
  let username = "";
  $: username = username.trim();
  let email = "";
  $: email = email.trim();
  let password = "";
  $: password = password.trim();
  let confirmPassword = "";
  $: confirmPassword = confirmPassword.trim();
  let showAllWarnings = false;
  let focusedField = "";
</script>

<div class="h-screen flex flex-col items-center justify-center">
  <p class="text-3xl my-6">Create a new account</p>
  <form
    action="?/register"
    method="post"
    class="card h-fit py-3 px-9 rounded-xl"
  >
    <label class="label my-3">
      <span><b>Display Name</b></span>
      <input
        bind:value={displayName}
        on:focus={() => (focusedField = "displayName")}
        class="input"
        type="text"
        name="first"
        placeholder="ex: John Doe"
        required
      />
    </label>
    {#if (focusedField === "displayName" || showAllWarnings) && checkDisplayName(displayName) !== ""}
      <small>{checkDisplayName(displayName)}</small>
    {/if}
    <!-- TODO: Allow only number, alphabet & period -->
    <label class="label my-3">
      <span><b>Username</b></span>
      <input
        bind:value={username}
        on:focus={() => (focusedField = "username")}
        required
        class="input"
        type="text"
        name="last"
        placeholder="ex: john3d"
      />
    </label>
    {#if (focusedField === "username" || showAllWarnings) && checkUsername(username) !== ""}
      <small>{checkUsername(username)}</small>
    {/if}
    <label class="label my-3">
      <span><b>Email</b></span>
      <input
        required
        on:focus={() => (focusedField = "email")}
        bind:value={email}
        class="input my-3"
        title="Input (email)"
        type="email"
        name="email"
        placeholder="ex: name@example.com"
        autocomplete="email"
      />
    </label>
    {#if (focusedField === "email" || showAllWarnings) && checkEmail(email) !== ""}
      <small>{checkEmail(email)}</small>
    {/if}
    <label class="label my-3">
      <span><b>Password</b></span>
      <input
        required
        on:focus={() => (focusedField = "password")}
        bind:value={password}
        title="Input (password)"
        class="input my-3"
        name="password"
        type="password"
        placeholder="Strong@Password129"
      />
    </label>
    {#if (focusedField === "password" || showAllWarnings) && checkPassword(password) !== ""}
      <small>{checkPassword(password)}</small>
    {/if}
    <label class="label my-3">
      <span><b>Confirm Password</b></span>
      <input
        required
        type="password"
        class="input my-3"
        on:focus={() => (focusedField = "confirmPassword")}
        bind:value={confirmPassword}
        title="Input (Confirm Password)"
        name="confirmPassword"
        placeholder="repeat previous password..."
      />
    </label>
    {#if focusedField === "confirmPassword" && password !== confirmPassword}
      <small>Passwords do not match.</small>
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
