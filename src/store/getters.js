const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  marketList: state => state.app.marketList,
  coinList: state => state.app.coinList,
  email: state => state.user.email,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
}
export default getters
