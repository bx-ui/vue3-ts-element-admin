import { createApp } from 'vue'

// i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
import i18n from '@/i18n/index.ts'
import installElementPlus from './plugins/element'
import * as Icons from '@element-plus/icons-vue'
import { toLine } from './utils/settingIcon'
import App from './App.vue'
import router from './router'
import store from './store'
import installIcons from '@/icons'
import mUI from './m-components'

import './permission'

import './styles/index.scss'

const app = createApp(App)

installIcons(app)
installElementPlus(app)

// 全局注册图标，但是会牺牲一点性能
for (const i in Icons) {
  app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}

app
  .use(store)
  .use(router)
  .use(i18n)
  .use(mUI)
  .mount('#app')
