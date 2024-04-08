<template>
  <div class="flv">
    <div class="h5maker_form_item">
      <div class="label">标题内容</div>
      <div class="h5maker_input_box">
        <input
          type="text"
          class="h5maker_input"
          v-model="data.value"
          @input="onChangeValue('value')"
        />
      </div>
    </div>
    <div class="h5maker_form_item">
      <div class="label">字体颜色 {{ data.styles.color }}</div>
      <div class="h5maker_input_box">
        <input
          type="text"
          class="h5maker_input"
          v-model="data.styles.color"
          @input="onChangeValue('styles.color')"
        />
      </div>
    </div>
  </div>
</template>
<script  setup>
// import { defineProps } from "vue";

// 使用defineProps定义props
const props = defineProps(["data"]);
const emits = defineEmits(["onChange"]);

const onChangeValue = (key) => {
  console.log("00", props);
  console.log("props-----", props.data[key]);
  emits("onChange", key, props.data[key]);
};

// 在setup函数中，你可以通过props访问定义的属性
console.log(props.data); // 打印出父组件传递的msg值,用于调试
</script>
<style scoped >
</style>