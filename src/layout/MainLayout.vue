<template>
  <the-navbar></the-navbar>
  <TheSidebar />
  <div class="container with-nav">
    <AppMessage />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheNavbar from "@/components/TheNavbar.vue";
import AppMessage from "@/components/ui/AppMessage.vue";
import TheSidebar from "@/components/TheSidebar.vue";

export default defineComponent({
  name: "MainLayout",
  components: { TheSidebar, TheNavbar, AppMessage },
});
</script>

<style scoped></style>
