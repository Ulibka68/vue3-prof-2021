<template>
  <form @submit.prevent="login">
    <h3>Войдите в систему или создайте аккаунт для совершения покупки</h3>

    <div class="form-control">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email">
    </div>

    <div class="form-control">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password">
    </div>

    <button class="btn primary" type="submit">Войти</button>
    <button class="btn" type="button" @click="signUp">Создать аккаунт</button>
  </form>
</template>

<script>
import {ref} from 'vue'
import {useStore} from 'vuex'

export default {
  setup() {
    const store = useStore()
    const email = ref('')
    const password = ref('')

    const login = async () => {
      await store.dispatch('auth/login', {
        email: email.value,
        password: password.value
      })
    }

    const signUp = async () => {
      await store.dispatch('auth/signUp', {
        email: email.value,
        password: password.value
      })
    }

    return {
      email,
      password,
      login,
      signUp
    }
  }
}
</script>

<style scoped>

</style>