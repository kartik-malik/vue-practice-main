import axios from 'axios';
export default {
  contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    };
    return axios
      .post(
        `https://vue-demo-4422b-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
        newRequest
      )
      .then(response => {
        const data = response.data;
        //console.log(data.name);
        newRequest.id = data.name;
        newRequest.coachId = payload.coachId;
        // if (!response.ok) {
        //   const error = new Error(data.message || 'Failed');
        //   // throw error;
        // }
        context.commit('addRequests', newRequest);
      });
  },
  fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    return axios
      .get(
        `https://vue-demo-4422b-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
      )
      .then(response => {
        if (!(response.statusText == 'OK')) {
          const error = new Error('Failed');
          throw error;
        }
        const data = response.data;
        const requests = [];
        for (const key in data) {
          const request = {
            id: key,
            coachId,
            userEmail: data[key].userEmail,
            message: data[key].message
          };
          requests.push(request);
        }
        context.commit('setRequests', requests);
      });
  }
};
