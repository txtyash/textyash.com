<script>
  import Icon from "@iconify/svelte";
  let showPassword = true;
  let username = "";
  $: username = username.replace(/[^0-9]/g, "");
</script>

<div class="h-screen flex flex-col items-center justify-center">
  <h3 class="h3 my-6">Create a new account</h3>
  <form
    action="?/register"
    method="post"
    class="card h-fit py-3 px-9 rounded-xl"
  >
    <label class="label my-4">
      <span>Display Name</span>
      <input
        class="input"
        type="text"
        name="first"
        placeholder="ex: John Doe"
        required
      />
    </label>
    <!-- TODO: Allow only number, alphabet & period -->
    <label class="label my-4">
      <span>Username</span>
      <input
        bind:value={username}
        required
        class="input"
        type="text"
        name="last"
        placeholder="ex: john3d"
      />
    </label>
    <label class="label my-4">
      <span>Email</span>
      <input
        required
        class="input my-4"
        title="Input (email)"
        type="email"
        name="email"
        placeholder="ex: name@example.com"
        autocomplete="email"
      />
    </label>
    <label class="label my-4">
      <span>Password</span>
      <div class="input-group input-group-divider grid-cols-[1fr_auto]">
        <input
          required
          title="Input (password)"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Strong@Password129"
        />
        <button
          type="button"
          class="variant-filled-secondary"
          on:click={() => (showPassword = !showPassword)}
        >
          <Icon icon={showPassword ? "mdi:hide" : "mdi:show"} class="h-5 w-5" />
        </button>
      </div>
    </label>
    <button type="submit" class="btn variant-filled my-4">
      <span>
        <Icon icon="mingcute:check-fill" class="h-7 w-7" />
      </span>
      <span>Register</span>
    </button>
  </form>
  <a class="p-3 m-3" href="/auth/login">Already have an account? <u>Login</u></a
  >
</div>
