<template>
  <div class="good-layout-products good-layout-items">
    <div class="products-table">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductCard from "@/components/products/ProductCard.vue";

export default defineComponent({
  name: "ProductTable",
  components: { ProductCard },
});
</script>

<style scoped></style>
