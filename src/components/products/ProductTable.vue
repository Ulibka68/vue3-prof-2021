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
    <div class="page-container">
      <span class="page-number"> &lt; </span>
      <span
        class="page-number"
        :class="{ primary: itm == page + 1 }"
        v-for="itm in paginationArray"
        :key="itm"
        @click="handlePageClick(itm)"
        >{{ itm }}</span
      >
      <span class="page-number"> &gt; </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, watch } from "vue";
import ProductCard from "@/components/products/ProductCard.vue";
import { useStore } from "@/store";
import { log } from "@/utils/log";

export default defineComponent({
  name: "ProductTable",
  components: { ProductCard },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("products_loadSearchGoods", null);
      paginationArray.value = ["1"];
    });

    watch(
      () => [
        store.getters.algolia_getPage,
        store.getters.algolia_getPagesCount,
      ],
      (newValues) => {
        log("algolia changed", "h1");
        console.log(newValues);
        formPageNums();
        console.log(paginationArrayLoc);
        paginationArray.value = paginationArrayLoc;
      }
    );

    const handlePageClick = (page: string) => {
      if (page == store.getters.algolia_getPage.toString()) return;
      if (page === "...") return;
      let p1: number = store.getters.algolia_getPage;
      if (page === "<") {
        p1--;
        if (p1 < 0) return;
        store.dispatch("algolia_setPage", p1);
        return;
      }
      if (page === ">") {
        p1++;
        if (p1 === store.getters.algolia_getPagesCount) return;
        store.dispatch("algolia_setPage", p1);
        return;
      }

      const p: number = parseInt(page) - 1;
      store.dispatch("algolia_setPage", p);
    };

    const paginationArray = ref<Array<string>>([]);
    let paginationArrayLoc: Array<string>;

    const formPageNums = () => {
      paginationArrayLoc = [];

      if (store.state.algolia.nbPages === 0) return;

      if (store.state.algolia.nbPages <= 9) {
        console.log("if (store.state.algolia.nbPages <= 9) {");
        for (let i = 1; i <= store.state.algolia.nbPages; i++) {
          paginationArrayLoc.push(i.toString());
        }
        console.log(paginationArrayLoc);
        return;
      }

      if (store.state.algolia.page <= 7) {
        // если мы вначале
        for (let i = 1; i <= 7; i++) {
          paginationArrayLoc.push(i.toString());
        }
        paginationArrayLoc.push("...");
        paginationArrayLoc.push(store.state.algolia.nbPages.toString());
        return;
      }

      if (store.state.algolia.nbPages - store.state.algolia.page < 7) {
        // если мы в конце
        paginationArrayLoc.push("1");
        paginationArrayLoc.push("...");
        for (
          let i = store.state.algolia.nbPages - 7;
          i <= store.state.algolia.nbPages;
          i++
        ) {
          paginationArrayLoc.push(i.toString());
        }
        return;
      }

      //мы посередине
      paginationArrayLoc.push("1");
      paginationArrayLoc.push("...");
      for (
        let i = store.state.algolia.page - 2;
        i <= store.state.algolia.page + 2;
        i++
      ) {
        paginationArrayLoc.push(i.toString());
      }
      paginationArrayLoc.push("...");
      paginationArrayLoc.push(store.state.algolia.nbPages.toString());
    };

    return {
      nbHits: computed(() => store.state.algolia.nbHits),
      products: computed(() => store.getters.algolia_getProducts),
      page: computed(() => store.getters.algolia_getPage),
      paginationArray,
      handlePageClick,
    };
  },
});
</script>

<style scoped></style>
