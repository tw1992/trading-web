const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  email: state => state.user.email,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
}
export default getters
