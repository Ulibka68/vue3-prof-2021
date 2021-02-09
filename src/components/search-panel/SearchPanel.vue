<template>
  <div class="good-layout-search good-layout-items">
    <div class="products-filter">
      <div class="form-control">
        <input type="text" placeholder="Найти товар..." />
        <span class="form-control-clear">&times;</span>
      </div>

      <ul class="list">
        <li class="list-item">Все</li>
        <li class="list-item">Название категории</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchPanel",
});
</script>

<style scoped></style>
