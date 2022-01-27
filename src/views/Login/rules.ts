export const validatePassword = () => {
  return (rule: any, value: string, callback: any) => {
    if (value.length < 6) {
      callback(new Error('密码至少6位'))
    } else {
      callback()
    }
  }
}
