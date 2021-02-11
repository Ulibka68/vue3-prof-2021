<template>
  <div class="good-layout-products good-layout-items">
    <span class="good-layout-counts-goods">Найдено товаров : 24</span>
    <div class="products-table">
      <ProductCard
        good-name="Салфетка вафельная"
        price="25"
        image-url="https://res.cloudinary.com/dljazkzna/image/upload/v1604678254/img/2.jpg"
        description="Набор из двух вафельных салфеток с аппликациями в виде фруктов и овощей, из 100% хлопка, добавят яркости вашей кухне. Салфетки очень износоустойчивые, хорошо впитывают влагу, переносят множество стирок."
      />
      <ProductCard
        good-name="Плед"
        price="146"
        image-url="https://res.cloudinary.com/dljazkzna/image/upload/v1604677980/img/1093.jpg"
        description="Плед Arya Fiorici очень качественный во всех деталях, поистине заслуживающее высокой цены. Пледы приобретают все большую и вполне заслуженную популярность. Изначально они расценивались как исключительно декоративные изделия. Приобретали их в качестве недорогих накидок для кресел или диванов, но достаточно скоро, такие пледы были оценены и в качестве легких одеял, позволяющих комфортно скоротать прохладный летний вечер."
      />
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
