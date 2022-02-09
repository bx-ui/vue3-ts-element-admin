import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'
import { MetaType } from '@/router'

export type AppState = {
  sidebarOpened: boolean;
  language: 'en' | 'zh';
  tagsViewList: any[]
}

export type TagViewItem = {
  fullPath?: string;
  meta?: MetaType;
  name?: any;
  params?: any;
  path: string;
  query?: any;
  title: string;
}

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened(state: AppState) {
      state.sidebarOpened = !state.sidebarOpened
    },
    /**
     * 设置国际化
     */
     setLanguage(state: AppState, language: 'en' | 'zh') {
      setItem(LANG, language)
      state.language = language
     },
     addTagsViewList(state: AppState, tag: TagViewItem) {
      const isFind = state.tagsViewList.find((item: TagViewItem) => item.path === tag.path)
      // 处理重复
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
     },
     /**
      * 为指定的 tag 修改 title
      */
      changeTagsView(state: AppState, payload: {index: number, tag: TagViewItem}) {
        state.tagsViewList[payload.index] = payload.tag
        setItem(TAGS_VIEW, state.tagsViewList)
      },
      /**
       * 删除tag
       *  @param {type: 'other'||'right'||'index', index: index} payload
       */
       removeTagsView(state: AppState, payload: { type: 'other' | 'right' | 'index', index: number }) {
         if (payload.type === 'index') {
           console.log('bug', 'payload.index', payload.index)

           // 删除置顶index的数据
           state.tagsViewList.splice(payload.index, 1)
         } else if (payload.type === 'other') {
          state.tagsViewList.splice(
            payload.index + 1,
            state.tagsViewList.length - payload.index + 1
          )
          state.tagsViewList.splice(0, payload.index)
         } else if (payload.type === 'right') {
          state.tagsViewList.splice(
            payload.index + 1,
            state.tagsViewList.length - payload.index + 1
          )
        }
        setItem(TAGS_VIEW, state.tagsViewList)
       }
  }
}
