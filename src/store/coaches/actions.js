import axios from 'axios';

export default {
  registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const coachData = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.description,
      hourlyRate: payload.rate,
      areas: payload.areas
    };
    axios
      .put(
        `https://vue-demo-4422b-default-rtdb.firebaseio.com//coaches/${userId}.json?auth=${token}`,
        coachData
      )
      .then(response => {
        const data = response.data;
        context.commit('registerCoach', { ...data, id: userId });
      });
    // console.log(context.state.coaches.length);
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return Promise.resolve();
    }
    return axios
      .get(`https://vue-demo-4422b-default-rtdb.firebaseio.com/coaches.json`)
      .then(response => {
        const data = response.data;
        const coaches = [];
        for (const key in data) {
          const coach = {
            firstName: data[key].firstName,
            lastName: data[key].lastName,
            description: data.description,
            hourlyRate: data[key].hourlyRate,
            areas: data[key].areas,
            id: key
          };
          coaches.push(coach);
        }
        context.commit('setCoaches', coaches);
        context.commit('setFetchTimeStamp');
      });
  }
};
