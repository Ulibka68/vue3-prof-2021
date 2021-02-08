<template>
  <div v-if="message" :class="['alert', message.type]">
    <p class="alert-title" v-if="title">{{ title }}</p>
    <p>
      {{ message.value }}
    </p>
    <span class="alert-close" @click="close">&times;</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from "vue";
import { useStore, tMessage } from "@/store";

export default defineComponent({
  name: "AppMessage",
  setup() {
    const store = useStore();
    const message: Ref<tMessage | null> = computed(() => store.state.message);

    // eslint-disable-next-line no-unused-vars
    const TITLE_MAP = {
      primary: "Успешно",
      danger: "Ошибка",
      warning: "Предупреждение",
    };

    const title = computed(<K extends keyof typeof TITLE_MAP>() =>
      message.value ? TITLE_MAP[message.value.type as K] : null
    );

    return {
      message,
      title,
      close: () => {
        store.commit("clearMessage", null, { root: true });
      },
    };
  },
});
</script>

<style scoped></style>
