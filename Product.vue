<template>
  <app-page back center title="Свекла">
    <img src="https://images.grocery.yandex.net/2756334/33a66b51989449f9918122a775885fbc/300x300.png" />
    <p>Категория: <strong>Название категории</strong></p>
    <button class="btn">
      123 руб
    </button>
    <div class="product-controls in-card">
      <button class="btn danger">-</button>
      <strong>12</strong>
      <button class="btn primary">+</button>
    </div>
  </app-page>
  <h3 class="text-center text-white">
    Товара не найден.
  </h3>
</template>

<script>
import AppPage from '../components/ui/AppPage'
export default {
  components: {AppPage}
}
</script>

<style scoped>

</style>