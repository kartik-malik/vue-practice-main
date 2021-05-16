export default {
  addRequests(state, payload) {
    state.requests.push(payload);
    console.log(state.requests.length);
  },
  setRequests(state, payload) {
    state.requests = payload;
  }
};
