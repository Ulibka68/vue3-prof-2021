<template>
  <div class="page-container">
    <span
      class="page-number"
      :class="{ disabled: currentPage === 0 }"
      @click="handlePageClick('<')"
    >
      &lt;
    </span>
    <span
      class="page-number"
      :class="{ primary: itm == currentPage + 1 }"
      v-for="itm in paginationArray"
      :key="itm"
      @click="handlePageClick(itm)"
      >{{ itm }}</span
    >
    <span
      class="page-number"
      :class="{ disabled: currentPage === pagesCount - 1 }"
      @click="handlePageClick('>')"
    >
      &gt;
    </span>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
} from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    currentPage: { type: Number, required: true },
    pagesCount: { type: Number, required: true },
  },
  emits: ["update:currentPage"],
  setup(props, context) {
    // context.emit
    // context.attrs
    // context.slots
    onBeforeMount(() => {
      formPageNums(props.currentPage);
    });

    // onUpdated(() => {
    //   formPageNums();
    // });

    const sendNewPage = (p: number) => {
      // if (!paginationArrayLoc.includes((p + 1).toString())) {
      console.log("call form ", p);
      formPageNums(p);
      // }
      context.emit("update:currentPage", p);
    };

    const handlePageClick = (page: string) => {
      if (page === (props.currentPage + 1).toString()) return;
      if (page === "...") return;
      let p1 = props.currentPage;
      if (page === "<") {
        p1--;
        if (p1 < 0) return;
        sendNewPage(p1);
        // store.dispatch("algolia_setPage", p1);
        return;
      }
      if (page === ">") {
        p1++;
        if (p1 === props.pagesCount) return;
        sendNewPage(p1);
        // store.dispatch("algolia_setPage", p1);
        return;
      }

      const p: number = parseInt(page) - 1;
      sendNewPage(p);

      // store.dispatch("algolia_setPage", p);
    };

    const paginationArray = ref<Array<string>>([]);
    let paginationArrayLoc: Array<string>;

    const formPageNums = (curPage: number) => {
      console.log(" call  formPageNums ", props.currentPage);
      paginationArrayLoc = [];

      if (props.pagesCount === 0) return;

      if (props.pagesCount <= 9) {
        for (let i = 1; i <= props.pagesCount; i++) {
          paginationArrayLoc.push(i.toString());
        }
        paginationArray.value = paginationArrayLoc;
        return;
      }

      if (curPage < 7) {
        // если мы вначале
        for (let i = 1; i <= 7; i++) {
          paginationArrayLoc.push(i.toString());
        }
        paginationArrayLoc.push("...");
        paginationArrayLoc.push(props.pagesCount.toString());
        paginationArray.value = paginationArrayLoc;
        return;
      }

      if (props.pagesCount - curPage < 7) {
        // если мы в конце
        paginationArrayLoc.push("1");
        paginationArrayLoc.push("...");
        for (let i = props.pagesCount - 7; i <= props.pagesCount; i++) {
          paginationArrayLoc.push(i.toString());
        }
        paginationArray.value = paginationArrayLoc;
        return;
      }

      //мы посередине
      paginationArrayLoc.push("1");
      paginationArrayLoc.push("...");
      for (let i = curPage - 1; i <= curPage + 3; i++) {
        paginationArrayLoc.push(i.toString());
      }
      paginationArrayLoc.push("...");
      paginationArrayLoc.push(props.pagesCount.toString());
      paginationArray.value = paginationArrayLoc;
    };

    return {
      paginationArray,
      handlePageClick,
    };
  },
});
</script>

<style scoped></style>
