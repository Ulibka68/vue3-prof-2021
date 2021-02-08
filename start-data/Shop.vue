<template>
  <div class="card">
    <div class="products-filter">
      <div class="form-control">
        <input type="text" placeholder="Найти товар...">
        <span class="form-control-clear">&times;</span>
      </div>

      <ul class="list">
        <li class="list-item">Все</li>
        <li class="list-item">
          Название категории
        </li>
      </ul>
    </div>
    <div class="products-table">
      <div class="product-card">
        <div class="product-img">
          <img src="https://images.grocery.yandex.net/2756334/33a66b51989449f9918122a775885fbc/300x300.png">
        </div>
        <h4 class="product-title">Название товара</h4>
        <div class="text-center">
          <button class="btn">23</button>
          <!--          <div class="product-controls">-->
          <!--            <button class="btn danger">-</button>-->
          <!--            <strong>123</strong>-->
          <!--            <button class="btn primary">+</button>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>