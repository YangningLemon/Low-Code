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

export const ToolsList = [
    {
        id: 'title_text',
        componentName: 'TitleText',
        name: '标题文本',
        limit: '10',
        // iconUrl: '../assets/tools-title-text.svg',相对路径在这里不好使，不认可，写绝对路径
        iconUrl: '/src/assets/tools-title-text.svg'
    },
    {
        id: 'image',
        componentName: 'Image',
        name: '图片',
        limit: '15',
        iconUrl: '/src/assets/tools-image.svg'
    },
    {
        id: 'carousel',
        componentName: 'Carousel',
        name: '轮播',
        limit: '5',
        iconUrl: '/src/assets/tools-carousel.svg'
    },

    // 优惠券，商品，菜单管理，公告，课程，秒杀，视频，搜索，语音
    // Coupon, Product, Menu Management, Announcement, Course, Flash Sale, Video, Search, Voice
    {
        id: 'coupon',
        componentName: 'Coupon',
        name: '优惠券',
        limit: '100',
        iconUrl: '/src/assets/tools-coupon.svg'
    },
    {
        id: 'product',
        componentName: 'Product',
        name: '商品',
        limit: '500',
        iconUrl: '/src/assets/tools-product.svg'
    },
    {
        id: 'menu_management',
        componentName: 'MenuManagement',
        name: '菜单管理',
        limit: '15',
        iconUrl: '/src/assets/tools-menu_management.svg'
    },
    {
        id: 'announcement',
        componentName: 'Announcement',
        name: '公告',
        limit: '5',
        iconUrl: '/src/assets/tools-announcement.svg'
    },
    {
        id: 'course',
        componentName: 'Course',
        name: '课程',
        limit: '5',
        iconUrl: '/src/assets/tools-course.svg'
    },
    {
        id: 'flash_sale',
        componentName: 'FlashSale',
        name: '秒杀',
        limit: '5',
        iconUrl: '/src/assets/tools-flash_sale.svg'
    },
    {
        id: 'video',
        componentName: 'Video',
        name: '视频',
        limit: '5',
        iconUrl: '/src/assets/tools-video.svg'
    },
    {
        id: 'search',
        componentName: 'Search',
        name: '搜索',
        limit: '5',
        iconUrl: '/src/assets/tools-search.svg'
    },
    {
        id: 'voice',
        componentName: 'Voice',
        name: '语音',
        limit: '5',
        iconUrl: '/src/assets/tools-voice.svg'
    },
    {
        id: 'store',
        componentName: 'Store',
        name: '视频',
        limit: '5',
        iconUrl: '/src/assets/tools-store.svg'
    },

]

export const ToolItemCount = reactive({
    title_text: '0',
    image: '0',
    carousel: '0',
    store: '0',
    coupon: '0',
    product: '0',
    menu_management: '0',
    announcement: '0',
    course: '0',
    flash_sale: '0',
    video: '0',
    search: '0',
    voice: '0'
})