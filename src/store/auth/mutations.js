export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutoLogout = false;
    console.log(state.userId);
  },
  logout(state) {
    state.token = null;
    state.userId = null;
    state.tokenExpiration = null;
  },
  didAutoLogout(state) {
    state.didAutoLogout = true;
  }
};
