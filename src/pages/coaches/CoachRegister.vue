<template>
  <section>
    <base-container>
      <h2>Register as a Coach Now</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-container>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
import { mapActions } from 'vuex';
export default {
  components: {
    CoachForm
  },

  methods: {
    saveData(formData) {
      this.registerCoach(formData);

      this.$router.push('/');
    },
    ...mapActions('coaches', {
      registerCoach: 'registerCoach'
    })
  }
};
</script>
