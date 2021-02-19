<template>
  <div class="card">
    <h1>Test</h1>
    <button class="btn" @click="AddQuantityField()">AddQuantityField</button>
    <Pagination v-model:current-page="curPage" :items-count="40" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Pagination from "@/components/ui/Pagination.vue";
import { AddQuantityField } from "@/utils/firebase/addNewField";

export default defineComponent({
  name: "Test",
  components: { Pagination },
  setup() {
    const handlePagination = (p: number) => {
      console.log("handlePagination ", p);
    };

    const curPage = ref(0);
    watch(curPage, (value) => {
      console.log("watch on parent ", value);
    });

    return {
      handlePagination,
      eventChild: "pagination:setpage",
      curPage,
      numPages: 20,
      AddQuantityField,
    };
  },
});
</script>

<style scoped></style>
