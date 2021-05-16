import { createStore } from 'vuex';
import coachesModule from './coaches/index';
import requestsModule from './requests/index';
import authModule from './auth/index';
const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModule
  },

  mutations: {
    updateUserId(state, payload) {
      state.userId = payload.id;
    }
  },
  actions: {
    updateUserId(context, payload) {
      context.commit('updateUserId', payload);
    }
  }
});
export default store;
