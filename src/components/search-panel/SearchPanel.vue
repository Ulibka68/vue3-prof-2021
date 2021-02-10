<template>
  <div class="good-layout-search good-layout-items">
    <div class="products-filter">
      <div class="form-control">
        <input type="text" placeholder="Найти товар..." />
        <span class="form-control-clear">&times;</span>
      </div>

      <ul class="list">
        <li class="list-item">Все</li>
        <li class="list-item" v-for="itm in categories" :key="itm">
          {{ itm }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "SearchPanel",

  setup() {
    const store = useStore();

    onMounted(() => {
      if (store.state.products.categoryList.length === 0) {
        store.dispatch("products_LoadCategories", null);
      }
    });

    return {
      categories: computed(() => store.getters.products_categoriesGet),
    };
  },
});
</script>

<style scoped></style>
