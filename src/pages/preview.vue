<template>
  <div class="preview_content">
    <template v-if="state.components.length > 0">
      <div v-for="item in state.components" :key="item.id">
        <component :is="item.componentName"></component>
      </div>
    </template>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import TitleText from "../components/titletext/index.vue";
export default defineComponent({
  components: {
    TitleText, // 局部注册组件
  },
});
</script>
<script setup>
import { onMounted, reactive } from "vue";
import state from "./store";
import _ from "lodash";

console.log(state); //state树数据代理
// console.log(JSON.parse(JSON.stringify(state))); //是数据
// console.log(state.setting)

let parent = null;
const initMessage = () => {
  // event.source ------发给我信息的那个源是谁

  window.addEventListener("message", (event) => {
    const { message, data } = event.data;

    if (message === "init") {
      parent = event.source;
    }

    if (message === "addComponent" && data && data.id) {
      parent = event.source;
      state.components.push(data);
    }
    console.log("收到消息", state.components);
  });
};

const deleteComponent = (item) => {
  console.log("00000000000", state.components);
  // state.components = [];
  _.remove(state.components, (o) => {
    return o.id === item.id;
  });

  console.log("1111111111111", state.components);

  parent.postMessage({
    message: "deleteComponent",
    data: { id: item.id },
  });
};
onMounted(() => {
  initMessage();
});
</script>