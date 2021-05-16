import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const authModule = {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false
    };
  },
  getters,
  actions,
  mutations
};
export default authModule;
