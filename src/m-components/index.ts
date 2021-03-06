import { App } from 'vue'
import chooseArea from './choose-area'
import chooseIcon from './choose-icon'
import trend from './trend'
import notification from './notification'
import list from './list'
import menu from './menu'
import progress from './progress'
import form from './form'
import modalForm from './modalForm'
import table from './table'

const components = [
  chooseArea,
  chooseIcon,
  trend,
  notification,
  list,
  menu,
  progress,
  form,
  modalForm,
  table
]

export default {
  install(app: App) {
    components.map((item) => {
      app.use(item)
    })
  }
}
