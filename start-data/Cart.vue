<template>
  <div class="card">
    <h1>Корзина</h1>

    <h3 class="text-center">В корзине пока ничего нет</h3>
    <table class="table">
      <thead>
      <tr>
        <th>Наименование</th>
        <th>Количество</th>
        <th>Цена (шт)</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Название товара</td>
        <td>
          <button class="btn primary">+</button>
          42 шт.
          <button class="btn danger">-</button>
        </td>
        <td>42 000 руб.</td>
      </tr>
      </tbody>
    </table>
    <hr>
    <p class="text-right"><strong>Всего: 14 200 руб.</strong></p>
    <p class="text-right">
      <button class="btn">Оплатить</button>
    </p>
  </div>
</template>

<script>
const CART_MODEL = {
  '2': 3,
  '5': 1
}

export default {
  setup() {
  }
}
</script>

<style scoped>

</style>