const whiteList: string[] = ['/login', '/import', '/404', '/401']

/**
 * path 是否需要被缓存
 * @param {*} path
 * @returns
 */
export function isTags(path: string): boolean {
  return !whiteList.includes(path)
}
