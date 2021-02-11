<template>
  <div class="good-layout-search good-layout-items">
    <div class="products-filter">
      <div class="form-control">
        <input
          type="text"
          placeholder="Найти товар..."
          v-model="searchString"
        />
        <span class="form-control-clear" @click="clearSearch">&times;</span>
      </div>

      <ul class="list">
        <li
          class="list-item"
          :class="{ active: selectedCategory === '' }"
          @click="handleClick"
        >
          Все
        </li>
        <li
          class="list-item"
          :class="{ active: selectedCategory === itm }"
          v-for="itm in categories"
          :key="itm"
          @click="handleClick"
        >
          {{ itm }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, watch } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "SearchPanel",

  setup() {
    const store = useStore();
    const searchString = ref<string>("");

    onMounted(() => {
      if (store.state.products.categoryList.length === 0) {
        store.dispatch("products_LoadCategories", null);
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    watch(searchString, (str, prevStr) => {
      // console.log(prevStr, " -> ", str);
      store.dispatch("search_setSearchString", str);
    });

    const clearSearch = () => {
      searchString.value = "";
      // store.commit("search_clearSearchString", null);
    };

    const handleClick = (e: Event) => {
      let innerText = (e.target as HTMLLIElement).innerText;
      // console.log(a.innerText);
      if (innerText === "Все") innerText = "";
      store.dispatch("search_setSelectedCategory", innerText);
    };

    return {
      categories: computed(() => store.getters.products_categoriesGet),
      selectedCategory: computed(() => store.state.products.selectedCategory),
      searchString,
      clearSearch,
      handleClick,
    };
  },
});
</script>

<style scoped></style>
