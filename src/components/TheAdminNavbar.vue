<template>
  <nav class="navbar">
    <h3>Админка</h3>

    <ul class="navbar-menu">
      <li>
        <router-link :to="{name: 'AdminProducts'}">Инвентарь</router-link>
      </li>
      <li>
        <router-link :to="{name: 'AdminCategories'}">Категории</router-link>
      </li>
      <li>
        <router-link :to="{name: 'AdminOrders'}">Заказы</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Выйти</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    return {
      logout: () => {
        store.commit('auth/logout')
        router.push('/')
      }
    }
  }
}
</script>

<style scoped>

</style>