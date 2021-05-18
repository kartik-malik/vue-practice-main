import mutations from './mutations';
import actions from './actions';
import getters from './getters';
export default {
    namespaced:true,
    state(){
        return {
            requests:[
                {
                    userEmail:'hi@hi.com',
                    message:'new',
                    id:'1',
                    coachId:'c1'
                }
            ],
             
        }
      
    },
    getters,
    mutations,
    actions
}