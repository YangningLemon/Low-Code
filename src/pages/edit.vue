<template>
  <div class="fl fl_jc_fs fl_ai_fs">
    <div class="edit_left">
      <button @click="addComp('TitleText')">标题文本</button>
      <button @click="addComp('Image')">图片</button>
      <button @click="addComp('Carousel')">轮播</button>
    </div>
    <div class="edit_main">
      <iframe
        id="edit_preview_iframe"
        src="/preview"
        class="edit_iframe"
      ></iframe>
    </div>
    <div class="edit_right">3</div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import state from "./store";
import _ from "lodash";
// console.log(state); //state树数据代理
// console.log(JSON.parse(JSON.stringify(state))); //是数据
// console.log(state.setting);
// 以上的数据是代理

const ComponentMap = {
  TitleText: {
    name: "标题文本",
    ComponentName: "TitleText",
    styles: {
      testAline: "center",
      fontWeigth: "normal",
      color: "#333",
      backgroundColor: "#fff",
    },
    is_splite_line: false,
    is_more: false,
    more_setting: {
      mode: "mod1",
      url: "",
      text: "查看更多",
    },
  },
};

const addComp = (key) => {
  // console.log(ComponentMap[key]);
  if (ComponentMap[key]) {
    const cid = s4() + s4(); //两次拼接随机数，基本不会再同一个组件总重复了
    // console.log("id-------", cid);
    const cData = { ...ComponentMap[key] };
    cData.id = cid;
    // console.log(cData);
    state.components.push(cData);
    // window.postMessage(cData);
    const childIframe = document.getElementById(
      "edit_preview_iframe"
    ).contentWindow;
    // childIframe.postMessage(cData);
    childIframe.postMessage({ message: "addComponent", data: cData });
  }
};

//随机函数生成id
//toString=====utf8编码
const s4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

let childIframe = null;

onMounted(() => {
  childIframe = document.getElementById("edit_preview_iframe").contentWindow;
  if (childIframe) {
    childIframe.postMessage({ message: "init", data: "999" });
  }

  window.addEventListener("message", (event) => {
    const { message, data } = event.data;

    if (message === "deleteComponent" && data && data.id) {
      parent = event.source;
      console.log("收到子iframe的信息", data.id);
      // deleteComponent(data.id);
    }
  });
});
</script>

<style scoped>
.edit_left {
  width: 200px;
  height: 100vh;
}
.edit_main {
  /* 这个类的盒子元素，在flex中按照剩余空间全部匹配，如果其他也有，按照数字比例分配剩余空间*/
  flex: 1;
  background-color: #f7f8fa;
  height: 100vh;
  min-width: 400px;
}
.edit_right {
  width: 376px;
  height: 100vh;
}
.edit_iframe {
  width: 100%;
  height: 844px;
  background-color: #fff;
  margin-top: 40px;
  border: none !important;
}
</style>