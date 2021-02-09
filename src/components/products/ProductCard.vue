<template>
  <div class="product-card">
    <div class="product-img">
      <img
        src="https://images.grocery.yandex.net/2756334/33a66b51989449f9918122a775885fbc/300x300.png"
      />
    </div>
    <h4 class="product-title">Название товара</h4>
    <div class="text-center">
      <button class="btn">23</button>
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
});
</script>

<style scoped></style>
