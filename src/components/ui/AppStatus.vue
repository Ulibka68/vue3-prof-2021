<template>
  <span :class="['badge', className]">{{ text }}</span>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { defineComponent, ref, watch } from "vue";
import { statusDescriptions, statusArr, tStatus } from "@/store/modules/status";

export default defineComponent({
  name: "AppStatus",
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return statusArr.includes(value as tStatus);
      },
    },
  },
  setup(props) {
    watch(props, (val) => {
      className.value = statusDescriptions[val.type].className;

      text.value = statusDescriptions[val.type].text;
    });

    // <html>TS2339: Property 'type' does not exist on type
    // 'Readonly&lt;{ [x: number]: string; } &amp;
    // { length?: number | undefined;
    // toString?: string | undefined; toLocaleString?: string
    // | undefined; concat?: string[] | undefined;
    // join?: string | undefined;
    // slice?: string[] | undefined; ... 16 more ...; flat?: unknown[] | undefined; }&gt; | Readonly&lt;...&gt;'.<br/>Property 'type' does not exist on type 'Readonly&lt;{ [x: number]: string; } &amp; { length?: number | undefined; toString?: string | undefined; toLocaleString?: string | undefined; concat?: string[] | undefined; join?: string | undefined; slice?: string[] | undefined; ... 16 more ...; flat?: unknown[] | undefined; }&gt;'.

    const className = ref(statusDescriptions[props.type].className);

    const text = ref(statusDescriptions[props.type].text);

    return {
      className,
      text,
    };
  },
});
</script>

<style scoped></style>
