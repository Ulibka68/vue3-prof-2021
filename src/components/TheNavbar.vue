<template>
  <nav class="navbar">
    <h3>Магазин</h3>
    <h3>{{ userName }}</h3>
    <ul class="navbar-menu">
      <li><router-link to="/">Заявки</router-link></li>
      <li><router-link to="/help">Помощь</router-link></li>
      <li><a href="#" @click.prevent="openSidebar">Сообщения</a></li>
      <li><a href="#" @click.prevent="logout">Выход</a></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";

export default defineComponent({
  name: "TheNavbar",
  setup() {
    const router = useRouter();
    const store = useStore();

    return {
      logout: () => {
        store.dispatch("auth_logOut", null);
        router.push("/auth");
      },
      openSidebar: () => {
        store.commit("sidebar_openSidebar", null);
      },
      userName: computed(() => store.state.logedUser.displayName),
    };
  },
});
</script>

<style scoped></style>
