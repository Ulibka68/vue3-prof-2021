<template>
  <AppLoader v-if="loading" />
  <AppPage v-else title="Список заявок">
    <h1>Home</h1>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>

    <teleport to="body">
      <AppModal v-if="modal" title="Создать заявку" @close="modal = false">
        <h1>Диалоговое окно</h1>
      </AppModal>
    </teleport>
  </AppPage>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, ref, computed, onMounted } from "vue";
import AppPage from "@/components/ui/AppPage.vue";
import AppModal from "@/components/ui/AppModal.vue";
import AppLoader from "@/components/ui/AppLoader.vue";
import { useStore } from "@/store";
/* eslint-enable */

export default defineComponent({
  name: "Home",
  components: {
    AppPage,
    AppModal,
    AppLoader,
  },
  setup() {
    const modal = ref(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const store = useStore();

    const loading = ref(false);

    /*
    onMounted(async () => {
      loading.value = true;
      // await store.dispatch("request/load");
      loading.value = false;
    });

     */

    return {
      modal,

      loading,
    };
  },
});
</script>
