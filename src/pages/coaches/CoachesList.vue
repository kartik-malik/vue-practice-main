<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <section>
      <base-container>
        <div class="controls">
          <base-button @click="startLoadingCoaches(true)"
            >Refresh Button</base-button
          >
          <base-button v-if="!isLoggedIn" link to="/auth?redirect=register"
            >log in</base-button
          >
          <base-button
            to="/register"
            mode="flat"
            link
            v-if="!isCoach && isLoggedIn && !isLoading"
          >
            Register as coach
          </base-button>
        </div>
        <div>
          <base-spinner v-if="isLoading"></base-spinner>
        </div>
        <ul v-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          ></coach-item>
        </ul>
        <h3 v-else>No Coaches</h3>
      </base-container>
    </section>
  </div>
</template>
<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    CoachItem,
    CoachFilter
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    filteredCoaches() {
      return this.coaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoachesAdNotLoading() {
      return !this.isLoading && this.hasCoaches;
    },
    ...mapGetters('coaches', {
      coaches: 'coaches',
      hasCoaches: 'hasCoaches',
      isCoach: 'isCoach'
    })
  },
  created() {
    this.startLoadingCoaches();
  },
  methods: {
    setFilter(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async startLoadingCoaches(refresh = false) {
      this.isLoading = true;
      console.log(this.isLoading);
      this.loadCoaches({ forceRefresh: refresh })
        .then(() => {
          this.isLoading = false;
          console.log(this.isLoading);
        })
        .catch(error => {
          this.error = error.message || 'something went wrong';
        });
    },
    ...mapActions('coaches', {
      loadCoaches: 'loadCoaches'
    }),
    handleError() {
      this.error = null;
    }
  }
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
