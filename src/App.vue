<template>
  <component :is="layout" v-if="layout" />
  <!--  <component :is="GoodsListLayout" v-if="layout" />-->
  <!--  <component :is="goods - list - layout" />-->
  <!--  <GoodsListLayout />-->
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import MainLayout from "@/layout/MainLayout.vue";
import AuthLayout from "@/layout/AuthLayout.vue";
import GoodsListLayout from "@/layout/GoodsListLayout.vue";

export default defineComponent({
  name: "App",
  // eslint-disable-next-line vue/no-unused-components
  components: { MainLayout, AuthLayout, GoodsListLayout },
  setup() {
    const route = useRoute();
    return {
      layout: computed(() => route.meta.layout),
    };
  },
});
</script>
