import i18n from '@/i18n'
import { watch } from 'vue'
import store from '@/store'

export function generateTitle(title: string): string {
  return i18n.global.t('msg.route.' + title)
}

/**
 *
 * @param  {...any} cbs 所有的回调
 */
export function watchSwitchLang(...cbs: any) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb: any) => cb(store.getters.language))
    }
  )
}
