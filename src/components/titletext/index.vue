<template>
  <div :style="data.styles">{{ data.value }}</div>
</template>
<script setup>
import { defineProps } from "vue";

// 使用defineProps定义props
const props = defineProps(["data"]);

// 在setup函数中，你可以通过props访问定义的属性
console.log(props.data); // 打印出父组件传递的msg值
</script>
<style scoped>
</style>