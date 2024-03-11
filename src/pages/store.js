import { ref, reactive } from 'vue'

export default reactive({
    // editMode: false
    id: '',//随机函数生成id
    setting: {
        title: '',
        desc: '',
        backgroundolor: '',
        category: ''
    },
    components: [],

})