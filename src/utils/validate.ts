/**
 * 判断是否为外部资源
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 判断当前处在哪个服务中，
 * user-server / auth-server --> {message, status: 200, result}
 * 其他 --> {code: 0, msg, data}
 */
export function switchServer(str: string): boolean {
  if (str.indexOf('user-server') !== -1 || str.indexOf('auth-server') !== -1) {
    return true
  } else {
    return false
  }
}
