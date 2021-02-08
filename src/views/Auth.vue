<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>
    <div class="form-control" :class="{ invalid: eErorr }">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="eBlur" />
      <small v-if="eErorr">{{ eErorr }}</small>
    </div>

    <div class="form-control" :class="{ invalid: pError }">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="pBlur" />
      <small v-if="pError">{{ pError }}</small>
    </div>
    <button
      class="btn primary"
      type="submit"
      :disabled="isSubmitting || isTooManyAttempts"
    >
      Войти
    </button>
    <div class="text-danger" v-if="isTooManyAttempts">
      Вы слишком часто пытаетесь войти в систему, попробуйте позже
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { useLoginForm } from "@/use/login-form";
import { error } from "@/utils/error";

export default defineComponent({
  name: "Auth",
  setup() {
    const route = useRoute();
    const store = useStore();

    if (route.query.message) {
      store.dispatch("setMessage", {
        value: error(route.query.message as any),
        type: "warning",
      });
    }
    return { ...useLoginForm() };
  },
});
</script>

<style scoped></style>
