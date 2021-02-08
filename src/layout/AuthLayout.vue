<template>
  <div class="container">
    <AppMessage />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Auth from "@/views/Auth.vue";
import AppMessage from "@/components/ui/AppMessage.vue";

export default defineComponent({
  name: "AuthLayout",
  // eslint-disable-next-line vue/no-unused-components
  components: { Auth, AppMessage },
});
</script>
