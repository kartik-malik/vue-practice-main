export default {
    async contactCoach(context,payload){
      const newRequest={
        userEmail:payload.email,
          message:payload.message,

      };
      const response=await fetch(`https://vue-demo-4422b-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,{
        method:'POST',
        body:JSON.stringify(newRequest)
      });
      const responseData=await response.json();
      if(!response.ok){
        const error= new Error(responseData.message);
        throw error
      }
      newRequest.id=responseData.name;
      newRequest.coachId=responseData.name
      context.commit('addRequest',newRequest);
    },
    async fetchRequests(context){
      const coachId=context.rootGetters.userId;
    const response=await  fetch(`https://vue-demo-4422b-default-rtdb.firebaseio.com/requests/${coachId}.json`)
    const responseData=await response.json();
    if(!response.ok){
      const error= new Error(responseData.message);
      throw error
    }
    const requests=[];
    for(const key in responseData){
      const request={
        id:key,
        coachId,
        userEmail:responseData[key].userEmail
      }
    requests.push(request)
    }
    context.commit('setRequests',requests)
    }
}