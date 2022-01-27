import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import { toLine } from './utils/settingIcon'
import App from './App.vue'
import router from './router'
import store from './store'
import installIcons from '@/icons'

import './permission'

import './styles/index.scss'

const app = createApp(App)

installIcons(app)

// 全局注册图标，但是会牺牲一点性能
for (const i in Icons) {
  app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}

app
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app')
