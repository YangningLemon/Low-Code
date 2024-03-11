// 主要是配置，vue解析引擎加载进来

import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'


export default defineConfig({
    plugins: [vue()]  //此处的plugins全部小写，否则会vite报错，可能提示是插件解析失败
})

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue';
// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [vue()]
// })

