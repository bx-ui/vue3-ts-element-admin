const getters = {
  token: (state: any) => state.user.token,
  /**
   * return true --> 有用户信息, false --> 无用户信息
   */
  hasUserInfo: (state: any) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: (state: any) => state.user.userInfo
}

export default getters
