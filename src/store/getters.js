const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  name: state => state.user.name,
  token: state => state.user.token,
}
export default getters
