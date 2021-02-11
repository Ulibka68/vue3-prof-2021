<template>
  <div class="good-layout-products good-layout-items">
    <span class="good-layout-counts-goods">Найдено товаров : {{ nbHits }}</span>
    <div class="products-table">
      <ProductCard
        v-for="prod in products"
        :key="prod.firebaseID"
        :good-name="prod.name"
        :price="prod.price"
        :image-url="prod.picture"
        :description="prod.description"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import ProductCard from "@/components/products/ProductCard.vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "ProductTable",
  components: { ProductCard },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("products_loadSearchGoods", null);
    });
    return {
      nbHits: computed(() => store.state.algolia.nbHits),
      products: computed(() => store.getters.algolia_getProducts),
    };
  },
});

/*
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
      */
</script>

<style scoped></style>
