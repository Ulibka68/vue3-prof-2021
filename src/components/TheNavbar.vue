<template>
  <nav class="navbar">
    <h3>Online Bank</h3>
    <ul class="navbar-menu">
      <li><router-link to="/">Заявки</router-link></li>
      <li><router-link to="/help">Помощь</router-link></li>
      <li><a href="#" @click.prevent="openSidebar">Сообщения</a></li>
      <li><a href="#" @click.prevent="logout">Выход</a></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";

export default defineComponent({
  name: "TheNavbar",
  setup() {
    const router = useRouter();
    const store = useStore();

    return {
      logout: () => {
        store.commit("auth/logout");
        router.push("/auth");
      },
      openSidebar: () => {
        store.commit("openSidebar");
      },
    };
  },
});
</script>

<style scoped></style>
