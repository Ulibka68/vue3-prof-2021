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
      <button class="btn" v-if="mode === 'display'" @click="mode = 'basket'">
        {{ price }}&nbsp; р.
      </button>
      <div class="product-controls" v-else>
        <button class="btn danger">-</button>
        <strong>123</strong>
        <button class="btn primary">+</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ProductCard",
  props: {
    imageUrl: { type: String, default: "/empty_photo.jpg" },
    description: String,
    goodName: String,
    price: Number,
    quantity: Number,
    sold: Boolean,
  },
  setup() {
    const mode = ref("display");
    return {
      mode,
    };
  },
});
</script>

<style scoped></style>
