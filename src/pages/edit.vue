<template>
  <div class="fl fl_jc_fs fl_ai_fs">
    <div class="edit_left">
      <template v-for="item in ToolsList" :key="item.id">
        <div
          class="edit_tools_item flv fl_jc_c fl_ai_c"
          @click="addComp(item.componentName, item.limit)"
        >
          <img :src="item.iconUrl" class="edit_tooles_item_icon" />
          <span class="edit_tools_item_title">{{ item.name }}</span>
          <span class="edit_tools_item_count">{{
            ToolItemCount[item.componentName] + "/" + item.limit
          }}</span>
        </div>
      </template>
    </div>
    <div class="edit_main">
      <iframe
        id="edit_preview_iframe"
        src="/preview"
        class="edit_iframe"
      ></iframe>
    </div>
    <div class="edit_right">
      <!-- 因为每个组件的配置项是不一样的，所以可以做成一个组件 -->
      <div class="edit_right_type">
        {{ selectedComponent.name }}
      </div>
      <component
        :is="selectedComponent.configComponentName"
        :data="selectedComponent"
        @onChange="onChange"
      ></component>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TitleTextConfig from "../components/titletext/config.vue";
console.log("TitleTextConfig==", TitleTextConfig);
export default defineComponent({
  components: {
    TitleTextConfig, // 局部注册组件
  },
});
</script>


<script setup>
import { onMounted, ref } from "vue";
import state, { ToolsList, ToolItemCount } from "./store";
import _ from "lodash";
import db from "../db";
// console.log(state); //state树数据代理
// console.log(JSON.parse(JSON.stringify(state))); //是数据
// console.log(state.setting);
// 以上的数据是代理

const selectedComponent = ref({});

const ComponentMap = {
  TitleText: {
    name: "标题文本",
    componentName: "TitleText",
    configComponentName: "TitleTextConfig",
    value: "这里是标题文本",
    styles: {
      textAlign: "left",
      fontWeight: "normal",
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
  Image: {
    name: "图片",
    componentName: "Image",
    configComponentName: "ImageConfig",
    value: "url",
    styles: {
      margin: "",
      borderRadius: "",
      boxShadow: "",
    },
  },
  Carousel: {
    name: "轮播",
    componentName: "Carousel",
    configComponentName: "CarouselConfig",
    // value:['',''],// "数组轮播",image实例，轮播组件只是在多个图片组件的基础上进行设置,组合组件
    value: [
      {
        name: "",
        componentName: "Image",
        value: "url",
        styles: {
          margin: "",
          borderRadius: "",
          boxShadow: "",
        },
      },
    ],
    styles: {
      margin: "",
      borderRadius: "",
      boxShadow: "",
    },
  },
};

const addComp = (key, limit) => {
  // console.log(ComponentMap[key]);
  if (ComponentMap[key] && ToolItemCount[key] < limit) {
    const cid = s4() + s4(); //两次拼接随机数，基本不会再同一个组件总重复了
    // console.log("id-------", cid);
    const cData = { ...ComponentMap[key] };
    cData.id = cid;
    // console.log(cData);
    state.components.push(cData);
    ToolItemCount[key]++;
    // window.postMessage(cData);
    const childIframe = document.getElementById(
      "edit_preview_iframe"
    ).contentWindow;
    // childIframe.postMessage(cData);
    childIframe.postMessage({ message: "addComponent", data: cData });

    //添加数据到indexdb
    db.states.add({ ...cData, create_time: Date.now() });
  }
};

//配置数据变更函数
const onChange = (key, value) => {
  console.log("value-=====", key, value);
  // console.log("selectedComponent", selectedComponent);
  selectedComponent.value[key] = value;
  childIframe.postMessage({
    message: "updateComponent",
    data: JSON.parse(JSON.stringify(selectedComponent.value)),
  });
  // childIframe.postMessage({ message: "updateComponent", data:  });
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

    if (message === "selectComponent" && data && data.id) {
      parent = event.source;
      console.log("收到子iframe配置组件的信息", data.id);
      // deleteComponent(data.id);
      state.components.forEach((item) => {
        if (item.id === data.id) {
          selectedComponent.value = item;
        }
      });
    }
  });
});
</script>

<style scoped>
.edit_left {
  width: 200px;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  align-content: start;
  margin-top: 24px;
}
.edit_main {
  /* 这个类的盒子元素，在flex中按照剩余空间全部匹配，如果其他也有，按照数字比例分配剩余空间*/
  flex: 1;
  background-color: #e3d9d9;
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
.edit_tools_item {
  width: 80px;
  height: 88px;
  cursor: pointer;
}
.edit_tooles_item_icon {
  width: 32px;
  height: 32px;
}
.edit_tools_item_title {
  font-size: 12px;
  color: #323233;
  margin-top: 4px;
}

.edit_tools_item_count {
  font-size: 12px;
  margin-top: 4px;
  color: #7d7e80;
}
.edit_right_type {
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  color: #323233;
  padding: 24px 16px;
  border-bottom: 1px solid #f2f4f6;
}
</style>