<template>
  <div class="card">
    <h1>Test</h1>
    <Pagination v-model:current-page="curPage" :pages-count="numPages" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Pagination from "@/components/ui/Pagination.vue";

export default defineComponent({
  name: "Test",
  components: { Pagination },
  setup() {
    const handlePagination = (p: number) => {
      console.log("handlePagination ", p);
    };

    const curPage = ref(0);
    watch(curPage, (value, oldValue) => {
      console.log("watch on parent ", value);
    });

    return {
      handlePagination,
      eventChild: "pagination:setpage",
      curPage,
      numPages: 20,
    };
  },
});
</script>

<style scoped></style>
