<template>
  <AppLoader v-if="loading" />
  <AppPage v-else title="Список товаров">
    <template v-slot:header>
      <div class="filter-current-category">фильтр :{{ selectedCategory }}</div>
    </template>
    <div class="good-layout-container">
      <SearchPanel />
      <ProductTable />
    </div>
  </AppPage>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, ref, computed, onMounted } from "vue";
import AppPage from "@/components/ui/AppPage.vue";

import AppLoader from "@/components/ui/AppLoader.vue";
import { useStore } from "@/store";
import SearchPanel from "@/components/search-panel/SearchPanel.vue";

import ProductTable from "@/components/products/ProductTable.vue";
/* eslint-enable */

export default defineComponent({
  name: "Home",
  components: {
    ProductTable,

    SearchPanel,
    AppPage,
    AppLoader,
  },
  setup() {
    const modal = ref(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const store = useStore();

    const loading = ref(false);

    /*
    onMounted(async () => {
      loading.value = true;
      // await store.dispatch("request/load");
      loading.value = false;
    });

     */

    return {
      modal,
      selectedCategory: computed(() => store.state.products.selectedCategory),

      loading,
    };
  },
});
</script>
