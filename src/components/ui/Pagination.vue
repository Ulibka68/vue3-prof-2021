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
import { defineComponent, ref, onBeforeMount, onBeforeUpdate } from "vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { log } from "@/utils/log";

export default defineComponent({
  name: "Pagination",
  props: {
    currentPage: { type: Number, required: true },
    pagesCount: { type: Number, required: false, default: 0 },
    itemsCount: { type: Number, required: false, default: 0 },
    itemsPerPage: { type: Number, required: false, default: 6 },
  },
  emits: ["update:currentPage"],
  setup(props, context) {
    const locPagesCount = ref(0);

    const paginationInfo = () => {
      /*
      log("Pagination", "h2");
      console.log(
        "Pagination currentPage :",
        props.currentPage,
        " itemsCount : ",
        props.itemsCount,
        " itemsPerPage : ",
        props.itemsPerPage
      );

       */

      if (props.pagesCount === 0) {
        locPagesCount.value = Math.ceil(props.itemsCount / props.itemsPerPage);
      } else {
        locPagesCount.value = props.pagesCount;
      }

      formPageNums(props.currentPage);
    };

    onBeforeMount(paginationInfo);
    onBeforeUpdate(paginationInfo);

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
        if (p1 === locPagesCount.value) return;
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

      if (locPagesCount.value === 0) return;

      if (locPagesCount.value <= 9) {
        for (let i = 1; i <= locPagesCount.value; i++) {
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
        paginationArrayLoc.push(locPagesCount.value.toString());
        paginationArray.value = paginationArrayLoc;
        return;
      }

      if (locPagesCount.value - curPage < 7) {
        // если мы в конце
        paginationArrayLoc.push("1");
        paginationArrayLoc.push("...");
        for (let i = locPagesCount.value - 7; i <= locPagesCount.value; i++) {
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
      paginationArrayLoc.push(locPagesCount.value.toString());
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
