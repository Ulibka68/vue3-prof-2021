<template>
  <div class="breadcrumbs" v-if="back">
    <router-link to="/" class="text-white"
      >Вернуться к списку заявок</router-link
    >
  </div>
  <div class="card">
    <div class="card-title left">
      <h1>{{ title }}</h1>
      <slot name="header" />
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppPage",
  props: {
    title: { type: String, required: true },
    back: { type: Boolean, default: false },
  },
  setup(props) {
    document.title = `${props.title} | Магазин продуктов`;
  },
});
</script>

<style scoped></style>
