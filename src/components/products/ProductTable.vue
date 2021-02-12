<template>
  <div class="good-layout-products good-layout-items" ref="parentdiv">
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
    <Pagination
      v-model:current-page="curPage"
      :items-count="nbHits"
      :items-per-page="hitsPerPage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, watch } from "vue";
import ProductCard from "@/components/products/ProductCard.vue";
import { useStore } from "@/store";
import Pagination from "@/components/ui/Pagination.vue";

export default defineComponent({
  name: "ProductTable",
  components: { Pagination, ProductCard },
  setup() {
    const store = useStore();
    const curPage = ref(0);

    onMounted(() => {
      store.dispatch("products_loadSearchGoods", null);
    });

    /*
    watch(
      () => [
        store.getters.algolia_getPage,
        store.getters.algolia_getPagesCount,
      ],
      (newValues) => {
        log("algolia changed", "h1");
        console.log(newValues);
        // formPageNums();
        // console.log(paginationArrayLoc);
        // paginationArray.value = paginationArrayLoc;
      }
    );

     */

    watch(curPage, (page) => {
      console.log("watch on ProductTable ", page);
      if (page == store.getters.algolia_getPage) return;
      store.dispatch("algolia_setPage", page);
    });

    return {
      nbHits: computed(() => store.getters.algolia_getNbHits),
      products: computed(() => store.getters.algolia_getProducts),
      page: computed(() => store.getters.algolia_getPage),
      hitsPerPage: store.state.algolia.hitsPerPage, // сейчас 6 изменение не предполагается
      curPage,
    };
  },
});
</script>

<style scoped></style>
