<template>
  <div class="product-card">
    <div class="product-img">
      <img :src="imageUrl" />
    </div>
    <h4 class="product-title">{{ goodName }}</h4>
    <h5 class="product-title">
      {{ description }}
    </h5>
    <div class="text-center">
      <button class="btn">{{ price }}&nbsp; р.</button>
      <div class="product-controls">
        <button class="btn danger">-</button>
        <strong>123</strong>
        <button class="btn primary">+</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductCard",
  props: {
    imageUrl: { type: String, default: "/empty_photo.jpg" },
    description: String,
    goodName: String,
    price: Number,
  },
});
</script>

<style scoped></style>
