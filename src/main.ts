import '@/assets/css/common.css'
import router from '@/router'
import { initEruda } from '@/util/util'
import 'normalize.css'
import { createApp } from 'vue'
import Main from './Main.vue'

initEruda()

createApp(Main).use(router).mount('#app')
