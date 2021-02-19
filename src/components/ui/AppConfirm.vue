<template>
  <AppModal :title="title" @close="$emit('reject')">
    <button class="btn primary" @click="$emit('confirm')">Да</button>
    <button class="btn danger" @click="$emit('reject')">Нет</button>
  </AppModal>
</template>

<script>
import AppModal from './AppModal'
export default {
  emits: ['confirm', 'reject'],
  props: ['title'],
  components: {AppModal}
}
</script>

<style scoped>

</style>