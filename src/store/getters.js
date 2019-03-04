const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  marketList: state => state.app.marketList,
  pairsList: state => state.app.pairsList,
  coinList: state => state.app.coinList,
  emailActive: state => state.user.emailActive,
  email: state => state.user.email,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
}
export default getters
