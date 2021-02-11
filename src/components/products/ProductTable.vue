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
      <span class="page-number" v-for="itm in paginationArray" :key="itm">{{
        itm
      }}</span>
      <span class="page-number"> &gt; </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  ref,
  watchEffect,
  watch,
} from "vue";
import ProductCard from "@/components/products/ProductCard.vue";
import { useStore } from "@/store";
import { log } from "@/utils/log";

export default defineComponent({
  name: "ProductTable",
  components: { ProductCard },
  setup() {
    const store = useStore();
    const parentdiv = ref(null);
    onMounted(() => {
      store.dispatch("products_loadSearchGoods", null);
      paginationArray.value = ["1"];

      console.log(paginationArray);

      console.log("parent_div : ", parentdiv.value);
    });

    watchEffect(
      () => {
        console.log("parent_div : ", parentdiv.value); // => <div></div>
      },
      {
        flush: "post",
      }
    );
    watch(
      () => [
        store.getters.algolia_getPage,
        store.getters.algolia_getPagesCount,
      ],
      (newValues, prevValues) => {
        log("algolia changed", "h1");
        console.log(newValues);
        // formPageNums();
        console.log(paginationArrayLoc);
      }
    );

    const paginationArray = ref<Array<string>>([]);
    let paginationArrayLoc: Array<string>;

    const formPageNums = () => {
      paginationArrayLoc = [];
      log("formPageNums", "h1");
      console.log(
        "nnPages,Page ",
        store.state.algolia.nbPages,
        store.state.algolia.page
      );
      if (store.state.algolia.nbPages === 0) return;

      if (store.state.algolia.nbPages <= 9) {
        console.log("if (store.state.algolia.nbPages <= 9) {");
        for (let i = 1; i++; i <= store.state.algolia.nbPages) {
          paginationArrayLoc.push(i.toString());
        }
        return;
      }
      if (store.state.algolia.page <= 7) {
        // если мы вначале
        console.log("        // если мы вначале");
        for (let i = 1; i++; i <= 7) {
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
          i++;
          i <= store.state.algolia.nbPages
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
        i++;
        i <= store.state.algolia.page + 2
      ) {
        paginationArrayLoc.push(i.toString());
      }
      paginationArrayLoc.push("...");
      paginationArrayLoc.push(store.state.algolia.nbPages.toString());
    };

    return {
      nbHits: computed(() => store.state.algolia.nbHits),
      products: computed(() => store.getters.algolia_getProducts),
      paginationArray,
    };
  },
});
</script>

<style scoped></style>
