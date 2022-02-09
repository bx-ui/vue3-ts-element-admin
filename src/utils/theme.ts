import color from 'css-color-function'
import rgbHex from 'rgb-hex'
import formula from '@/constant/formula.json'
import axios from 'axios'
/**
 * 写入新样式到style
 *  @param {*} elNewStyle  element-plus 的新样式
 */
export const writeNewStyle = (elNewStyle: any) => {
  const style = document.createElement('style')
  style.innerText = elNewStyle
  document.head.appendChild(style)
}

/**
 * 根据主色值，生成最新的样式表
 */
export const generateNewStyle = async (primaryColor: string) => {
  const colors: any = generateColors(primaryColor)
  let cssText = await getOriginalStyle()

  // 遍历生成的样式表，在 CSS 的原样式中进行全局替换
  Object.keys(colors).forEach(key => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })

  return cssText
}

/**
 * 根据主题色生成色值表
 */
export const generateColors = (primary: string) => {
  if (!primary) return
  const colors: any = {
    primary
  }
  Object.keys(formula).forEach(key => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  return colors
}

/**
 * 获取当前 element-plus 的默认样式表并在需要替换的位置打上标记
 */
const getOriginalStyle = async () => {
  // 1. 获取element-plus默认样式
  // https://unpkg.com/element-plus@${version}/dist/index.css
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  // 把获取到的数据筛选为原样式模板
  return getStyleTemplate(data)
}

/**
 *  返回 style 的 template, 根据默认色值打标记
 */
const getStyleTemplate = (data: any) => {
  // element-plus 默认色值
  const colorMap: any = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  // 根据默认色值为要替换的色值打上标记
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
