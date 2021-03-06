export default {
    logIn(){

    },
    async signUp(context,payload){
       const response =await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZmbrqexC-hTORf8LjqXRsvqggD9x9Dew',{
           method:'POST',
           body:JSON.stringify({
               email:payload.email,
            password:payload.password,
            returnSecureToken:true
           })
       })
       const responseData=await response.json();
       if(!response.ok){
           console.log(responseData)
           const error=new Error(responseData.message ||'failed to sign up');
           throw error;
       }
       console.log(responseData);
       context.commit('setUser',{
           token:responseData.idToken,
           userId:responseData.localId,
           tokenExpiration:responseData.expiresIn
       })
    }

}