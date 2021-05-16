<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-container>
      <section>
        <header>
          <h2>Requests Recieved</h2>
        </header>
        <ul v-if="hasRequests">
          <request-item
            v-for="req in recievedRequests"
            :email="req.userEmail"
            :message="req.message"
            :key="req.id"
          ></request-item>
        </ul>
        <h3 v-else>You havent recieved any requests yet</h3>
      </section>
    </base-container>
  </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
import { mapGetters } from 'vuex';
export default {
  data() {
    return { error: null };
  },
  components: {
    RequestItem
  },
  computed: {
    ...mapGetters('requests', {
      recievedRequests: 'getRequests',
      hasRequests: 'hasRequests'
    })
  },
  created() {
    this.loadRequests();
  },
  methods: {
    loadRequests() {
      this.$store.dispatch('requests/fetchRequests').catch(error => {
        this.error = error.message || 'something went wrong';
        console.log(error);
      });
      console.log(this.error);
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>
<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
