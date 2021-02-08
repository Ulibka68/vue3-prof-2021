<template>
  <component :is="layout" v-if="layout" />
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import MainLayout from "@/layout/MainLayout.vue";
import AuthLayout from "@/layout/AuthLayout.vue";

export default defineComponent({
  name: "App",
  // eslint-disable-next-line vue/no-unused-components
  components: { MainLayout, AuthLayout },
  setup() {
    const route = useRoute();
    return {
      layout: computed(() => route.meta.layout + "-layout"),
    };
  },
});
</script>
