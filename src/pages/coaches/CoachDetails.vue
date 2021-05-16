<template>
  <div>
    <section>
      <base-container>
        <h2>{{ fullName }}</h2>
        <h3>{{ selectedCoach.hourlyRate }}/hour</h3>
      </base-container>
    </section>
    <section>
      <base-container>
        <header>
          <h2>Interested Reach Out now</h2>
          <base-button link :to="contactLink" v-if="!path">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-container>
    </section>
    <section>
      <base-container>
        <base-badge
          v-for="area in areas"
          :key="area"
          :title="area"
          :type="area"
        >
        </base-badge>
        <p>{{ description }}</p>
      </base-container>
    </section>
  </div>
</template>
<script>
import BaseBadge from '../../components/ui/BaseBadge.vue';
export default {
  components: { BaseBadge },
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
      formIsVisible: false
    };
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      coach => coach.id == this.id
    );
  },
  computed: {
    // showLink(){

    // },
    path() {
      return this.$route.path == `/coaches/${this.id}/contact`;
    },
    contactLink() {
      return this.$route.path + 'contact';
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    fullName() {
      return this.selectedCoach.firstName;
    },
    description() {
      return this.selectedCoach.description;
    },
    areas() {
      return this.selectedCoach.areas;
    }
  }
};
</script>
