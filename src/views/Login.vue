<template>
  <div class="container" style="padding:10px;">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <form class="box">
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left">
              <input class="input outline-primary" type="email" placeholder="john.doe@mail.com">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
            <p v-if="error" class="help">This email is invalid</p>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" placeholder="abc123">
            </div>
            <p v-if="error" class="help">This email is invalid</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
</style>
