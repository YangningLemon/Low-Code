<template>
  <div class="preview_content">
    <template v-if="state.components.length > 0">
      <div
        v-for="item in state.components"
        :key="item.id"
        @click="selectComponent(item.id)"
      >
        <div class="component_title">{{ item.name }}</div>
        <div
          class="selected_component_box"
          v-if="currentComponentId === item.id"
        ></div>
        <div
          class="selected_component_opt"
          v-if="currentComponentId === item.id"
        ></div>
        <component :is="item.componentName" :data="item"></component>
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
import { onMounted, reactive, ref } from "vue";
import state from "./store";
import _ from "lodash";

const currentComponentId = ref("");

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

//选中的盒子
const selectComponent = (cid) => {
  currentComponentId.value = cid;
  console.log(cid);
  // parent.postMessage({ message: "selectComponent", data: { id: cid } });
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
<style scoped>
.preview_content {
  width: 430px;
  height: 750px;
  background-color: #fff;
}

.component_title {
  /* 要用内容撑开盒子，所以使用 box-sizing: content-box;*/
  box-sizing: content-box;
  padding: 4px 7px;
  background-color: #155bd4;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  font-size: 14px;
  transform: translateX(-110%);
}

/* 三角样式 */
.component_title::after {
  content: "";
  border: 5px solid transparent;
  border-left-color: #155bd4;
  position: absolute;
  right: -9px;
  top: 13px;
}

.selected_component_box {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  border: 2px solid #155bd4;
}
</style>
<style>
body {
  background-color: #f7f8fa;
}
#root {
  display: flex;
  justify-content: center;
}
</style>